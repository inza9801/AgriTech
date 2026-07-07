import express from "express";
import { getCrop, getDashboardSummary } from "../controllers/cropController.js";

const router = express.Router();

router.get("/", getCrop);
router.get("/dashboard-summary", getDashboardSummary);

export default router;
