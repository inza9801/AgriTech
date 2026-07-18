import {
  getBuyerDashboardSummary,
  getRecentOrders,
  getLocations,
  getListings,
  getListingDetail,
  getCartItems,
  addToCart,
  removeCartItem,
  placeOrderFromCart,
  getOrderHistory,
  getTrackingForBuyer,
  getOrderDetailForBuyer,
} from "../models/buyerModel.js";

export const dashboardSummary = async (req, res, next) => {
  try {
    const data = await getBuyerDashboardSummary(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const recentOrders = async (req, res, next) => {
  try {
    const data = await getRecentOrders(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const locations = async (req, res, next) => {
  try {
    const data = await getLocations();
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const listings = async (req, res, next) => {
  try {
    const { location } = req.query;
    const data = await getListings(location);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const listingDetail = async (req, res, next) => {
  try {
    const data = await getListingDetail(req.params.id);
    if (!data) {
      res.status(404);
      throw new Error("Listing not found");
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const cartItems = async (req, res, next) => {
  try {
    const data = await getCartItems(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const addCartItem = async (req, res, next) => {
  try {
    const { listing_id, quantity_kg } = req.body;
    const data = await addToCart({ buyer_id: req.user.user_id, listing_id, quantity_kg });
    res.status(201).json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const deleteCartItem = async (req, res, next) => {
  try {
    await removeCartItem(req.params.id);
    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    next(err);
  }
};

export const placeOrder = async (req, res, next) => {
  try {
    const orderIds = await placeOrderFromCart(req.user.user_id);
    res.status(201).json({ success: true, data: { orderIds } });
  } catch (err) {
    next(err);
  }
};

export const orderHistory = async (req, res, next) => {
  try {
    const data = await getOrderHistory(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};

export const tracking = async (req, res, next) => {
  try {
    const data = await getTrackingForBuyer(req.user.user_id);
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};
// /buyer/order-detail/:id? — with an id, fetches that specific order
// (ownership-checked); without one, returns the buyer's most recent order.
export const orderDetail = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = await getOrderDetailForBuyer(req.user.user_id, id || null);
    if (!data) {
      res.status(404);
      throw new Error("Order not found");
    }
    res.json({ success: true, data });
  } catch (err) {
    next(err);
  }
};