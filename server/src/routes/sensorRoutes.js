import express from "express";
import { addSensorReading, getLatestReading, getHistory } from "../controllers/sensorController.js";

const router = express.Router();

router.post("/", addSensorReading);
router.get("/latest", getLatestReading);
router.get("/history", getHistory);

export default router;