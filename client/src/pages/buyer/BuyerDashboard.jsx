import { useState, useEffect } from "react";
import "./css/BuyerDashboard.css";
import { getDashboardSummary, getRecentOrders } from "../../api/buyerService";

const BuyerDashboard = () => {
  const [summary, setSummary] = useState(null);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    setError("");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="buyerDashboard">
      <div className="pageHeader">
        <h1 className="pageTitle">Buyer Dashboard</h1>
        <p className="pageSubtitle">Overview of your orders and activity.</p>
      </div>

      {error && (
        <div className="formError">
          {error}
          <button onClick={loadData} className="retryBtn">
            Retry
          </button>
        </div>
      )}

      {loading ? (
        <div className="summaryGrid">
          {Array.from({ length: 3 }).map((_, i) => (
            <div className="skeleton" style={{ height: 100 }} key={i} />
          ))}
        </div>
      ) : (
        <>
          <div className="summaryGrid">
            <div className="summaryCard">
              <h3>Total Orders</h3>
              <h2>{summary?.totalOrders ?? 0}</h2>
            </div>
            <div className="summaryCard">
              <h3>Pending Deliveries</h3>
              <h2>{summary?.pendingDeliveries ?? 0}</h2>
            </div>
            <div className="summaryCard">
              <h3>Completed Orders</h3>
              <h2>{summary?.completedOrders ?? 0}</h2>
            </div>
          </div>

          <div className="ordersSection">
            <h2>Recent Orders</h2>

            {orders.length === 0 ? (
              <div className="emptyState">
                <div className="emptyIcon">📦</div>
                <p>No orders yet.</p>
              </div>
            ) : (
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
                        <span className={`status ${(order.order_status || "").toLowerCase()}`}>
                          {order.order_status}
                        </span>
                      </td>
                      <td>৳{order.total_price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BuyerDashboard;
