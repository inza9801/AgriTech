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
export const getBuyerRequests = () => api.get("/marketplace/requests");
export const confirmOrder = (id) => api.patch(`/marketplace/requests/${id}/confirm`);
export const cancelOrder = (id) => api.patch(`/marketplace/requests/${id}/cancel`);

export const getOrders = () => api.get("/orders");
export const getPickups = () => api.get("/orders/pickups");
export const getShipments = () => api.get("/orders/shipments");

export const updateGrowthStage = (crop_id, growth_stage) => api.patch(`/crops/${crop_id}/growth-stage`, { growth_stage });
export const getAllBatches = () => api.get("/warehouse/all-batches");
export const addBatch = (data) => api.post("/warehouse/batches", data);

export const getProducts = () => api.get("/products");
export const getProduct = (id) => api.get(`/products/${id}`);
export const createProduct = (data) => api.post("/products", data);

export const updateCrop = (crop_id, data) => api.patch(`/crops/${crop_id}`, data);