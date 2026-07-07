import api from "./axios.js";

export const getIncomingRequests = () => api.get("/admin/incoming-requests");
export const getRequestDetail = (orderId) => api.get(`/admin/incoming-requests/${orderId}`);
export const getDrivers = () => api.get("/admin/drivers");
export const assignOrder = (data) => api.post("/admin/assign-order", data);
export const getShipments = () => api.get("/admin/shipments");
export const getDashboardSummary = () => api.get("/admin/dashboard-summary");
export const getHistorySummary = () => api.get("/admin/history-summary");

export const getAssignableOrders = () => api.get("/admin/assignable-orders");
export const getAssignedOrdersToday = () => api.get("/admin/assigned-orders");
export const getAssignedOrderDetail = (deliveryId) => api.get(`/admin/assigned-orders/${deliveryId}`);