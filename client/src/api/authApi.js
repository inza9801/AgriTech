import api from "./axios.js";

export const loginUser = (data) => api.post("/auth/login", data);
export const registerUser = (data) => api.post("/auth/register", data);
export const getMe = () => api.get("/auth/me");
export const registerDriver = (data) => api.post("/auth/register-driver", data);
export const getDrivers = () => api.get("/auth/drivers");