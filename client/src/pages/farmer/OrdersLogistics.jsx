import { useState, useEffect } from "react";
import "./css/OrdersLogistics.css";
import { getOrders, getPickups, getShipmentStatuses } from "../../api/farmerService";

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
          getShipmentStatuses(),
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

  const stageOrder = ["Order Confirmed", "Picked Up", "In Transit", "Delivered"];

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

      {/* PICKUP SCHEDULE */}
      <div className="pickupSection">
        <div className="sectionTitle">
          <h2>Pickup Schedule</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Pickup Date</th>
                <th>Time</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {pickups.map((p) => (
                <tr key={p.pickup_id}>
                  <td>{p.order_unique_id}</td>
                  <td>{p.driver_name}</td>
                  <td>{p.vehicle_number}</td>
                  <td>{p.pickup_date}</td>
                  <td>{p.pickup_time}</td>
                  <td>{p.status}</td>
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
          {shipments.map((s) => {
            const currentIndex = stageOrder.indexOf(s.status);
            return (
              <div className="shipmentCard" key={s.shipment_status_id}>
                <div className="shipmentHeader">
                  <h3>Order #{s.order_unique_id}</h3>
                  <span className="transitStatus">{s.status}</span>
                </div>

                <div className="shipmentTimeline">
                  {stageOrder.map((stage, i) => (
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