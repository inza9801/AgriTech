import { useState, useEffect } from "react";
import "./css/AssignedDeliveries.css";
import { getDriverHistoryByMonth } from "../../api/deliveryService";

const monthNow = new Date().toISOString().slice(0, 7); // "YYYY-MM"

function AssignedDeliveries() {
  const [selectedMonth, setSelectedMonth] = useState(monthNow);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loadOrdersForMonth = async (monthValue) => {
    if (!monthValue) return;
    const [year, month] = monthValue.split("-");
    setLoading(true);
    setError("");
    try {
      const res = await getDriverHistoryByMonth(year, Number(month));
      setOrders(res.data.data);
    } catch (err) {
      setError("Failed to load deliveries for the selected month");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrdersForMonth(selectedMonth);
  }, [selectedMonth]);

  const formatMonthLabel = (monthValue) => {
    if (!monthValue) return "";
    const [year, month] = monthValue.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="assignedContainer">
      <div className="pageHeader">
        <h1>Assigned Deliveries</h1>
        <p>Select a month to view your delivery history.</p>
      </div>

      {error && <p className="formError">{error}</p>}

      <div className="deliverySection">
        <div className="sectionTitle">
          <h2>Delivery History by Month</h2>
          <input
            type="month"
            className="monthPicker"
            value={selectedMonth}
            max={monthNow}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        {loading ? (
          <p>Loading deliveries...</p>
        ) : orders.length === 0 ? (
          <p>No deliveries found for {formatMonthLabel(selectedMonth)}.</p>
        ) : (
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Pickup (Seller)</th>
                  <th>Drop (Buyer)</th>
                  <th>Status</th>
                  <th>Assigned At</th>
                  <th>Delivered At</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((o) => (
                  <tr key={o.delivery_id}>
                    <td>{o.order_unique_id}</td>
                    <td>{o.crop_name}</td>
                    <td>{o.quantity_tons} Ton</td>
                    <td>{o.farmer_name}</td>
                    <td>{o.buyer_name}</td>
                    <td>{o.status}</td>
                    <td>{o.assigned_at ? new Date(o.assigned_at).toLocaleString() : "-"}</td>
                    <td>{o.delivered_at ? new Date(o.delivered_at).toLocaleString() : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignedDeliveries;
