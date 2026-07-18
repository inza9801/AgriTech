import api from "./axios.js";

export const getDashboardSummary = () => api.get("/buyer/dashboard-summary");
export const getRecentOrders = () => api.get("/buyer/recent-orders");
export const getLocations = () => api.get("/buyer/locations");
export const getListings = (location) => api.get(`/buyer/listings${location ? `?location=${location}` : ""}`);
export const getListingDetail = (id) => api.get(`/buyer/listings/${id}`);
export const getCartItems = () => api.get("/buyer/cart");
export const addToCart = (data) => api.post("/buyer/cart", data);
export const removeCartItem = (id) => api.delete(`/buyer/cart/${id}`);
export const placeOrder = () => api.post("/buyer/cart/place-order");
export const getOrderHistory = () => api.get("/buyer/orders");
export const getTracking = () => api.get("/buyer/tracking");
// id is optional — omit it to get the buyer's most recent order (default view).
export const getOrderDetail = (id) =>
  api.get(`/buyer/order-detail${id ? `/${id}` : ""}`);