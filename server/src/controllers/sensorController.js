import { insertSensorReading, getLatestSensorReading, getSensorHistory } from "../models/sensorModel.js";

// Hardcoded to the single seeded field for this one-farmer setup
const DEFAULT_FIELD_ID = 1;

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



// ...keep existing code, add this new function:

export const getHistory = async (req, res, next) => {
  try {
    const history = await getSensorHistory(DEFAULT_FIELD_ID);
    res.json({ success: true, data: history });
  } catch (err) {
    next(err);
  }
};