import pool from "../config/db.js";

export const getDriverProfile = async (driver_id) => {
  const [rows] = await pool.query(`SELECT * FROM drivers WHERE driver_id = ?`, [driver_id]);
  return rows[0];
};