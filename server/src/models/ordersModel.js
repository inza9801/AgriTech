import pool from "../config/db.js";

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

export const getShipmentStatusesForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT ss.shipment_status_id, o.order_unique_id, ss.status, ss.updated_at
     FROM shipment_status ss
     JOIN orders o ON ss.order_id = o.order_id
     WHERE o.farmer_id = ?
     ORDER BY ss.updated_at DESC`,
    [farmer_id]
  );
  return rows;
};