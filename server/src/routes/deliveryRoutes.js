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

const router = express.Router();

// Drivers
router.get("/drivers/profile", profile);

// Deliveries
router.get("/deliveries/pending-offers", pendingOffers);
router.post("/deliveries/:orderId/accept", accept);
router.get("/deliveries/dashboard-summary", dashboardSummary);
router.get("/deliveries/earnings-summary", earningsSummary);
router.get("/deliveries", listDeliveries);
router.patch("/deliveries/:id/status", updateStatus);

export default router;