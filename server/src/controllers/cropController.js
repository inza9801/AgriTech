import { getCropByField } from "../models/cropModel.js";
import { getLatestSensorReading } from "../models/sensorModel.js";

const DEFAULT_FIELD_ID = 1;
const MOISTURE_THRESHOLD = 40; // below this => irrigation needed

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
