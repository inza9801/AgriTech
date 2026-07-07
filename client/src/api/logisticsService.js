import api from "./axios.js";

export const getDriverProfile = () => api.get("/drivers/profile");
export const getPendingOffers = () => api.get("/deliveries/pending-offers");
export const acceptDelivery = (orderId) => api.post(`/deliveries/${orderId}/accept`);
export const getDeliveries = () => api.get("/deliveries");
export const updateDeliveryStatus = (id, status) => api.patch(`/deliveries/${id}/status`, { status });
export const getDashboardSummary = () => api.get("/deliveries/dashboard-summary");
export const getEarningsSummary = () => api.get("/deliveries/earnings-summary");