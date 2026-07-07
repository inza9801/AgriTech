import pool from "../config/db.js";

// Expected table (create in MySQL):
// CREATE TABLE users (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   name VARCHAR(100) NOT NULL,
//   email VARCHAR(150) UNIQUE NOT NULL,
//   password VARCHAR(255) NOT NULL,
//   role ENUM('farmer','buyer','logistics','logisticsAdmin') NOT NULL,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
// );

export const findUserByEmail = async (email) => {
  const [rows] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

export const findUserById = async (id) => {
  const [rows] = await pool.query("SELECT id, name, email, role FROM users WHERE id = ?", [id]);
  return rows[0];
};

export const createUser = async ({ name, email, hashedPassword, role }) => {
  const [result] = await pool.query(
    "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
    [name, email, hashedPassword, role]
  );
  return { id: result.insertId, name, email, role };
};
