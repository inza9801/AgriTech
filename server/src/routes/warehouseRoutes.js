import express from "express";
import { listBatches, getSummary } from "../controllers/warehouseController.js";

const router = express.Router();

router.get("/batches", listBatches);
router.get("/summary", getSummary);

export default router;