import express from "express";
import { register, login, me, registerDriver, listDrivers } from "../controllers/authController.js";
import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, me);

// Admin-only driver management
router.post("/register-driver", protect, protectRole("admin"), registerDriver);
router.get("/drivers", protect, protectRole("admin"), listDrivers);

export default router;
