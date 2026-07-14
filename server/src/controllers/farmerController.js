import {
  getFieldIdForFarmer,
  getCropByField,
  getListableBatches,
  createListing,
  getListingsSummary,
  getPendingRequestsForFarmer,
  getOrderWithFarmerId,
  updateOrderStatus,
  updateListingStatus,
  getOrdersForFarmer,
  getShipmentsForFarmer,
  insertSensorReading,
  getLatestSensorReading,
  getSensorHistory,
  getUnsoldBatches,
  getBatchSummary,
  updateCrop,
  addBatch,
} from "../models/farmerModel.js";

// Base URL of the Flask ML microservice (fertilizer + irrigation models).
const ML_SERVICE_URL = process.env.ML_SERVICE_URL || "http://localhost:5001";

// Resolves the logged-in farmer's field_id, or throws a 404-style error
const resolveFieldId = async (req, res) => {
  const field_id = await getFieldIdForFarmer(req.user.user_id);
  if (!field_id) {
    res.status(404);
    throw new Error("No field found for this farmer. Please set up your farm/field first.");
  }
  return field_id;
};

// Maps an Open-Meteo WMO weather_code to one of three simple buckets used
// throughout the UI: sunny / overcast / rainy.
const WEATHER_CONDITION_CODES = {
  sunny: [0, 1],
  overcast: [2, 3, 45, 48],
  rainy: [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 71, 73, 75, 77, 80, 81, 82, 85, 86, 95, 96, 99],
};

const getWeatherCondition = (weatherCode) => {
  if (WEATHER_CONDITION_CODES.sunny.includes(weatherCode)) return "sunny";
  if (WEATHER_CONDITION_CODES.rainy.includes(weatherCode)) return "rainy";
  return "overcast";
};

export const createBatch = async (req, res, next) => {
  try {
    const { crop_name, quantity_tons, arrival_date, expiry_date, status } = req.body;

    if (!crop_name || !quantity_tons || !arrival_date || !expiry_date || !status) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const batch = await addBatch({
      farmer_id: req.user.user_id,
      crop_name,
      quantity_tons,
      arrival_date,
      expiry_date,
      status,
    });

    res.status(201).json({ success: true, data: batch });
  } catch (err) {
    next(err);
  }
};

export const getCrop = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const crop = await getCropByField(field_id);
    if (!crop) {
      res.status(404);
      throw new Error("No crop found");
    }
    res.json({ success: true, data: crop });
  } catch (err) {
    next(err);
  }
};

