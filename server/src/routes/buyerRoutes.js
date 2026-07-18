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
  orderDetail,
} from "../controllers/buyerController.js";

import { protect, protectRole } from "../middleware/authMiddleware.js";

const router = express.Router();

const buyerOnly = [protect, protectRole("buyer")];

router.get("/buyer/dashboard-summary", buyerOnly, dashboardSummary);
router.get("/buyer/recent-orders", buyerOnly, recentOrders);
router.get("/buyer/locations", buyerOnly, locations);
router.get("/buyer/listings", buyerOnly, listings);
router.get("/buyer/listings/:id", buyerOnly, listingDetail);
router.get("/buyer/cart", buyerOnly, cartItems);
router.post("/buyer/cart", buyerOnly, addCartItem);
router.delete("/buyer/cart/:id", buyerOnly, deleteCartItem);
router.post("/buyer/cart/place-order", buyerOnly, placeOrder);
router.get("/buyer/orders", buyerOnly, orderHistory);
router.get("/buyer/tracking", buyerOnly, tracking);
// :id? is optional — /buyer/order-detail with no id returns the latest order.
router.get("/buyer/order-detail/:id?", buyerOnly, orderDetail);

export default router;