import pool from "../config/db.js";

// Resolve the logged-in farmer's field_id dynamically (was hardcoded DEFAULT_FIELD_ID)
export const getFieldIdForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT f.field_id
     FROM fields f
     JOIN farms fm ON f.farm_id = fm.farm_id
     WHERE fm.farmer_id = ?
     ORDER BY f.field_id ASC
     LIMIT 1`,
    [farmer_id]
  );
  return rows[0]?.field_id || null;
};

export const getCropByField = async (field_id) => {
  const [rows] = await pool.query(
    `SELECT crop_id, crop_name, planting_date, expected_harvest_date,
            growth_stage, health_status, expected_yield_tons,
            days_after_planting, progress_percentage
     FROM crops WHERE field_id = ? ORDER BY crop_id DESC LIMIT 1`,
    [field_id]
  );
  return rows[0] || null;
};

export const getListableBatches = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT batch_id, crop_name, quantity_tons FROM warehouse_batches
     WHERE farmer_id = ? AND status = 'Stored'`,
    [farmer_id]
  );
  return rows;
};

export const createListing = async ({ farmer_id, batch_id, quantity_tons, price_per_kg }) => {
  const estimated_revenue = quantity_tons * 1000 * price_per_kg;
  const [batchRows] = await pool.query(`SELECT crop_name FROM warehouse_batches WHERE batch_id = ?`, [batch_id]);
  const crop_name = batchRows[0]?.crop_name || "Rice";

  const [result] = await pool.query(
    `INSERT INTO marketplace_listings
      (farmer_id, batch_id, crop_name, quantity_tons, price_per_kg, buyer_type, sale_type, status, estimated_revenue)
     VALUES (?, ?, ?, ?, ?, 'Wholesale Trader', 'Fixed Price', 'Available', ?)`,
    [farmer_id, batch_id, crop_name, quantity_tons, price_per_kg, estimated_revenue]
  );

  await pool.query(`UPDATE warehouse_batches SET status = 'Ready for Sale' WHERE batch_id = ?`, [batch_id]);

  return { listing_id: result.insertId, batch_id, crop_name, quantity_tons, price_per_kg };
};

export const getListingsSummary = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS totalListings FROM marketplace_listings WHERE farmer_id = ? AND status != 'Sold'`,
    [farmer_id]
  );
  return rows[0];
};

export const getPendingRequestsForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, u.full_name AS buyer_name, ml.crop_name,
            o.quantity_tons, o.total_price, o.created_at, o.order_status
     FROM orders o
     JOIN users u ON o.buyer_id = u.user_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     WHERE o.farmer_id = ? AND o.order_status = 'Pending'
     ORDER BY o.created_at DESC`,
    [farmer_id]
  );
  return rows;
};

export const getOrderById = async (order_id) => {
  const [rows] = await pool.query(`SELECT * FROM orders WHERE order_id = ?`, [order_id]);
  return rows[0];
};

export const updateOrderStatus = async (order_id, status) => {
  await pool.query(`UPDATE orders SET order_status = ? WHERE order_id = ?`, [status, order_id]);
};

export const updateListingStatus = async (listing_id, status) => {
  await pool.query(`UPDATE marketplace_listings SET status = ? WHERE listing_id = ?`, [status, listing_id]);
};

export const getOrdersForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, u.full_name AS buyer_name, ml.crop_name,
            ml.batch_id, o.quantity_tons, o.total_price, o.created_at, o.order_status
     FROM orders o
     JOIN users u ON o.buyer_id = u.user_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     WHERE o.farmer_id = ?
     ORDER BY o.created_at DESC`,
    [farmer_id]
  );
  return rows;
};

export const getPickupsForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT p.pickup_id, o.order_unique_id, o.order_id, p.driver_name, p.vehicle_number,
            p.pickup_date, p.pickup_time, p.status
     FROM pickups p
     JOIN orders o ON p.order_id = o.order_id
     WHERE o.farmer_id = ?
     ORDER BY p.pickup_date ASC`,
    [farmer_id]
  );
  return rows;
};

