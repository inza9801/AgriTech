import pool from "../config/db.js";

export const getBuyerDashboardSummary = async (buyer_id) => {
  const [totalRows] = await pool.query(
    `SELECT COUNT(*) AS totalOrders FROM orders WHERE buyer_id = ?`,
    [buyer_id]
  );

  // Orders still awaiting farmer confirmation
  const [pendingRows] = await pool.query(
    `SELECT COUNT(*) AS pendingDeliveries FROM orders
     WHERE buyer_id = ? AND order_status = 'Pending'`,
    [buyer_id]
  );

  // Completed = delivery actually marked Delivered in the deliveries table
  const [completedRows] = await pool.query(
    `SELECT COUNT(*) AS completedOrders
     FROM orders o
     JOIN deliveries d ON d.order_id = o.order_id
     WHERE o.buyer_id = ? AND d.status = 'Delivered'`,
    [buyer_id]
  );

  return {
    totalOrders: totalRows[0].totalOrders,
    pendingDeliveries: pendingRows[0].pendingDeliveries,
    completedOrders: completedRows[0].completedOrders,
  };
};

export const getRecentOrders = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_id, o.order_unique_id, wb.crop_name, fu.full_name AS farmer_name,
            o.order_status, o.total_price
     FROM orders o
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN users fu ON wb.farmer_id = fu.user_id
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
    SELECT ml.listing_id, wb.crop_name, ml.quantity_tons, ml.price_per_kg, wb.grade,
           fu.full_name AS farmer_name, f.farm_name, f.location
    FROM marketplace_listings ml
    JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
    JOIN users fu ON wb.farmer_id = fu.user_id
    JOIN farms f ON f.farmer_id = fu.user_id
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
    `SELECT ml.listing_id, wb.crop_name, ml.quantity_tons, ml.price_per_kg, wb.grade,
            ml.buyer_type, ml.sale_type, wb.arrival_date, wb.expiry_date,
            fu.full_name AS farmer_name, f.farm_name, f.location
     FROM marketplace_listings ml
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN users fu ON wb.farmer_id = fu.user_id
     JOIN farms f ON f.farmer_id = fu.user_id
     WHERE ml.listing_id = ?`,
    [listing_id]
  );
  return rows[0];
};

export const getCartItems = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT ci.cart_item_id, ci.listing_id, ci.quantity_kg, ci.price_per_kg, ci.total_price,
            wb.crop_name, fu.full_name AS farmer_name
     FROM cart_items ci
     JOIN marketplace_listings ml ON ci.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN users fu ON wb.farmer_id = fu.user_id
     WHERE ci.buyer_id = ?`,
    [buyer_id]
  );
  return rows;
};

export const addToCart = async ({ buyer_id, listing_id, quantity_kg }) => {
  const [listingRows] = await pool.query(`SELECT price_per_kg FROM marketplace_listings WHERE listing_id = ?`, [listing_id]);
  const price_per_kg = listingRows[0]?.price_per_kg;
  if (!price_per_kg) throw new Error("Listing not found");

  // total_price is a generated column now — no need to compute/insert it
  const [result] = await pool.query(
    `INSERT INTO cart_items (buyer_id, listing_id, quantity_kg, price_per_kg)
     VALUES (?, ?, ?, ?)`,
    [buyer_id, listing_id, quantity_kg, price_per_kg]
  );
  return { cart_item_id: result.insertId };
};

export const removeCartItem = async (cart_item_id) => {
  await pool.query(`DELETE FROM cart_items WHERE cart_item_id = ?`, [cart_item_id]);
};

export const placeOrderFromCart = async (buyer_id) => {
  const [items] = await pool.query(
    `SELECT ci.listing_id, ci.quantity_kg, ci.total_price
     FROM cart_items ci
     WHERE ci.buyer_id = ?`,
    [buyer_id]
  );

  const createdOrders = [];
  for (const item of items) {
    const order_unique_id = `ORD${Date.now()}${Math.floor(Math.random() * 1000)}`;
    const [result] = await pool.query(
      `INSERT INTO orders (order_unique_id, buyer_id, listing_id, quantity_tons, total_price, order_status, payment_status, payment_method)
       VALUES (?, ?, ?, ?, ?, 'Pending', 'Pending', 'Cash')`,
      [order_unique_id, buyer_id, item.listing_id, item.quantity_kg / 1000, item.total_price]
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
     WHERE o.buyer_id = ?
     ORDER BY o.created_at DESC`,
    [buyer_id]
  );
  return rows;
};

export const getTrackingForBuyer = async (buyer_id) => {
  const [rows] = await pool.query(
    `SELECT o.order_unique_id, d.status, f.location AS pickup_location, bu.address AS drop_location,
            d.assigned_at, d.picked_up_at, d.in_transit_at, d.delivered_at,
            du.full_name AS driver_name, du.phone_number AS phone, dr.vehicle_number
     FROM orders o
     JOIN deliveries d ON d.order_id = o.order_id
     JOIN drivers dr ON d.driver_id = dr.driver_id
     JOIN users du ON dr.user_id = du.user_id
     JOIN users bu ON o.buyer_id = bu.user_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN farms f ON f.farmer_id = wb.farmer_id
     WHERE o.buyer_id = ? AND d.status != 'Delivered'
     ORDER BY d.assigned_at DESC`,
    [buyer_id]
  );
  return rows;
};
// Full order detail for the buyer's order-detail page. Pass order_id to
// fetch a specific order (ownership checked via buyer_id); omit it to get
// the buyer's most recent order (used as the default view).
// deliveries/drivers are LEFT JOINed since a brand-new order may not have
// a delivery assigned yet.
export const getOrderDetailForBuyer = async (buyer_id, order_id = null) => {
  let query = `
    SELECT o.order_id, o.order_unique_id, o.quantity_tons, o.total_price,
           o.order_status, o.created_at,
           wb.crop_name, wb.grade,
           f.location AS pickup_location, f.farm_name,
           fu.full_name AS farmer_name,
           bu.address AS drop_location, bu.full_name AS buyer_name,
           d.status AS delivery_status, d.assigned_at, d.picked_up_at,
           d.in_transit_at, d.delivered_at,
           du.full_name AS driver_name, du.phone_number AS driver_phone,
           dr.vehicle_number
    FROM orders o
    JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
    JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
    JOIN farms f ON f.farmer_id = wb.farmer_id
    JOIN users fu ON wb.farmer_id = fu.user_id
    JOIN users bu ON o.buyer_id = bu.user_id
    LEFT JOIN deliveries d ON d.order_id = o.order_id
    LEFT JOIN drivers dr ON d.driver_id = dr.driver_id
    LEFT JOIN users du ON dr.user_id = du.user_id
    WHERE o.buyer_id = ?`;
  const params = [buyer_id];

  if (order_id) {
    query += ` AND o.order_id = ?`;
    params.push(order_id);
  } else {
    query += ` ORDER BY o.created_at DESC LIMIT 1`;
  }

  const [rows] = await pool.query(query, params);
  return rows[0] || null;
};