import api from "./axios.js";

export const getDashboardSummary = () => api.get("/crops/dashboard-summary");
export const getCrop = () => api.get("/crops");
export const getLatestSensorReading = () => api.get("/sensors/latest");
export const submitSensorReading = (data) => api.post("/sensors", data);
export const getWeather = (lat, lon) => api.get(`/weather?lat=${lat}&lon=${lon}`);
export const getSensorHistory = () => api.get("/sensors/history");



export const getUnsoldBatches = () => api.get("/warehouse/batches");
export const getWarehouseSummary = () => api.get("/warehouse/summary");

export const getListableBatches = () => api.get("/marketplace/listable-batches");
export const createListing = (data) => api.post("/marketplace/listings", data);
export const getListingsSummary = () => api.get("/marketplace/summary");
export const getOffers = () => api.get("/marketplace/offers");
export const acceptOffer = (id) => api.patch(`/marketplace/offers/${id}/accept`);
export const rejectOffer = (id) => api.patch(`/marketplace/offers/${id}/reject`);

export const getOrders = () => api.get("/orders");
export const getPickups = () => api.get("/orders/pickups");
export const getShipmentStatuses = () => api.get("/orders/shipment-status");