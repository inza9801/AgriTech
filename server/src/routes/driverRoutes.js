import express from "express";
import { profile } from "../controllers/driverController.js";

const router = express.Router();
router.get("/profile", profile);

export default router;