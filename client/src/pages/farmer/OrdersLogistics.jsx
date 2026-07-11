import { useState, useEffect } from "react";
import "./css/OrdersLogistics.css";
import { getOrders, getPickups, getShipments } from "../../api/farmerService";

const STAGES = ["Assigned", "Picked Up", "In Transit", "Delivered"];

function OrdersLogistics() {
  const [orders, setOrders] = useState([]);
  const [pickups, setPickups] = useState([]);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [ordersRes, pickupsRes, shipmentsRes] = await Promise.all([
          getOrders(),
          getPickups(),
          getShipments(),
        ]);
        setOrders(ordersRes.data.data);
        setPickups(pickupsRes.data.data);
        setShipments(shipmentsRes.data.data);
      } catch (err) {
        setError("Failed to load orders/logistics data");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="ordersContainer">
      <div className="pageHeader">
        <h1>Orders & Logistics</h1>
        <p>Track incoming orders, monitor pickups, and view shipment progress.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* INCOMING ORDERS */}
      <div className="ordersSection">
        <div className="sectionTitle">
          <h2>Incoming Orders</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Batch</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.order_id}>
                  <td>{order.order_unique_id}</td>
                  <td>BATCH-{order.batch_id}</td>
                  <td>{order.buyer_name}</td>
                  <td>{order.crop_name}</td>
                  <td>{order.quantity_tons} Ton</td>
                  <td>৳{order.total_price}</td>
                  <td>{new Date(order.created_at).toLocaleDateString()}</td>
                  <td>{order.order_status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* SHIPMENT STATUS */}
      <div className="shipmentSection">
        <div className="sectionTitle">
          <h2>Shipment Status</h2>
        </div>

        <div className="shipmentGrid">
          {shipments.length === 0 && <p>No active shipments.</p>}

          {shipments.map((s) => {
            const currentIndex = STAGES.indexOf(s.status);
            return (
              <div className="shipmentCard" key={s.delivery_id}>
                <div className="shipmentHeader">
                  <h3>Order #{s.order_unique_id}</h3>
                  <span className="transitStatus">{s.status}</span>
                </div>

                <p><strong>Product:</strong> {s.crop_name} ({s.quantity_tons} Ton)</p>
                <p><strong>Driver:</strong> {s.driver_name} • {s.vehicle_number}</p>
                <p><strong>Route:</strong> {s.pickup_location} → {s.drop_location}</p>

                <div className="shipmentTimeline">
                  {STAGES.map((stage, i) => (
                    <div
                      key={stage}
                      className={
                        i < currentIndex
                          ? "timelineItem completedStep"
                          : i === currentIndex
                          ? "timelineItem activeStep"
                          : "timelineItem"
                      }
                    >
                      {i <= currentIndex ? "✓ " : "⬜ "}
                      {stage}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default OrdersLogistics;