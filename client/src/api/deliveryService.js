import api from "./axios.js";

export const getDriverProfile = () => api.get("/drivers/profile");
export const getDriverHistoryByMonth = (year, month) => api.get(`/deliveries/history-by-month?year=${year}&month=${month}`);
export const getDeliveries = () => api.get("/deliveries");
export const updateDeliveryStatus = (id, status) => api.patch(`/deliveries/${id}/status`, { status });
export const getDashboardSummary = () => api.get("/deliveries/dashboard-summary");
export const getEarningsSummary = () => api.get("/deliveries/earnings-summary");
export const getDailyEarnings = () => api.get("/deliveries/daily-earnings");
