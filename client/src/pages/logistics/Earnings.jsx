import { useState, useEffect } from "react";
import "./css/Earnings.css";
import { FaMoneyBillWave, FaTruck, FaWallet } from "react-icons/fa";
import { getEarningsSummary } from "../../api/deliveryService";

function Earnings() {
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getEarningsSummary();
        setEarnings(res.data.data);
      } catch (err) {
        setError("Failed to load earnings data");
        console.error(err);
      }
    })();
  }, []);

  const summary = [
    { icon: <FaMoneyBillWave />, title: "Today's Earnings", value: `৳${earnings?.todayEarnings || 0}`, className: "todayIcon" },
    { icon: <FaWallet />, title: "Monthly Earnings", value: `৳${earnings?.monthlyEarnings || 0}`, className: "monthIcon" },
    { icon: <FaTruck />, title: "Completed Trips", value: earnings?.totalCompletedTrips || 0, className: "tripIcon" },
  ];

  return (
    <div className="earningsContainer">
      <div className="pageHeader">
        <h1>Earnings</h1>
        <p>Track your delivery income. Each completed trip earns ৳100.</p>
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

export default Earnings;