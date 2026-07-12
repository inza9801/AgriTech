import express from "express";
import {
  pendingOffers,
  accept,
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
router.get("/deliveries/pending-offers", driverOnly, pendingOffers);
router.post("/deliveries/:orderId/accept", driverOnly, accept);
router.get("/deliveries/dashboard-summary", driverOnly, dashboardSummary);
router.get("/deliveries/earnings-summary", driverOnly, earningsSummary);
router.get("/deliveries", driverOnly, listDeliveries);
router.patch("/deliveries/:id/status", driverOnly, updateStatus);

export default router;