import {
  getOrdersForFarmer,
  getPickupsForFarmer,
  getShipmentStatusesForFarmer,
} from "../models/ordersModel.js";

const DEFAULT_FARMER_ID = 1;

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