import {
  getPendingOffers,
  acceptDelivery,
  getActiveDeliveriesForDriver,
  updateDeliveryStatus,
  getDashboardSummary,
  getEarningsSummary,
} from "../models/deliveryModel.js";

const DEFAULT_DRIVER_ID = 1;

export const pendingOffers = async (req, res, next) => {
  try {
    const data = await getPendingOffers();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const accept = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const result = await acceptDelivery(orderId, DEFAULT_DRIVER_ID);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const listDeliveries = async (req, res, next) => {
  try {
    const data = await getActiveDeliveriesForDriver(DEFAULT_DRIVER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const updateStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const validStatuses = ["Picked Up", "In Transit", "Delivered"];
    if (!validStatuses.includes(status)) {
      res.status(400);
      throw new Error("Invalid status");
    }
    await updateDeliveryStatus(req.params.id, status);
    res.json({ success: true, message: `Status updated to ${status}` });
  } catch (err) {
    next(err);
  }
};

export const dashboardSummary = async (req, res, next) => {
  try {
    const data = await getDashboardSummary(DEFAULT_DRIVER_ID);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const earningsSummary = async (req, res, next) => {
  try {
    const data = await getEarningsSummary(DEFAULT_DRIVER_ID);
    const RATE_PER_TRIP = 100;
    res.json({
      success: true,
      data: {
        todayEarnings: (data.deliveredToday || 0) * RATE_PER_TRIP,
        monthlyEarnings: (data.deliveredThisMonth || 0) * RATE_PER_TRIP,
        totalCompletedTrips: data.totalCompleted || 0,
      },
    });
  } catch (err) {
    next(err);
  }
};