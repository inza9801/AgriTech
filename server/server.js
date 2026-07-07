import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";

// ADD these imports near your existing route imports:
import sensorRoutes from "./src/routes/sensorRoutes.js";
import cropRoutes from "./src/routes/cropRoutes.js";
import weatherRoutes from "./src/routes/weatherRoutes.js";


import warehouseRoutes from "./src/routes/warehouseRoutes.js";
import marketplaceRoutes from "./src/routes/marketplaceRoutes.js";
import ordersRoutes from "./src/routes/ordersRoutes.js";

import { testConnection } from "./src/config/db.js";
import authRoutes from "./src/routes/authRoutes.js";
import productRoutes from "./src/routes/productRoutes.js";
import { notFound, errorHandler } from "./src/middleware/errorMiddleware.js";

import driverRoutes from "./src/routes/driverRoutes.js";
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
app.use("/api/products", productRoutes);

// ADD these mounts near your existing app.use("/api/...") lines:
app.use("/api/sensors", sensorRoutes);
app.use("/api/crops", cropRoutes);
app.use("/api/weather", weatherRoutes);

app.use("/api/warehouse", warehouseRoutes);
app.use("/api/marketplace", marketplaceRoutes);
app.use("/api/orders", ordersRoutes);

app.use("/api/drivers", driverRoutes);
app.use("/api/deliveries", deliveryRoutes);

app.use("/api/buyer", buyerRoutes);

app.use("/api/admin", adminRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

testConnection().then(() => {
  app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
});
