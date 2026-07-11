import express from "express";
import {
  dashboardSummary,
  recentOrders,
  locations,
  listings,
  listingDetail,
  cartItems,
  addCartItem,
  deleteCartItem,
  placeOrder,
  orderHistory,
  tracking,
} from "../controllers/buyerController.js";

import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, protectRole("buyer"));

router.get("/buyer/dashboard-summary", dashboardSummary);
router.get("/buyer/recent-orders", recentOrders);
router.get("/buyer/locations", locations);
router.get("/buyer/listings", listings);
router.get("/buyer/listings/:id", listingDetail);
router.get("/buyer/cart", cartItems);
router.post("/buyer/cart", addCartItem);
router.delete("/buyer/cart/:id", deleteCartItem);
router.post("/buyer/cart/place-order", placeOrder);
router.get("/buyer/orders", orderHistory);
router.get("/buyer/tracking", tracking);

export default router;