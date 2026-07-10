import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

import { testConnection } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

import farmerRoutes from "./src/routes/farmerRoutes.js";
import deliveryRoutes from "./src/routes/deliveryRoutes.js";

import buyerRoutes from "./src/routes/buyerRoutes.js";

import adminRoutes from "./src/routes/adminRoutes.js";

dotenv.config();

const app = express();

app.use(cors({ origin: process.env.CLIENT_URL, credentials: true }));
app.use(express.json());
app.use(morgan("dev"));

app.get("/", (req, res) => res.send("AgriNexus API is running 🚀"));

app.get("/api/health", (req, res) => res.json({ status: "ok" }));

app.use("/api/auth", authRoutes);

// Single mount — farmerRoutes.js now uses full explicit paths internally
// (/crops, /sensors, /weather, /warehouse, /marketplace, /orders, /products)
app.use("/api", farmerRoutes);

app.use("/api", deliveryRoutes);

app.use("/api", buyerRoutes);

app.use("/api", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

testConnection().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});