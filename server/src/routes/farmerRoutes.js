import express from "express";
import { getCrop, 
    getDashboardSummary,
    listableBatches,
    addListing,
    summary,
    requests,
    confirmOrder,
    cancelOrder,
    listOrders, 
    listPickups, 
    listShipments,
    listProducts, 
    getProduct, 
    addProduct, 
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

// Crops
router.get("/crops", getCrop);
router.get("/crops/dashboard-summary", getDashboardSummary);

// Sensors
router.post("/sensors", addSensorReading);
router.get("/sensors/latest", getLatestReading);
router.get("/sensors/history", getHistory);

// Weather
router.get("/weather", getCurrentWeather);

// Warehouse
router.get("/warehouse/batches", listBatches);
router.post("/warehouse/batches", createBatch);
router.get("/warehouse/summary", getSummary);

// Marketplace
router.get("/marketplace/listable-batches", listableBatches);
router.post("/marketplace/listings", addListing);
router.get("/marketplace/summary", summary);
router.get("/marketplace/requests", requests);
router.patch("/marketplace/requests/:id/confirm", confirmOrder);
router.patch("/marketplace/requests/:id/cancel", cancelOrder);

// Orders
router.get("/orders", listOrders);
router.get("/orders/pickups", listPickups);
router.get("/orders/shipments", listShipments);

// Products
router.get("/products", listProducts);
router.get("/products/:id", getProduct);
router.post("/products", protect, protectRole("farmer"), addProduct);

router.patch("/crops/:crop_id", updateCropStatus);

export default router;