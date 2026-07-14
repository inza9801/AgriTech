"""
ML microservice: fertilizer (all crops, WITH PH) + irrigation (WITHOUT fieldworks)
                 + rice leaf disease detection (MobileNetV2, image is never saved).
Run:  python app.py
Listens on http://localhost:5001
"""
from flask import Flask, request, jsonify
import joblib
import pandas as pd
import numpy as np
import json
import os
import io

from PIL import Image

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

app = Flask(__name__)

fert_model = joblib.load(os.path.join(BASE_DIR, 'fertilizer_model.pkl'))
fert_le = joblib.load(os.path.join(BASE_DIR, 'fertilizer_label_encoder.pkl'))
fert_remarks = json.load(open(os.path.join(BASE_DIR, 'fertilizer_remarks.json')))
fert_options = json.load(open(os.path.join(BASE_DIR, 'fertilizer_options.json')))
irrigation_model = joblib.load(os.path.join(BASE_DIR, 'irrigation_model.pkl'))

# PH included for fertilizer, fieldworks excluded for irrigation
REQUIRED_FERT_FIELDS = ['temperature', 'moisture', 'rainfall', 'ph', 'nitrogen',
                         'phosphorous', 'potassium', 'soil', 'crop']
REQUIRED_IRRIGATION_FIELDS = ['soil', 'temp', 'humidity', 'lightIntensity']

# -------------------------------------------------------------------------
# Disease detection (MobileNetV2, trained in Colab — see training notebook)
# -------------------------------------------------------------------------
# Lazy/soft import: TensorFlow is heavy, and we want /health, fertilizer and
# irrigation endpoints to keep working even if TF or the model file aren't
# present yet (e.g. before the user has trained/dropped in the model).
DISEASE_MODEL_PATH = os.path.join(BASE_DIR, 'disease_model.h5')
DISEASE_CLASSES_PATH = os.path.join(BASE_DIR, 'disease_classes.json')
DISEASE_IMG_SIZE = (224, 224)

disease_model = None
disease_classes = None
disease_load_error = None

try:
    import tensorflow as tf
    from tensorflow.keras.applications.mobilenet_v2 import preprocess_input

    if os.path.exists(DISEASE_MODEL_PATH) and os.path.exists(DISEASE_CLASSES_PATH):
        disease_model = tf.keras.models.load_model(DISEASE_MODEL_PATH)
        with open(DISEASE_CLASSES_PATH) as f:
            disease_classes = json.load(f)  # e.g. {"0": "Bacterial Leaf Blight", ...}
    else:
        disease_load_error = (
            "disease_model.h5 or disease_classes.json not found in the ML service "
            "folder. Train the model in Colab (see training notebook) and place "
            "both files next to app.py."
        )
except Exception as e:
    disease_load_error = f"Failed to load disease model: {e}"


# Simple treatment recommendation lookup, keyed by class label.
DISEASE_TREATMENTS = {
    "Bacterial Leaf Blight": [
        "Drain the field and avoid standing water where possible.",
        "Apply copper-based bactericide as per label dosage.",
        "Use balanced fertilization; avoid excess nitrogen.",
        "Remove and destroy severely infected leaves/plants.",
    ],
    "Brown Spot": [
        "Spray a recommended fungicide (e.g. copper oxychloride/mancozeb).",
        "Improve field drainage and avoid water stress.",
        "Apply potassium and balanced NPK fertilizer.",
        "Remove infected crop residue after harvest.",
    ],
    "Tungro Virus": [
        "Uproot and destroy infected plants to reduce spread.",
        "Control leafhopper vectors with recommended insecticide.",
        "Use tungro-resistant rice varieties in the next planting.",
        "Avoid staggered planting near infected fields.",
    ],
    "Healthy Leaf": [
        "No treatment needed — crop appears healthy.",
        "Continue regular monitoring and balanced fertilization.",
        "Maintain proper irrigation and field sanitation.",
    ],
}


def _preprocess_image(file_bytes):
    """Decode raw image bytes -> MobileNetV2-ready batch of shape (1,224,224,3).
    Kept entirely in memory; nothing is written to disk."""
    img = Image.open(io.BytesIO(file_bytes)).convert('RGB')
    img = img.resize(DISEASE_IMG_SIZE)
    arr = np.array(img).astype('float32')
    arr = preprocess_input(arr)  # MobileNetV2's own [-1, 1] scaling
    return np.expand_dims(arr, axis=0)


