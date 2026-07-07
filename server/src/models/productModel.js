import pool from "../config/db.js";

// CREATE TABLE products (
//   id INT AUTO_INCREMENT PRIMARY KEY,
//   farmer_id INT NOT NULL,
//   name VARCHAR(150) NOT NULL,
//   description TEXT,
//   price DECIMAL(10,2) NOT NULL,
//   quantity INT DEFAULT 0,
//   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
//   FOREIGN KEY (farmer_id) REFERENCES users(id)
// );

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
