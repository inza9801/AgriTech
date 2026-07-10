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

router.get("/pending-offers", pendingOffers);
router.post("/:orderId/accept", accept);
router.get("/", listDeliveries);
router.patch("/:id/status", updateStatus);
router.get("/dashboard-summary", dashboardSummary);
router.get("/earnings-summary", earningsSummary);
router.get("/profile", profile);

export default router;