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

// crop_name/grade/farmer_id/estimated_revenue are no longer stored on the
// listing itself — they're derived via batch_id at read time.
export const createListing = async ({ farmer_id, batch_id, quantity_tons, price_per_kg }) => {
  const [batchRows] = await pool.query(
    `SELECT crop_name FROM warehouse_batches WHERE batch_id = ? AND farmer_id = ?`,
    [batch_id, farmer_id]
  );
  if (!batchRows[0]) throw new Error("Batch not found for this farmer");

  const [result] = await pool.query(
    `INSERT INTO marketplace_listings
      (batch_id, quantity_tons, price_per_kg, buyer_type, sale_type, status)
     VALUES (?, ?, ?, 'Wholesale Trader', 'Fixed Price', 'Available')`,
    [batch_id, quantity_tons, price_per_kg]
  );

  await pool.query(`UPDATE warehouse_batches SET status = 'Ready for Sale' WHERE batch_id = ?`, [batch_id]);

  return { listing_id: result.insertId, batch_id, crop_name: batchRows[0].crop_name, quantity_tons, price_per_kg };
};

export const getListingsSummary = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS totalListings
     FROM marketplace_listings ml
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     WHERE wb.farmer_id = ? AND ml.status != 'Sold'`,
    [farmer_id]
  );
  return rows[0];
};

export const getPendingRequestsForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, u.full_name AS buyer_name, wb.crop_name,
            o.quantity_tons, o.total_price, o.created_at, o.order_status
     FROM orders o
     JOIN users u ON o.buyer_id = u.user_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     WHERE wb.farmer_id = ? AND o.order_status = 'Pending'
     ORDER BY o.created_at DESC`,
    [farmer_id]
  );
  return rows;
};

// Used internally to check ownership + drive status transitions.
// farmer_id is resolved via listing -> batch since orders no longer stores it.
export const getOrderWithFarmerId = async (order_id) => {
  const [rows] = await pool.query(
    `SELECT o.*, wb.farmer_id
     FROM orders o
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     WHERE o.order_id = ?`,
    [order_id]
  );
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
    `SELECT o.order_id, o.order_unique_id, u.full_name AS buyer_name, wb.crop_name,
            wb.batch_id, o.quantity_tons, o.total_price, o.created_at, o.order_status
     FROM orders o
     JOIN users u ON o.buyer_id = u.user_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     WHERE wb.farmer_id = ?
     ORDER BY o.created_at DESC`,
    [farmer_id]
  );
  return rows;
};

export const getShipmentsForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT d.delivery_id, o.order_unique_id, wb.crop_name, o.quantity_tons,
            f.location AS pickup_location, bu.address AS drop_location, d.status,
            du.full_name AS driver_name, dr.vehicle_number
     FROM deliveries d
     JOIN orders o ON d.order_id = o.order_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN farms f ON f.farmer_id = wb.farmer_id
     JOIN users bu ON o.buyer_id = bu.user_id
     JOIN drivers dr ON d.driver_id = dr.driver_id
     JOIN users du ON dr.user_id = du.user_id
     WHERE wb.farmer_id = ? AND d.status != 'Delivered'
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
