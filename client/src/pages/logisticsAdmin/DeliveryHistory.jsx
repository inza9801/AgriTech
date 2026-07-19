import { useState, useEffect } from "react";
import "./css/DeliveryHistory.css";
import { FaTruck, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { getHistorySummary, getHistoryByMonth } from "../../api/adminService";

const monthNow = new Date().toISOString().slice(0, 7); // "YYYY-MM"

function DeliveryHistory() {
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState("");

  const [selectedMonth, setSelectedMonth] = useState(monthNow); // "YYYY-MM"
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getHistorySummary();
        setSummaryData(res.data.data);
      } catch (err) {
        setError("Failed to load delivery history");
        console.error(err);
      }
    })();
  }, []);

  const loadOrdersForMonth = async (monthValue) => {
    if (!monthValue) return;
    const [year, month] = monthValue.split("-");
    setOrdersLoading(true);
    setOrdersError("");
    try {
      const res = await getHistoryByMonth(year, Number(month));
      setOrders(res.data.data);
    } catch (err) {
      setOrdersError("Failed to load orders for the selected month");
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadOrdersForMonth(selectedMonth);
  }, [selectedMonth]);

  const summary = [
    { icon: <FaCheckCircle />, title: "Delivered Today", value: summaryData?.deliveredToday ?? 0, className: "completedIcon" },
    { icon: <FaCalendarAlt />, title: "Delivered This Month", value: summaryData?.deliveredThisMonth ?? 0, className: "deliveryIcon" },
    { icon: <FaTruck />, title: "Total Delivered (All Time)", value: summaryData?.totalDelivered ?? 0, className: "revenueIcon" },
  ];

  const formatMonthLabel = (monthValue) => {
    if (!monthValue) return "";
    const [year, month] = monthValue.split("-");
    return new Date(Number(year), Number(month) - 1, 1).toLocaleString("default", {
      month: "long",
      year: "numeric",
    });
  };

  return (
    <div className="deliveryHistory">
      <div className="pageHeader">
        <h1>Delivery History</h1>
        <p>Simple stats overview of completed deliveries.</p>
      </div>

      {error && <p className="formError">{error}</p>}

      <div className="summaryGrid">
        {summary.map((item, index) => (
          <div className="summaryCard" key={index}>
            <div className={`summaryIcon ${item.className}`}>{item.icon}</div>
            <div>
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="deliverySection">
        <div className="sectionTitle">
          <h2>Order History by Month</h2>
          <input
            type="month"
            className="monthPicker"
            value={selectedMonth}
            max={monthNow}
            onChange={(e) => setSelectedMonth(e.target.value)}
          />
        </div>

        {ordersError && <p className="formError">{ordersError}</p>}

        {ordersLoading ? (
          <p>Loading orders...</p>
        ) : orders.length === 0 ? (
          <p>No orders found for {formatMonthLabel(selectedMonth)}.</p>
        ) : (
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Farmer</th>
                  <th>Buyer</th>
                  <th>Driver</th>
                  <th>Vehicle</th>
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
                    <td>{o.driver_name}</td>
                    <td>{o.vehicle_number}</td>
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

export default DeliveryHistory;
