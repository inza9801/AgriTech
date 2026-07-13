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

const MOISTURE_THRESHOLD = 40;

// Resolves the logged-in farmer's field_id, or throws a 404-style error
const resolveFieldId = async (req, res) => {
  const field_id = await getFieldIdForFarmer(req.user.user_id);
  if (!field_id) {
    res.status(404);
    throw new Error("No field found for this farmer. Please set up your farm/field first.");
  }
  return field_id;
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

export const getDashboardSummary = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const crop = await getCropByField(field_id);
    const reading = await getLatestSensorReading(field_id);

    const cropHealth = crop && crop.health_status === "Healthy" ? "Healthy" : "Diseased";

    let irrigationStatus = "Unknown";
    if (reading) {
      irrigationStatus = reading.soil_moisture_percent < MOISTURE_THRESHOLD ? "Irrigation Needed" : "Not Needed";
    }

    res.json({
      success: true,
      data: {
        cropHealth,
        irrigationStatus,
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

export const addSensorReading = async (req, res, next) => {
  try {
    const field_id = await resolveFieldId(req, res);
    const { soil_moisture_percent, soil_temperature_celsius, nitrogen_kgha, phosphorus_kgha, potassium_kgha } = req.body;

    if (
      soil_moisture_percent === undefined ||
      soil_temperature_celsius === undefined ||
      nitrogen_kgha === undefined ||
      phosphorus_kgha === undefined ||
      potassium_kgha === undefined
    ) {
      res.status(400);
      throw new Error("All sensor fields are required");
    }

    const reading = await insertSensorReading({
      field_id,
      soil_moisture_percent,
      soil_temperature_celsius,
      nitrogen_kgha,
      phosphorus_kgha,
      potassium_kgha,
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

export const getCurrentWeather = async (req, res, next) => {
  try {
    const { lat, lon } = req.query;
    if (!lat || !lon) {
      res.status(400);
      throw new Error("lat and lon query params are required");
    }

    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation_probability,weather_code`;
    const response = await fetch(url);
    if (!response.ok) {
      res.status(502);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    const current = data.current;

    res.json({
      success: true,
      data: {
        temperature: current.temperature_2m,
        humidity: current.relative_humidity_2m,
        rainProbability: current.precipitation_probability,
        weatherCode: current.weather_code,
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
