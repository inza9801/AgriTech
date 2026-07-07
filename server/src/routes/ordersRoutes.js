import express from "express";
import { listOrders, listPickups, listShipmentStatuses } from "../controllers/ordersController.js";

const router = express.Router();

router.get("/", listOrders);
router.get("/pickups", listPickups);
router.get("/shipment-status", listShipmentStatuses);

export default router;