import express from "express";
import { listProducts, getProduct, addProduct } from "../controllers/productController.js";
import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", listProducts);
router.get("/:id", getProduct);
router.post("/", protect, protectRole("farmer"), addProduct);

export default router;
