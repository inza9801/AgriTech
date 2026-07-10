import {
  getCropByField,
  getListableBatches,
  createListing,
  getListingsSummary,
  getPendingRequestsForFarmer,
  getOrderById,
  updateOrderStatus,
  getOrdersForFarmer,
  getPickupsForFarmer,
  getShipmentStatusesForFarmer,
  getAllProducts, 
  getProductById, 
  createProduct,
  insertSensorReading, getLatestSensorReading, 
  getSensorHistory,
  getUnsoldBatches, 
  getBatchSummary,
  updateCrop,
  addBatch,
} from "../models/farmerModel.js";





const DEFAULT_FIELD_ID = 1;
const MOISTURE_THRESHOLD = 40; // below this => irrigation needed
const DEFAULT_FARMER_ID = 1;

export const createBatch = async (req, res, next) => {
  try {
    const {
      crop_name,
      quantity_tons,
      arrival_date,
      expiry_date,
      status,
    } = req.body;

    if (
      !crop_name ||
      !quantity_tons ||
      !arrival_date ||
      !expiry_date ||
      !status
    ) {
      res.status(400);
      throw new Error("All fields are required.");
    }

    const batch = await addBatch({
      farmer_id: DEFAULT_FARMER_ID,
      crop_name,
      quantity_tons,
      arrival_date,
      expiry_date,
      status,
    });

    res.status(201).json({
      success: true,
      data: batch,
    });
  } catch (err) {
    next(err);
  }
};

export const getCrop = async (req, res, next) => {
  try {
    const crop = await getCropByField(DEFAULT_FIELD_ID);
    if (!crop) {
      res.status(404);
      throw new Error("No crop found");
    }
    res.json({ success: true, data: crop });
  } catch (err) {
    next(err);
  }
};

// Simplified summary used by the dashboard's top cards
export const getDashboardSummary = async (req, res, next) => {
  try {
    const crop = await getCropByField(DEFAULT_FIELD_ID);
    const reading = await getLatestSensorReading(DEFAULT_FIELD_ID);

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
    const batches = await getListableBatches(DEFAULT_FARMER_ID);
    res.json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const addListing = async (req, res, next) => {
  try {
    const { batch_id, quantity_tons, price_per_kg } = req.body;
    const listing = await createListing({ farmer_id: DEFAULT_FARMER_ID, batch_id, quantity_tons, price_per_kg });
    res.status(201).json({ success: true, data: listing });
  } catch (err) {
    next(err);
  }
};

export const summary = async (req, res, next) => {
  try {
    const data = await getListingsSummary(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

// Pending buyer requests, sourced from the orders table
export const requests = async (req, res, next) => {
  try {
    const data = await getPendingRequestsForFarmer(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const confirmOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
      res.status(404);
      throw new Error("Order not found");
    }
    await updateOrderStatus(order.order_id, "Confirmed");
    res.json({ success: true, message: "Order confirmed" });
  } catch (err) {
    next(err);
  }
};

export const cancelOrder = async (req, res, next) => {
  try {
    const order = await getOrderById(req.params.id);
    if (!order) {
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
    const data = await getOrdersForFarmer(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const listPickups = async (req, res, next) => {
  try {
    const data = await getPickupsForFarmer(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const listShipmentStatuses = async (req, res, next) => {
  try {
    const data = await getShipmentStatusesForFarmer(DEFAULT_FARMER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};



export const listProducts = async (req, res, next) => {
  try {
    const products = await getAllProducts();
    res.json({ success: true, data: products });
  } catch (err) {
    next(err);
  }
};

export const getProduct = async (req, res, next) => {
  try {
    const product = await getProductById(req.params.id);
    if (!product) {
      res.status(404);
      throw new Error("Product not found");
    }
    res.json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const { name, description, price, quantity } = req.body;
    const product = await createProduct({
      farmer_id: req.user.id,
      name,
      description,
      price,
      quantity,
    });
    res.status(201).json({ success: true, data: product });
  } catch (err) {
    next(err);
  }
};



// Hardcoded to the single seeded field for this one-farmer setup



export const addSensorReading = async (req, res, next) => {
  try {
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
      field_id: DEFAULT_FIELD_ID,
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
    const reading = await getLatestSensorReading(DEFAULT_FIELD_ID);
    res.json({ success: true, data: reading });
  } catch (err) {
    next(err);
  }
};



export const getHistory = async (req, res, next) => {
  try {
    const history = await getSensorHistory(DEFAULT_FIELD_ID);
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};





export const listBatches = async (req, res, next) => {
  try {
    const batches = await getUnsoldBatches(DEFAULT_FARMER_ID);
    res.json({ success: true, data: batches });
  } catch (err) {
    next(err);
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const summary = await getBatchSummary(DEFAULT_FARMER_ID);
    res.json({ success: true, data: summary });
  } catch (err) {
    next(err);
  }
};

// Uses Open-Meteo (free, no API key required)
// Docs: https://open-meteo.com/en/docs

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

    res.json({
      success: true,
      message: "Crop updated successfully",
    });
  } catch (err) {
    next(err);
  }
};