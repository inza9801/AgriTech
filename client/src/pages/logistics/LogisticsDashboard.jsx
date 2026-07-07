import { useState, useEffect } from "react";
import "./css/LogisticsDashboard.css";
import {
  FaClipboardList,
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";
import { getDriverProfile, getDashboardSummary } from "../../api/logisticsService";

function LogisticsDashboard() {
  const [driver, setDriver] = useState(null);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [driverRes, summaryRes] = await Promise.all([
          getDriverProfile(),
          getDashboardSummary(),
        ]);
        setDriver(driverRes.data.data);
        setSummary(summaryRes.data.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      }
    })();
  }, []);

  const cards = [
    { icon: <FaClipboardList />, title: "Assigned Today", value: summary?.assignedToday || 0, className: "assignedIcon" },
    { icon: <FaBoxOpen />, title: "Pending Pickup", value: summary?.pendingPickup || 0, className: "pickupIcon" },
    { icon: <FaShippingFast />, title: "In Transit", value: summary?.inTransit || 0, className: "transitIcon" },
    { icon: <FaCheckCircle />, title: "Delivered Today", value: summary?.deliveredToday || 0, className: "completedIcon" },
  ];

  return (
    <div className="logisticsDashboard">
      <div className="pageHeader">
        <h1>Logistics Dashboard</h1>
        <p>Manage your assigned deliveries, pickups and daily transportation tasks.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="welcomeCard">
        <div>
          <h2>Welcome Back, {driver ? driver.name : "..."} 👋</h2>
          <p>
            Vehicle: {driver?.vehicle_number || "--"} | Employee ID: {driver?.employee_id || "--"}
          </p>
        </div>
      </div>

      <div className="summaryGrid">
        {cards.map((item, index) => (
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

export default LogisticsDashboard;