import pool from "../config/db.js";

export const getBuyerDashboardSummary = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT
      COUNT(*) AS totalOrders,
      SUM(CASE WHEN order_status NOT IN ('Delivered','Cancelled') THEN 1 ELSE 0 END) AS pendingDeliveries,
      SUM(CASE WHEN order_status = 'Delivered' THEN 1 ELSE 0 END) AS completedOrders
     FROM orders WHERE buyer_id = ?`,
    [buyer_id]
  );
  return rows[0];
};

export const getRecentOrders = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, ml.crop_name, u.full_name AS farmer_name,
            o.order_status, o.total_price
     FROM orders o
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN users u ON o.farmer_id = u.user_id
     WHERE o.buyer_id = ?
     ORDER BY o.created_at DESC
     LIMIT 10`,
    [buyer_id]
  );
  return rows;
};

export const getLocations = async () => {
  const [rows] = await pool.query(`SELECT DISTINCT location FROM farms WHERE location IS NOT NULL`);
  return rows.map((r) => r.location);
};

export const getListings = async (location) => {
  let query = `
    SELECT ml.listing_id, ml.crop_name, ml.quantity_tons, ml.price_per_kg, ml.grade,
           u.full_name AS farmer_name, f.farm_name, f.location
    FROM marketplace_listings ml
    JOIN users u ON ml.farmer_id = u.user_id
    JOIN farms f ON f.farmer_id = u.user_id
    WHERE ml.status = 'Available'`;
  const params = [];
  if (location) {
    query += ` AND f.location = ?`;
    params.push(location);
  }
  const [rows] = await pool.query(query, params);
  return rows;
};

export const getListingDetail = async (listing_id) => {
  const [rows] = await pool.query(
    `SELECT ml.listing_id, ml.crop_name, ml.quantity_tons, ml.price_per_kg, ml.grade,
            ml.buyer_type, ml.sale_type, wb.arrival_date, wb.expiry_date,
            u.full_name AS farmer_name, f.farm_name, f.location
     FROM marketplace_listings ml
     JOIN users u ON ml.farmer_id = u.user_id
     JOIN farms f ON f.farmer_id = u.user_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     WHERE ml.listing_id = ?`,
    [listing_id]
  );
  return rows[0];
};

export const getCartItems = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT ci.cart_item_id, ci.listing_id, ci.quantity_kg, ci.price_per_kg, ci.total_price,
            ml.crop_name, u.full_name AS farmer_name
     FROM cart_items ci
     JOIN marketplace_listings ml ON ci.listing_id = ml.listing_id
     JOIN users u ON ml.farmer_id = u.user_id
     WHERE ci.buyer_id = ?`,
    [buyer_id]
  );
  return rows;
};

export const addToCart = async ({ buyer_id, listing_id, quantity_kg }) => {
  const [listingRows] = await pool.query(`SELECT price_per_kg FROM marketplace_listings WHERE listing_id = ?`, [listing_id]);
  const price_per_kg = listingRows[0]?.price_per_kg;
  if (!price_per_kg) throw new Error("Listing not found");
  const total_price = quantity_kg * price_per_kg;

  const [result] = await pool.query(
    `INSERT INTO cart_items (buyer_id, listing_id, quantity_kg, price_per_kg, total_price)
     VALUES (?, ?, ?, ?, ?)`,
    [buyer_id, listing_id, quantity_kg, price_per_kg, total_price]
  );
  return { cart_item_id: result.insertId };
};

export const removeCartItem = async (cart_item_id) => {
  await pool.query(`DELETE FROM cart_items WHERE cart_item_id = ?`, [cart_item_id]);
};

export const placeOrderFromCart = async (buyer_id) => {
  const [items] = await pool.query(
    `SELECT ci.listing_id, ci.quantity_kg, ci.total_price, ml.farmer_id
     FROM cart_items ci
     JOIN marketplace_listings ml ON ci.listing_id = ml.listing_id
     WHERE ci.buyer_id = ?`,
    [buyer_id]
  );

  const createdOrders = [];
  for (const item of items) {
    const order_unique_id = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const [result] = await pool.query(
      `INSERT INTO orders (order_unique_id, farmer_id, buyer_id, listing_id, quantity_tons, total_price, order_status, payment_status, payment_method)
       VALUES (?, ?, ?, ?, ?, ?, 'Pending', 'Pending', 'Cash')`,
      [order_unique_id, item.farmer_id, buyer_id, item.listing_id, item.quantity_kg / 1000, item.total_price]
    );
    createdOrders.push(result.insertId);
  }

  await pool.query(`DELETE FROM cart_items WHERE buyer_id = ?`, [buyer_id]);
  return createdOrders;
};

export const getOrderHistory = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, o.created_at, o.total_price, o.order_status
     FROM orders o
     WHERE o.buyer_id = ? AND o.order_status != 'Delivered'
     ORDER BY o.created_at DESC`,
    [buyer_id]
  );
  return rows;
};

export const getTrackingForBuyer = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_unique_id, d.status, d.pickup_location, d.drop_location,
            d.assigned_at, d.picked_up_at, d.in_transit_at, d.delivered_at,
            dr.name AS driver_name, dr.phone, dr.vehicle_number
     FROM orders o
     JOIN deliveries d ON d.order_id = o.order_id
     JOIN drivers dr ON d.driver_id = dr.driver_id
     WHERE o.buyer_id = ? AND d.status != 'Delivered'
     ORDER BY d.assigned_at DESC`,
    [buyer_id]
  );
  return rows;
};