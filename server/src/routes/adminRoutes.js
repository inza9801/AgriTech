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

router.get("/admin/incoming-requests", incomingRequests);
router.get("/admin/incoming-requests/:orderId", requestDetail);
router.get("/admin/drivers", drivers);
router.post("/admin/assign-order", assignOrder);
router.get("/admin/shipments", shipments);
router.get("/admin/dashboard-summary", dashboardSummary);
router.get("/admin/history-summary", historySummary);

router.get("/admin/assignable-orders", assignableOrders);
router.get("/admin/assigned-orders", assignedOrdersToday);
router.get("/admin/assigned-orders/:deliveryId", assignedOrderDetail);

export default router;