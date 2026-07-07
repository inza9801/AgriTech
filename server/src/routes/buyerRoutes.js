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

const router = express.Router();

router.get("/dashboard-summary", dashboardSummary);
router.get("/recent-orders", recentOrders);
router.get("/locations", locations);
router.get("/listings", listings);
router.get("/listings/:id", listingDetail);
router.get("/cart", cartItems);
router.post("/cart", addCartItem);
router.delete("/cart/:id", deleteCartItem);
router.post("/cart/place-order", placeOrder);
router.get("/orders", orderHistory);
router.get("/tracking", tracking);

export default router;