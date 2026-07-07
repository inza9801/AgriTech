import express from "express";
import {
  incomingRequests,
  requestDetail,
  drivers,
  assignOrder,
  shipments,
  dashboardSummary,
  historySummary,
  assignableOrders,
  assignedOrdersToday,
  assignedOrderDetail,
} from "../controllers/adminController.js";

const router = express.Router();

router.get("/incoming-requests", incomingRequests);
router.get("/incoming-requests/:orderId", requestDetail);
router.get("/drivers", drivers);
router.post("/assign-order", assignOrder);
router.get("/shipments", shipments);
router.get("/dashboard-summary", dashboardSummary);
router.get("/history-summary", historySummary);

router.get("/assignable-orders", assignableOrders);
router.get("/assigned-orders", assignedOrdersToday);
router.get("/assigned-orders/:deliveryId", assignedOrderDetail);

export default router;