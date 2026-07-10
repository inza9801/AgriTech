import pool from "../config/db.js";



export const getDriverProfile = async (driver_id) => {
  const [rows] = await pool.query(`SELECT * FROM drivers WHERE driver_id = ?`, [driver_id]);
  return rows[0];
};

export const getPendingOffers = async () => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, ml.crop_name, o.quantity_tons,
            fu.full_name AS farmer_name, bu.full_name AS buyer_name
     FROM orders o
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN users fu ON o.farmer_id = fu.user_id
     JOIN users bu ON o.buyer_id = bu.user_id
     WHERE o.order_status = 'Confirmed'
       AND o.order_id NOT IN (SELECT order_id FROM deliveries)
     ORDER BY o.created_at DESC`
  );
  return rows;
};

export const acceptDelivery = async (order_id, driver_id) => {
  const [orderRows] = await pool.query(
    `SELECT o.order_id, ml.crop_name, o.quantity_tons, fu.full_name AS farmer_name, bu.full_name AS buyer_name
     FROM orders o
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN users fu ON o.farmer_id = fu.user_id
     JOIN users bu ON o.buyer_id = bu.user_id
     WHERE o.order_id = ?`,
    [order_id]
  );
  const order = orderRows[0];
  if (!order) throw new Error("Order not found");

  const [result] = await pool.query(
    `INSERT INTO deliveries (order_id, driver_id, pickup_location, drop_location, crop_name, quantity_tons, status)
     VALUES (?, ?, ?, ?, ?, ?, 'Assigned')`,
    [order_id, driver_id, order.farmer_name, order.buyer_name, order.crop_name, order.quantity_tons]
  );
  return { delivery_id: result.insertId };
};

export const getActiveDeliveriesForDriver = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT d.delivery_id, o.order_unique_id, d.pickup_location, d.drop_location,
            d.crop_name, d.quantity_tons, d.status
     FROM deliveries d
     JOIN orders o ON d.order_id = o.order_id
     WHERE d.driver_id = ? AND d.status != 'Delivered'
     ORDER BY d.assigned_at ASC`,
    [driver_id]
  );
  return rows;
};

export const updateDeliveryStatus = async (delivery_id, status) => {
  const columnMap = {
    "Picked Up": "picked_up_at",
    "In Transit": "in_transit_at",
    "Delivered": "delivered_at",
  };
  const column = columnMap[status];
  if (column) {
    await pool.query(`UPDATE deliveries SET status = ?, ${column} = NOW() WHERE delivery_id = ?`, [status, delivery_id]);
  } else {
    await pool.query(`UPDATE deliveries SET status = ? WHERE delivery_id = ?`, [status, delivery_id]);
  }
};

export const getDashboardSummary = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT
      SUM(CASE WHEN DATE(assigned_at) = CURDATE() THEN 1 ELSE 0 END) AS assignedToday,
      SUM(CASE WHEN status = 'Assigned' THEN 1 ELSE 0 END) AS pendingPickup,
      SUM(CASE WHEN status = 'In Transit' THEN 1 ELSE 0 END) AS inTransit,
      SUM(CASE WHEN status = 'Delivered' AND DATE(delivered_at) = CURDATE() THEN 1 ELSE 0 END) AS deliveredToday
     FROM deliveries WHERE driver_id = ?`,
    [driver_id]
  );
  return rows[0];
};

export const getEarningsSummary = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT
      SUM(CASE WHEN DATE(delivered_at) = CURDATE() THEN 1 ELSE 0 END) AS deliveredToday,
      SUM(CASE WHEN MONTH(delivered_at) = MONTH(CURDATE()) AND YEAR(delivered_at) = YEAR(CURDATE()) THEN 1 ELSE 0 END) AS deliveredThisMonth,
      COUNT(*) AS totalCompleted
     FROM deliveries WHERE driver_id = ? AND status = 'Delivered'`,
    [driver_id]
  );
  return rows[0];
};