// NOTE: irrigation status is no longer computed here with a hardcoded
// moisture threshold. The Irrigation page now gets a real recommendation
// from the ML service (see predictIrrigation below), and the Dashboard no
// longer shows an Irrigation card at all (replaced by Rain Probability).
export const getDashboardSummary = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const crop = await getCropByField(field_id);
    const listings = await getListingsSummary(req.user.user_id);

    const cropHealth = crop && crop.health_status === "Healthy" ? "Healthy" : "Diseased";

    res.json({
      success: true,
      data: {
        cropHealth,
        marketplaceListings: listings ? listings.totalListings : 0,
        estimatedYieldTons: crop ? crop.expected_yield_tons : null,
        expectedHarvestDate: crop ? crop.expected_harvest_date : null,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const listableBatches = async (req, res, next) => {
  try {
    const batches = await getListableBatches(req.user.user_id);
    res.json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const addListing = async (req, res, next) => {
  try {
    const { batch_id, quantity_tons, price_per_kg } = req.body;
    const listing = await createListing({ farmer_id: req.user.user_id, batch_id, quantity_tons, price_per_kg });
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

export const summary = async (req, res, next) => {
  try {
    const data = await getListingsSummary(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const requests = async (req, res, next) => {
  try {
    const data = await getPendingRequestsForFarmer(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const order = await getOrderWithFarmerId(req.params.id);
    if (!order || order.farmer_id !== req.user.user_id) {
      res.status(404);
      throw new Error("Order not found");
    }
    await updateOrderStatus(order.order_id, "Confirmed");
    await updateListingStatus(order.listing_id, "Reserved");
    res.json({ success: true, message: "Order confirmed and listing reserved" });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await getOrderWithFarmerId(req.params.id);
    if (!order || order.farmer_id !== req.user.user_id) {
      res.status(404);
      throw new Error("Order not found");
    }
    await updateOrderStatus(order.order_id, "Cancelled");
    res.json({ success: true, message: "Order cancelled" });
  } catch (err) {
    next(err);
  }
};

export const listOrders = async (req, res, next) => {
  try {
    const data = await getOrdersForFarmer(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const listShipments = async (req, res, next) => {
  try {
    const data = await getShipmentsForFarmer(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// Sensor readings now require ph + soil_type in addition to the original
// fields. These are entered by the farmer on the Crop Management page
// (soil_moisture_percent/soil_temperature_celsius are carried over from the
// latest live reading rather than typed in — see CropManagement.jsx).
export const addSensorReading = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const {
      soil_moisture_percent,
      soil_temperature_celsius,
      nitrogen_kgha,
      phosphorus_kgha,
      potassium_kgha,
      ph,
      soil_type,
    } = req.body;

    if (
      soil_moisture_percent === undefined ||
      soil_temperature_celsius === undefined ||
      nitrogen_kgha === undefined ||
      phosphorus_kgha === undefined ||
      potassium_kgha === undefined ||
      ph === undefined ||
      !soil_type
    ) {
      res.status(400);
      throw new Error("All sensor fields (including ph and soil_type) are required");
    }

    const reading = await insertSensorReading({
      field_id,
      soil_moisture_percent,
      soil_temperature_celsius,
      nitrogen_kgha,
      phosphorus_kgha,
      potassium_kgha,
      ph,
      soil_type,
    });

    res.status(201).json({ success: true, data: reading });
  } catch (err) {
    next(err);
  }
};

export const getLatestReading = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const reading = await getLatestSensorReading(field_id);
    res.json({ success: true, data: reading });
  } catch (err) {
    next(err);
  }
};

export const getHistory = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const history = await getSensorHistory(field_id);
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};

export const listBatches = async (req, res, next) => {
  try {
    const batches = await getUnsoldBatches(req.user.user_id);
    res.json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const summary = await getBatchSummary(req.user.user_id);
    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};

// Weather now also returns rainfall (precipitation, mm) and lightIntensity
// (shortwave_radiation, W/m²) so the frontend can display sensor cards from
// both ML datasets, plus a simplified `condition` (sunny/overcast/rainy)
// derived from the WMO weather_code for the weather icon on the dashboard.
export const getCurrentWeather = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400);
      throw new Error("lat and lon query params are required");
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation_probability,precipitation,shortwave_radiation,weather_code`;
    const response = await fetch(url);
    if (!response.ok) {
      res.status(502);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const current = data.current;
    const condition = getWeatherCondition(current.weather_code);

    res.json({
      success: true,
      data: {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        rainProbability: current.precipitation_probability,
        rainfall: current.precipitation,
        lightIntensity: current.shortwave_radiation,
        weatherCode: current.weather_code,
        condition,
      },
    });
  } catch (err) {
    next(err);
  }
};

export const updateCropStatus = async (req, res, next) => {
  try {
    const { crop_id } = req.params;
    const { growth_stage, health_status } = req.body;
    await updateCrop(crop_id, growth_stage, health_status);
    res.json({ success: true, message: "Crop updated successfully" });
  } catch (err) {
    next(err);
  }
};

// ===================================================================
// ML proxy endpoints — forward to the Flask ML microservice, assembling
// the request payload from the farmer's latest sensor reading (N/P/K/ph/
// soil_type/moisture/temperature) plus live weather data supplied by the
// client (rainfall for fertilizer, humidity/lightIntensity for irrigation).
// ===================================================================

export const getFertilizerOptions = async (req, res, next) => {
  try {
    const response = await fetch(`${ML_SERVICE_URL}/fertilizer-options`);
    if (!response.ok) {
      res.status(502);
      throw new Error("Failed to fetch fertilizer options from ML service");
    }
    const data = await response.json();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const predictFertilizer = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const crop = await getCropByField(field_id);
    const reading = await getLatestSensorReading(field_id);

    if (!reading) {
      res.status(404);
      throw new Error("No sensor reading available yet. Please add one from Crop Management.");
    }

    const { rainfall } = req.body;
    if (rainfall === undefined || rainfall === null) {
      res.status(400);
      throw new Error("rainfall is required");
    }

    const payload = {
      temperature: reading.soil_temperature_celsius,
      moisture: reading.soil_moisture_percent,
      rainfall,
      ph: reading.ph,
      nitrogen: reading.nitrogen_kgha,
      phosphorous: reading.phosphorus_kgha,
      potassium: reading.potassium_kgha,
      soil: reading.soil_type,
      crop: crop ? crop.crop_name : "rice",
    };

    const response = await fetch(`${ML_SERVICE_URL}/predict-fertilizer`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status);
      throw new Error(data.error || "Fertilizer prediction failed");
    }

    res.json({ success: true, data: { ...data, inputs: payload } });
  } catch (err) {
    next(err);
  }
};

// Disease detection — the image arrives in memory only (multer memoryStorage,
// see farmerRoutes.js: no disk destination is configured), we forward the
// raw bytes straight to the Flask ML service, and the buffer is discarded
// once this request completes. The image is never written to disk or DB.
export const predictDisease = async (req, res, next) => {
  try {
    if (!req.file) {
      res.status(400);
      throw new Error("No image uploaded. Please attach a rice leaf image.");
    }

    const allowedMimes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedMimes.includes(req.file.mimetype)) {
      res.status(400);
      throw new Error("Unsupported file type. Please upload a JPG or PNG image.");
    }

    const formData = new FormData();
    const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
    formData.append("image", blob, req.file.originalname || "leaf.jpg");

    const response = await fetch(`${ML_SERVICE_URL}/predict-disease`, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status);
      throw new Error(data.error || "Disease prediction failed");
    }

    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const predictIrrigation = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const reading = await getLatestSensorReading(field_id);

    if (!reading) {
      res.status(404);
      throw new Error("No sensor reading available yet. Please add one from Crop Management.");
    }

    const { humidity, lightIntensity } = req.body;
    if (humidity === undefined || lightIntensity === undefined) {
      res.status(400);
      throw new Error("humidity and lightIntensity are required");
    }

    const payload = {
      soil: reading.soil_moisture_percent,
      temp: reading.soil_temperature_celsius,
      humidity,
      lightIntensity,
    };

    const response = await fetch(`${ML_SERVICE_URL}/predict-irrigation`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json();
    if (!response.ok) {
      res.status(response.status);
      throw new Error(data.error || "Irrigation prediction failed");
    }

    res.json({ success: true, data: { ...data, inputs: payload } });
  } catch (err) {
    next(err);
  }
};