export const getShipmentsForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT d.delivery_id, o.order_unique_id, d.crop_name, d.quantity_tons,
            d.pickup_location, d.drop_location, d.status,
            dr.name AS driver_name, dr.vehicle_number
     FROM deliveries d
     JOIN orders o ON d.order_id = o.order_id
     JOIN drivers dr ON d.driver_id = dr.driver_id
     WHERE o.farmer_id = ? AND d.status != 'Delivered'
     ORDER BY d.assigned_at DESC`,
    [farmer_id]
  );
  return rows;
};

export const insertSensorReading = async ({
  field_id,
  soil_moisture_percent,
  soil_temperature_celsius,
  nitrogen_kgha,
  phosphorus_kgha,
  potassium_kgha,
}) => {
  const [result] = await pool.query(
    `INSERT INTO iot_sensor_readings
      (field_id, soil_moisture_percent, soil_temperature_celsius, nitrogen_kgha, phosphorus_kgha, potassium_kgha)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [field_id, soil_moisture_percent, soil_temperature_celsius, nitrogen_kgha, phosphorus_kgha, potassium_kgha]
  );
  return { reading_id: result.insertId, field_id, soil_moisture_percent, soil_temperature_celsius, nitrogen_kgha, phosphorus_kgha, potassium_kgha };
};

export const getLatestSensorReading = async (field_id) => {
  const [rows] = await pool.query(
    `SELECT * FROM iot_sensor_readings WHERE field_id = ? ORDER BY recorded_at DESC LIMIT 1`,
    [field_id]
  );
  return rows[0] || null;
};

export const getSensorHistory = async (field_id, limit = 20) => {
  const [rows] = await pool.query(
    `SELECT * FROM iot_sensor_readings WHERE field_id = ? ORDER BY recorded_at ASC LIMIT ?`,
    [field_id, limit]
  );
  return rows;
};

export const getUnsoldBatches = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT batch_id, crop_name, quantity_tons, arrival_date, expiry_date
     FROM warehouse_batches WHERE farmer_id = ? AND status != 'Sold'
     ORDER BY arrival_date DESC`,
    [farmer_id]
  );
  return rows;
};

export const getBatchSummary = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS totalBatches, COALESCE(SUM(quantity_tons),0) AS totalStock
     FROM warehouse_batches WHERE farmer_id = ? AND status != 'Sold'`,
    [farmer_id]
  );
  return rows[0];
};

export const getAllProducts = async () => {
  const [rows] = await pool.query("SELECT * FROM products ORDER BY created_at DESC");
  return rows;
};

export const getProductById = async (id) => {
  const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id]);
  return rows[0];
};

export const createProduct = async ({ farmer_id, name, description, price, quantity }) => {
  const [result] = await pool.query(
    "INSERT INTO products (farmer_id, name, description, price, quantity) VALUES (?, ?, ?, ?, ?)",
    [farmer_id, name, description, price, quantity]
  );
  return { id: result.insertId, farmer_id, name, description, price, quantity };
};

export const updateCrop = async (crop_id, growth_stage, health_status) => {
  await pool.query(
    `UPDATE crops SET growth_stage = ?, health_status = ? WHERE crop_id = ?`,
    [growth_stage, health_status, crop_id]
  );
};

export const addBatch = async ({ farmer_id, crop_name, quantity_tons, arrival_date, expiry_date, status }) => {
  const [result] = await pool.query(
    `INSERT INTO warehouse_batches (farmer_id, crop_name, quantity_tons, arrival_date, expiry_date, status)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [farmer_id, crop_name, quantity_tons, arrival_date, expiry_date, status]
  );
  return { batch_id: result.insertId, farmer_id, crop_name, quantity_tons, arrival_date, expiry_date, status };
};