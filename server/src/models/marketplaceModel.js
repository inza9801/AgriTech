import pool from "../config/db.js";

export const getListableBatches = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT batch_id, crop_name, quantity_tons FROM warehouse_batches
     WHERE farmer_id = ? AND status = 'Stored'`,
    [farmer_id]
  );
  return rows;
};

export const createListing = async ({ farmer_id, batch_id, quantity_tons, price_per_kg }) => {
  const estimated_revenue = quantity_tons * 1000 * price_per_kg;
  const [batchRows] = await pool.query(`SELECT crop_name FROM warehouse_batches WHERE batch_id = ?`, [batch_id]);
  const crop_name = batchRows[0]?.crop_name || "Rice";

  const [result] = await pool.query(
    `INSERT INTO marketplace_listings
      (farmer_id, batch_id, crop_name, quantity_tons, price_per_kg, buyer_type, sale_type, status, estimated_revenue)
     VALUES (?, ?, ?, ?, ?, 'Wholesale Trader', 'Fixed Price', 'Available', ?)`,
    [farmer_id, batch_id, crop_name, quantity_tons, price_per_kg, estimated_revenue]
  );

  await pool.query(`UPDATE warehouse_batches SET status = 'Ready for Sale' WHERE batch_id = ?`, [batch_id]);

  return { listing_id: result.insertId, batch_id, crop_name, quantity_tons, price_per_kg };
};

export const getListingsSummary = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT COUNT(*) AS totalListings FROM marketplace_listings WHERE farmer_id = ?`,
    [farmer_id]
  );
  return rows[0];
};

export const getOffersForFarmer = async (farmer_id) => {
  const [rows] = await pool.query(
    `SELECT bo.offer_id, u.full_name AS buyer_name, ml.crop_name, bo.quantity_tons,
            bo.offer_price_per_kg, bo.created_at, bo.offer_status, bo.listing_id
     FROM buyer_offers bo
     JOIN marketplace_listings ml ON bo.listing_id = ml.listing_id
     JOIN users u ON bo.buyer_id = u.user_id
     WHERE ml.farmer_id = ?
     ORDER BY bo.created_at DESC`,
    [farmer_id]
  );
  return rows;
};

export const updateOfferStatus = async (offer_id, status) => {
  await pool.query(`UPDATE buyer_offers SET offer_status = ? WHERE offer_id = ?`, [status, offer_id]);
};

export const getOfferById = async (offer_id) => {
  const [rows] = await pool.query(`SELECT * FROM buyer_offers WHERE offer_id = ?`, [offer_id]);
  return rows[0];
};

export const createOrderFromOffer = async ({ farmer_id, buyer_id, listing_id, quantity_tons, total_price }) => {
  const order_unique_id = `ORD${Date.now()}`;
  const [result] = await pool.query(
    `INSERT INTO orders (order_unique_id, farmer_id, buyer_id, listing_id, quantity_tons, total_price, order_status, payment_status, payment_method)
     VALUES (?, ?, ?, ?, ?, ?, 'Confirmed', 'Pending', 'Bank Transfer')`,
    [order_unique_id, farmer_id, buyer_id, listing_id, quantity_tons, total_price]
  );
  return result.insertId;
};