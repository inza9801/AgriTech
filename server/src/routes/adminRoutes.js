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
  historyByMonth,
} from "../controllers/adminController.js";

import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const adminOnly = [protect, protectRole("admin")];

router.get("/admin/incoming-requests", adminOnly, incomingRequests);
router.get("/admin/incoming-requests/:orderId", adminOnly, requestDetail);
router.get("/admin/drivers", adminOnly, drivers);
router.post("/admin/assign-order", adminOnly ,assignOrder);
router.get("/admin/shipments", adminOnly, shipments);
router.get("/admin/dashboard-summary", adminOnly, dashboardSummary);
router.get("/admin/history-summary", adminOnly, historySummary);
router.get("/admin/assignable-orders", adminOnly, assignableOrders);
router.get("/admin/assigned-orders", adminOnly, assignedOrdersToday);
router.get("/admin/assigned-orders/:deliveryId", adminOnly, assignedOrderDetail);
router.get("/admin/history-by-month", adminOnly, historyByMonth);

export default router;