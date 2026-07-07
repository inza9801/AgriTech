import { getDriverProfile } from "../models/driverModel.js";

const DEFAULT_DRIVER_ID = 1;

export const profile = async (req, res, next) => {
  try {
    const driver = await getDriverProfile(DEFAULT_DRIVER_ID);
    if (!driver) {
      res.status(404);
      throw new Error("Driver not found");
    }
    res.json({ success: true, data: driver });
  } catch (err) {
    next(err);
  }
};