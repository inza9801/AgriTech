import { useState, useEffect } from "react";
import "./css/BuyerDashboard.css";
import { getDashboardSummary, getRecentOrders } from "../../api/buyerService";

const BuyerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [summaryRes, ordersRes] = await Promise.all([
          getDashboardSummary(),
          getRecentOrders(),
        ]);
        setSummary(summaryRes.data.data);
        setOrders(ordersRes.data.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="buyerDashboard">
      <h1>Buyer Dashboard</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="quickActions">
        <h2>Quick Actions</h2>
        <button>Browse Marketplace</button>
        <button>Track Orders</button>
        <button>Go To Cart</button>
        <button>Payments</button>
      </div>

      <div className="summaryGrid">
        <div className="summaryCard"><h3>Total Orders</h3><h2>{summary?.totalOrders ?? "--"}</h2></div>
        <div className="summaryCard"><h3>Pending Deliveries</h3><h2>{summary?.pendingDeliveries ?? "--"}</h2></div>
        <div className="summaryCard"><h3>Completed Orders</h3><h2>{summary?.completedOrders ?? "--"}</h2></div>
      </div>

      <div className="ordersSection">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Product</th>
              <th>Farmer</th>
              <th>Status</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_unique_id}</td>
                <td>{order.crop_name}</td>
                <td>{order.farmer_name}</td>
                <td>
                  <span className={`status ${order.order_status.toLowerCase()}`}>
                    {order.order_status}
                  </span>
                </td>
                <td>৳{order.total_price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuyerDashboard;