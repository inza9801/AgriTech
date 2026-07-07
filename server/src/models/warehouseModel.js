import pool from "../config/db.js";

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