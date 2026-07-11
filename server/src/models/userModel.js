import pool from "../config/db.js";
import bcrypt from "bcryptjs";

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE email = ?`, [email]);
  return rows[0];
};

export const findUserByUsername = async (username) => {
  const [rows] = await pool.query(`SELECT * FROM users WHERE username = ?`, [username]);
  return rows[0];
};

export const findUserById = async (user_id) => {
  const [rows] = await pool.query(
    `SELECT user_id, username, email, role, full_name, phone_number, address, created_at
     FROM users WHERE user_id = ?`,
    [user_id]
  );
  return rows[0];
};

export const createUser = async ({
  username,
  email,
  password,
  role,
  full_name,
  phone_number,
  address,
}) => {
  const password_hash = await bcrypt.hash(password, 10);

  const [result] = await pool.query(
    `INSERT INTO users (username, email, password_hash, role, full_name, phone_number, address)
     VALUES (?, ?, ?, ?, ?, ?, ?)`,
    [username, email, password_hash, role, full_name, phone_number || null, address || null]
  );

  return {
    user_id: result.insertId,
    username,
    email,
    role,
    full_name,
    phone_number,
    address,
  };
};

export const comparePassword = async (plainPassword, hash) => {
  return bcrypt.compare(plainPassword, hash);
};

// Admin creates a driver: one user row (role='driver') + one linked drivers row
export const createDriverUser = async ({
  username,
  email,
  password,
  full_name,
  phone_number,
  address,
  employee_id,
  driver_phone,
  vehicle_number,
  vehicle_type,
  registration_number,
  capacity_tons,
  experience_years,
  joining_date,
}) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const password_hash = await bcrypt.hash(password, 10);

    const [userResult] = await connection.query(
      `INSERT INTO users (username, email, password_hash, role, full_name, phone_number, address)
       VALUES (?, ?, ?, 'driver', ?, ?, ?)`,
      [username, email, password_hash, full_name, phone_number || null, address || null]
    );
    const user_id = userResult.insertId;

    const [driverResult] = await connection.query(
      `INSERT INTO drivers
        (user_id, name, employee_id, phone, email, address, experience_years, joining_date,
         vehicle_number, vehicle_type, registration_number, capacity_tons)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        user_id,
        full_name,
        employee_id || null,
        driver_phone || phone_number || null,
        email,
        address || null,
        experience_years || null,
        joining_date || null,
        vehicle_number || null,
        vehicle_type || null,
        registration_number || null,
        capacity_tons || null,
      ]
    );

    await connection.commit();
    return { user_id, driver_id: driverResult.insertId };
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};

export const getAllDrivers = async () => {
  const [rows] = await pool.query(
    `SELECT d.driver_id, d.user_id, d.name, d.employee_id, d.phone, d.email, d.address,
            d.experience_years, d.joining_date, d.vehicle_number, d.vehicle_type,
            d.registration_number, d.capacity_tons, u.username
     FROM drivers d
     JOIN users u ON d.user_id = u.user_id
     ORDER BY d.driver_id DESC`
  );
  return rows;
};

// Resolve driver_id from the logged-in user_id (used by delivery routes)
export const getDriverByUserId = async (user_id) => {
  const [rows] = await pool.query(`SELECT * FROM drivers WHERE user_id = ?`, [user_id]);
  return rows[0];
};