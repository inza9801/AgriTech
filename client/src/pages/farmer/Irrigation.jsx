import { useState, useEffect } from "react";
import "./css/Irrigation.css";
import { FaSeedling } from "react-icons/fa";
import {
  getLatestSensorReading,
  getWeather,
  getCrop,
  predictIrrigation,
} from "../../api/farmerService";
import FieldSelector from "../../components/common/FieldSelector";
import SensorGrid from "../../components/common/SensorGrid";

function Irrigation() {
  const [latest, setLatest] = useState(null);
  const [weather, setWeather] = useState(null);
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");

  const [irrigation, setIrrigation] = useState(null);
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");

  // Selected field (FieldSelector stays hidden if the farmer only has one field)
  const [fieldId, setFieldId] = useState(null);

  // Load latest sensor reading, weather and crop (for soil type)
  const loadLatest = async (selectedFieldId) => {
    try {
      const [latestRes, weatherRes, cropRes] = await Promise.all([
        getLatestSensorReading(selectedFieldId),
        getWeather(selectedFieldId),
        getCrop(selectedFieldId),
      ]);

      setLatest(latestRes.data.data);
      setWeather(weatherRes.data.data);
      setCrop(cropRes.data.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to load sensor data");
    }
  };

  useEffect(() => {
    loadLatest(null);
  }, []);

  useEffect(() => {
    if (fieldId === null) return;
    loadLatest(fieldId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldId]);

  // AI Irrigation Recommendation
  useEffect(() => {
    if (!latest || !weather) return;

    (async () => {
      try {
        setAiLoading(true);
        setAiError("");

        const res = await predictIrrigation(
          {
            humidity: weather.humidity,
            lightIntensity: weather.lightIntensity,
          },
          fieldId
        );

        setIrrigation(res.data.data);
      } catch (err) {
        console.error(err);
        setAiError("Failed to get irrigation recommendation");
      } finally {
        setAiLoading(false);
      }
    })();
  }, [latest, weather, fieldId]);

  return (
    <div className="irrigation">
      <div className="pageHeader">
        <h1>Irrigation Control</h1>
        <p>Monitor live IoT sensor data and AI irrigation recommendation.</p>
      </div>

      <FieldSelector onChange={setFieldId} />

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Live Sensor Data */}
      <div className="sensorSection">
        <div className="sectionTitle">
          <h2>Live IoT Sensor Data</h2>
        </div>

        <SensorGrid
          latest={latest}
          weather={weather}
          soilType={crop?.soil_type}
        />
      </div>

      {/* AI Recommendation */}
      <div className="recommendationSection">
        <div className="sectionTitle">
          <h2>AI Irrigation Recommendation</h2>
        </div>

        <div className="recommendationCard">
          <FaSeedling className="sensorIcon" />

          {aiLoading && (
            <p className="inlineNote">Analyzing sensor data...</p>
          )}

          {aiError && (
            <p className="inlineNote errorText">{aiError}</p>
          )}

          {irrigation && (
            <>
              <h1 className="recommendText">
                {irrigation.pump === 1
                  ? "Irrigation Required"
                  : "Irrigation Not Required"}
              </h1>

              <p className="confidenceText">
                Confidence: {(irrigation.confidence * 100).toFixed(1)}%
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Irrigation;