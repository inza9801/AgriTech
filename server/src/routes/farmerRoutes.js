import express from "express";
import {
  getCrop,
  getDashboardSummary,
  listableBatches,
  addListing,
  summary,
  requests,
  confirmOrder,
  cancelOrder,
  listOrders,
  listShipments,
  addSensorReading,
  getLatestReading,
  getHistory,
  getCurrentWeather,
  listBatches,
  getSummary,
  updateCropStatus,
  createBatch,
} from "../controllers/farmerController.js";

import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const farmerOnly = [protect, protectRole("farmer")];

// Crops
router.get("/crops", farmerOnly, getCrop);
router.get("/crops/dashboard-summary", farmerOnly, getDashboardSummary);
router.patch("/crops/:crop_id", farmerOnly, updateCropStatus);

// Sensors
router.post("/sensors", farmerOnly, addSensorReading);
router.get("/sensors/latest", farmerOnly, getLatestReading);
router.get("/sensors/history", farmerOnly, getHistory);

// Weather
router.get("/weather", farmerOnly, getCurrentWeather);

// Warehouse
router.get("/warehouse/batches", farmerOnly, listBatches);
router.post("/warehouse/batches", farmerOnly, createBatch);
router.get("/warehouse/summary", farmerOnly, getSummary);

// Marketplace
router.get("/marketplace/listable-batches", farmerOnly, listableBatches);
router.post("/marketplace/listings", farmerOnly, addListing);
router.get("/marketplace/summary", farmerOnly, summary);
router.get("/marketplace/requests", farmerOnly, requests);
router.patch("/marketplace/requests/:id/confirm", farmerOnly, confirmOrder);
router.patch("/marketplace/requests/:id/cancel", farmerOnly, cancelOrder);

// Orders
router.get("/orders", farmerOnly, listOrders);
router.get("/orders/shipments", farmerOnly, listShipments);

export default router;
