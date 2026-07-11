import {
  getDriverIdByUserId,
  getDriverProfile,
  getPendingOffers,
  acceptDelivery,
  getActiveDeliveriesForDriver,
  updateDeliveryStatus,
  getDashboardSummary,
  getEarningsSummary,
} from "../models/deliveryModel.js";

const resolveDriverId = async (req, res) => {
  const driver_id = await getDriverIdByUserId(req.user.user_id);
  if (!driver_id) {
    res.status(404);
    throw new Error("Driver profile not found for this account");
  }
  return driver_id;
};

export const profile = async (req, res, next) => {
  try {
    const driver_id = await resolveDriverId(req, res);
    const driver = await getDriverProfile(driver_id);
    if (!driver) {
      res.status(404);
      throw new Error("Driver not found");
    }
    res.json({ success: true, data: driver });
  } catch (err) {
    next(err);
  }
};

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
    const driver_id = await resolveDriverId(req, res);
    const { orderId } = req.params;
    const result = await acceptDelivery(orderId, driver_id);
    res.status(201).json({ success: true, data: result });
  } catch (err) {
    next(err);
  }
};

export const listDeliveries = async (req, res, next) => {
  try {
    const driver_id = await resolveDriverId(req, res);
    const data = await getActiveDeliveriesForDriver(driver_id);
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
    const driver_id = await resolveDriverId(req, res);
    const data = await getDashboardSummary(driver_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const earningsSummary = async (req, res, next) => {
  try {
    const driver_id = await resolveDriverId(req, res);
    const data = await getEarningsSummary(driver_id);
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