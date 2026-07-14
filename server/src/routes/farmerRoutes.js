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
  getFertilizerOptions,
  predictFertilizer,
  predictIrrigation,
  predictDisease,
} from "../controllers/farmerController.js";

import {
  protect,
  protectRole,
} from "../middleware/authMiddleware.js";

import {
  uploadLeafImage,
} from "../middleware/uploadMiddleware.js";

const router = express.Router();

// Apply authentication & authorization to all farmer routes
router.use(protect, protectRole("farmer"));

/* -------------------------------------------------------------------------- */
/*                                    Crops                                   */
/* -------------------------------------------------------------------------- */

router.get("/crops", getCrop);

router.get("/crops/dashboard-summary", getDashboardSummary);

router.patch("/crops/:crop_id", updateCropStatus);

/* -------------------------------------------------------------------------- */
/*                                   Sensors                                  */
/* -------------------------------------------------------------------------- */

router.post("/sensors", addSensorReading);

router.get("/sensors/latest", getLatestReading);

router.get("/sensors/history", getHistory);

/* -------------------------------------------------------------------------- */
/*                                   Weather                                  */
/* -------------------------------------------------------------------------- */

router.get("/weather", getCurrentWeather);

/* -------------------------------------------------------------------------- */
/*                              Machine Learning                              */
/* -------------------------------------------------------------------------- */

router.get("/ml/fertilizer-options", getFertilizerOptions);

router.post("/ml/predict-fertilizer", predictFertilizer);

router.post("/ml/predict-irrigation", predictIrrigation);

router.post(
  "/ml/predict-disease",
  uploadLeafImage.single("image"),
  predictDisease
);

/* -------------------------------------------------------------------------- */
/*                                  Warehouse                                 */
/* -------------------------------------------------------------------------- */

router.get("/warehouse/batches", listBatches);

router.post("/warehouse/batches", createBatch);

router.get("/warehouse/summary", getSummary);

/* -------------------------------------------------------------------------- */
/*                                 Marketplace                                */
/* -------------------------------------------------------------------------- */

router.get("/marketplace/listable-batches", listableBatches);

router.post("/marketplace/listings", addListing);

router.get("/marketplace/summary", summary);

router.get("/marketplace/requests", requests);

router.patch(
  "/marketplace/requests/:id/confirm",
  confirmOrder
);

router.patch(
  "/marketplace/requests/:id/cancel",
  cancelOrder
);

/* -------------------------------------------------------------------------- */
/*                                   Orders                                   */
/* -------------------------------------------------------------------------- */

router.get("/orders", listOrders);

router.get("/orders/shipments", listShipments);

export default router;