def _estimate_affected_area(file_bytes, label):
    """Lightweight heuristic (not a segmentation model): estimate the % of
    leaf-colored pixels that look discoloured/necrotic (brownish/yellowish)
    rather than healthy green. Used only to populate the 'Affected Area'
    field in the UI — it's an approximation, not a lab-grade measurement."""
    if label == "Healthy Leaf":
        return 0.0
    try:
        img = Image.open(io.BytesIO(file_bytes)).convert('RGB').resize((224, 224))
        arr = np.array(img).astype('float32') / 255.0
        r, g, b = arr[..., 0], arr[..., 1], arr[..., 2]

        # Leaf mask: pixels that are plausibly plant material (greenish OR
        # brownish/yellowish), excluding near-white/near-black background.
        brightness = (r + g + b) / 3.0
        leaf_mask = (brightness > 0.05) & (brightness < 0.95)

        # Healthy-green mask: green clearly dominant over red and blue.
        healthy_mask = (g > r + 0.02) & (g > b + 0.02)

        leaf_pixels = np.sum(leaf_mask)
        if leaf_pixels == 0:
            return 0.0
        affected_pixels = np.sum(leaf_mask & (~healthy_mask))
        pct = float(affected_pixels) / float(leaf_pixels) * 100.0
        return round(min(max(pct, 0.0), 100.0), 1)
    except Exception:
        return None


def _severity_from_confidence(confidence, affected_area):
    """Simple rule-of-thumb severity bucket combining model confidence and
    the estimated affected area heuristic above."""
    area = affected_area if affected_area is not None else 0
    if area >= 40 or confidence >= 0.9:
        return "High"
    if area >= 15 or confidence >= 0.7:
        return "Medium"
    return "Low"


@app.route('/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok'})


@app.route('/fertilizer-options', methods=['GET'])
def fertilizer_options():
    return jsonify(fert_options)


@app.route('/predict-fertilizer', methods=['POST'])
def predict_fertilizer():
    data = request.get_json(force=True) or {}
    missing = [f for f in REQUIRED_FERT_FIELDS if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    try:
        row = pd.DataFrame([{
            'Temperature': float(data['temperature']),
            'Moisture': float(data['moisture']),
            'Rainfall': float(data['rainfall']),
            'PH': float(data['ph']),
            'Nitrogen': float(data['nitrogen']),
            'Phosphorous': float(data['phosphorous']),
            'Potassium': float(data['potassium']),
            'Soil': str(data['soil']),
            'Crop': str(data['crop']).lower(),
        }])
        pred = fert_model.predict(row)[0]
        label = fert_le.inverse_transform([pred])[0]
        proba = fert_model.predict_proba(row)[0]
        confidence = round(float(max(proba)), 4)
        return jsonify({
            'fertilizer': label,
            'remark': fert_remarks.get(label, ''),
            'confidence': confidence
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict-irrigation', methods=['POST'])
def predict_irrigation():
    data = request.get_json(force=True) or {}
    missing = [f for f in REQUIRED_IRRIGATION_FIELDS if f not in data]
    if missing:
        return jsonify({'error': f'Missing fields: {", ".join(missing)}'}), 400

    try:
        row = pd.DataFrame([{
            'Soil': float(data['soil']),
            'Temp': float(data['temp']),
            'Humi': float(data['humidity']),
            'Light Intensity': float(data['lightIntensity']),
        }])
        pred = int(irrigation_model.predict(row)[0])
        proba = irrigation_model.predict_proba(row)[0]
        confidence = round(float(max(proba)), 4)
        return jsonify({'pump': pred, 'confidence': confidence})
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@app.route('/predict-disease', methods=['POST'])
def predict_disease():
    if disease_model is None or disease_classes is None:
        return jsonify({
            'error': disease_load_error or 'Disease model not loaded'
        }), 503

    if 'image' not in request.files:
        return jsonify({'error': "No image file uploaded (expected field name 'image')"}), 400

    file = request.files['image']
    if file.filename == '':
        return jsonify({'error': 'Empty filename'}), 400

    allowed_ext = ('.jpg', '.jpeg', '.png')
    if not file.filename.lower().endswith(allowed_ext):
        return jsonify({'error': f'Unsupported file type. Allowed: {allowed_ext}'}), 400

    try:
        # Read fully into memory; nothing touches disk, and the bytes go out
        # of scope (garbage collected) once this request finishes.
        file_bytes = file.read()

        batch = _preprocess_image(file_bytes)
        preds = disease_model.predict(batch, verbose=0)[0]  # shape: (num_classes,)

        top_idx = int(np.argmax(preds))
        label = disease_classes[str(top_idx)]
        confidence = round(float(preds[top_idx]), 4)

        affected_area = _estimate_affected_area(file_bytes, label)
        severity = "None" if label == "Healthy Leaf" else _severity_from_confidence(confidence, affected_area)

        all_probs = {
            disease_classes[str(i)]: round(float(p), 4) for i, p in enumerate(preds)
        }

        return jsonify({
            'disease': label,
            'confidence': confidence,
            'severity': severity,
            'affectedAreaPercent': affected_area,
            'status': 'Healthy' if label == 'Healthy Leaf' else 'Detected',
            'recommendations': DISEASE_TREATMENTS.get(label, []),
            'allProbabilities': all_probs,
        })
    except Exception as e:
        return jsonify({'error': str(e)}), 500


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=False)