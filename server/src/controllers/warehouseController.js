import { getUnsoldBatches, getBatchSummary } from "../models/warehouseModel.js";

const DEFAULT_FARMER_ID = 1;

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