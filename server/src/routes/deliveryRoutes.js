import express from "express";
import {
  historyByMonth,
  dailyEarnings,
  listDeliveries,
  updateStatus,
  dashboardSummary,
  earningsSummary,
  profile,
} from "../controllers/deliveryController.js";

import { protect, protectRole } from "../middleware/authMiddleware.js";
const router = express.Router();

const driverOnly = [protect, protectRole("driver")];


router.get("/drivers/profile", driverOnly, profile);
router.get("/deliveries/history-by-month", driverOnly, historyByMonth);
router.get("/deliveries/dashboard-summary", driverOnly, dashboardSummary);
router.get("/deliveries/earnings-summary", driverOnly, earningsSummary);
router.get("/deliveries/daily-earnings", driverOnly, dailyEarnings);
router.get("/deliveries", driverOnly, listDeliveries);
router.patch("/deliveries/:id/status", driverOnly, updateStatus);

export default router;