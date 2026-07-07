import pool from "../config/db.js";

// Single-crop setup: returns the one Rice crop for the given field
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
