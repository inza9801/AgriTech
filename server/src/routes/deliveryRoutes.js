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

router.use(protect, protectRole("driver"));

router.get("/drivers/profile", profile);
router.get("/deliveries/pending-offers", pendingOffers);
router.post("/deliveries/:orderId/accept", accept);
router.get("/deliveries/dashboard-summary", dashboardSummary);
router.get("/deliveries/earnings-summary", earningsSummary);
router.get("/deliveries", listDeliveries);
router.patch("/deliveries/:id/status", updateStatus);

export default router;