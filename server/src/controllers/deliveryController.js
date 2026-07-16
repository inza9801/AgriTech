import {
  getDriverIdByUserId,
  getDriverProfile,
  getDriverHistoryByMonth,
  getDailyTripsLast15Days,
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

export const historyByMonth = async (req, res, next) => {
  try {
    const driver_id = await resolveDriverId(req, res);
    const { year, month } = req.query;
    if (!year || !month) {
      res.status(400);
      throw new Error("year and month query params are required");
    }
    const data = await getDriverHistoryByMonth(driver_id, year, month);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const dailyEarnings = async (req, res, next) => {
  try {
    const driver_id = await resolveDriverId(req, res);
    const rows = await getDailyTripsLast15Days(driver_id);
    const RATE_PER_TRIP = 100;

    const byDay = {};
    rows.forEach((r) => {
      const key = new Date(r.day).toISOString().slice(0, 10);
      byDay[key] = r.trips;
    });

    const data = [];
    for (let i = 14; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      const trips = byDay[key] || 0;
      data.push({ date: key, trips, earnings: trips * RATE_PER_TRIP });
    }

    res.json({ success: true, data });
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