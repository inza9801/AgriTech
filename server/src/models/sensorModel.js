import pool from "../config/db.js";

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
