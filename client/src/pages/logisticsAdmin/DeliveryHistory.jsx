import { useState, useEffect } from "react";
import "./css/DeliveryHistory.css";
import { FaTruck, FaCheckCircle, FaCalendarAlt } from "react-icons/fa";
import { getHistorySummary } from "../../api/adminService";

function DeliveryHistory() {
  const [summaryData, setSummaryData] = useState(null);
  const [error, setError] = useState("");

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

  const summary = [
    { icon: <FaCheckCircle />, title: "Delivered Today", value: summaryData?.deliveredToday ?? 0, className: "completedIcon" },
    { icon: <FaCalendarAlt />, title: "Delivered This Month", value: summaryData?.deliveredThisMonth ?? 0, className: "deliveryIcon" },
    { icon: <FaTruck />, title: "Total Delivered (All Time)", value: summaryData?.totalDelivered ?? 0, className: "revenueIcon" },
  ];

  return (
    <div className="deliveryHistory">
      <div className="pageHeader">
        <h1>Delivery History</h1>
        <p>Simple stats overview of completed deliveries.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

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
    </div>
  );
}

export default DeliveryHistory;