import pool from "../config/db.js";

export const getDriverIdByUserId = async (user_id) => {
  const [rows] = await pool.query(`SELECT driver_id FROM drivers WHERE user_id = ?`, [user_id]);
  return rows[0]?.driver_id || null;
};

// Driver identity (name/phone/email/address) is joined in from `users`.
export const getDriverProfile = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT d.driver_id, d.user_id, u.full_name AS name, d.employee_id,
            u.phone_number AS phone, u.email AS email, u.address AS address,
            d.experience_years, d.joining_date, d.vehicle_number, d.vehicle_type,
            d.registration_number, d.capacity_tons
     FROM drivers d
     JOIN users u ON d.user_id = u.user_id
     WHERE d.driver_id = ?`,
    [driver_id]
  );
  return rows[0];
};

// Full history of a driver's deliveries for a given month (used by the
// driver-facing AssignedDeliveries page, which mirrors the admin Delivery
// History page but scoped to a single driver). Orders are assigned to
// drivers by the admin (see adminModel.assignOrderToDriver).
export const getDriverHistoryByMonth = async (driver_id, year, month) => {
  const [rows] = await pool.query(
    `SELECT d.delivery_id, o.order_unique_id, wb.crop_name, o.quantity_tons,
            fu.full_name AS farmer_name, bu.full_name AS buyer_name,
            f.location AS pickup_location, bu.address AS drop_location,
            d.status, d.assigned_at, d.delivered_at
     FROM deliveries d
     JOIN orders o ON d.order_id = o.order_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN farms f ON f.farmer_id = wb.farmer_id
     JOIN users fu ON wb.farmer_id = fu.user_id
     JOIN users bu ON o.buyer_id = bu.user_id
     WHERE d.driver_id = ? AND MONTH(d.assigned_at) = ? AND YEAR(d.assigned_at) = ?
     ORDER BY d.assigned_at DESC`,
    [driver_id, month, year]
  );
  return rows;
};

// Per-day trip counts for the last 15 days (used to draw the earnings bar
// chart). Days with no deliveries are simply absent from the result set —
// the caller fills the gaps so the chart always has 15 bars.
export const getDailyTripsLast15Days = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT DATE(delivered_at) AS day, COUNT(*) AS trips
     FROM deliveries
     WHERE driver_id = ? AND status = 'Delivered'
       AND delivered_at >= CURDATE() - INTERVAL 14 DAY
     GROUP BY DATE(delivered_at)
     ORDER BY day ASC`,
    [driver_id]
  );
  return rows;
};

export const getActiveDeliveriesForDriver = async (driver_id) => {
  const [rows] = await pool.query(
    `SELECT d.delivery_id, o.order_unique_id, f.location AS pickup_location, bu.address AS drop_location,
            wb.crop_name, o.quantity_tons, d.status
     FROM deliveries d
     JOIN orders o ON d.order_id = o.order_id
     JOIN marketplace_listings ml ON o.listing_id = ml.listing_id
     JOIN warehouse_batches wb ON ml.batch_id = wb.batch_id
     JOIN farms f ON f.farmer_id = wb.farmer_id
     JOIN users bu ON o.buyer_id = bu.user_id
     WHERE d.driver_id = ? AND d.status != 'Delivered'
     ORDER BY d.assigned_at ASC`,
    [driver_id]
  );
  return rows;
};

// Cascades the delivery status change onto orders / marketplace_listings /
// warehouse_batches, per the business rules:
//   Picked Up -> order 'Shipped'
//   Delivered -> order 'Delivered', listing 'Sold', batch 'Sold'
export const updateDeliveryStatus = async (delivery_id, status) => {
  const connection = await pool.getConnection();
  try {
    await connection.beginTransaction();

    const columnMap = {
      "Picked Up": "picked_up_at",
      "In Transit": "in_transit_at",
      Delivered: "delivered_at",
    };
    const column = columnMap[status];

    if (column) {
      await connection.query(
        `UPDATE deliveries SET status = ?, ${column} = NOW() WHERE delivery_id = ?`,
        [status, delivery_id]
      );
    } else {
      await connection.query(`UPDATE deliveries SET status = ? WHERE delivery_id = ?`, [status, delivery_id]);
    }

    const [deliveryRows] = await connection.query(
      `SELECT order_id FROM deliveries WHERE delivery_id = ?`,
      [delivery_id]
    );
    const order_id = deliveryRows[0]?.order_id;

    if (order_id && status === "Picked Up") {
      await connection.query(`UPDATE orders SET order_status = 'Shipped' WHERE order_id = ?`, [order_id]);
    }

    if (order_id && status === "Delivered") {
      await connection.query(`UPDATE orders SET order_status = 'Delivered' WHERE order_id = ?`, [order_id]);

      const [orderRows] = await connection.query(`SELECT listing_id FROM orders WHERE order_id = ?`, [order_id]);
      const listing_id = orderRows[0]?.listing_id;

      if (listing_id) {
        await connection.query(`UPDATE marketplace_listings SET status = 'Sold' WHERE listing_id = ?`, [listing_id]);

        const [listingRows] = await connection.query(
          `SELECT batch_id FROM marketplace_listings WHERE listing_id = ?`,
          [listing_id]
        );
        const batch_id = listingRows[0]?.batch_id;
        if (batch_id) {
          await connection.query(`UPDATE warehouse_batches SET status = 'Sold' WHERE batch_id = ?`, [batch_id]);
        }
      }
    }

    await connection.commit();
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
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
