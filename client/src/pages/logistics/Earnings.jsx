import { useState, useEffect } from "react";
import "./css/Earnings.css";
import { FaMoneyBillWave, FaTruck, FaWallet } from "react-icons/fa";
import { getEarningsSummary, getDailyEarnings } from "../../api/deliveryService";

function Earnings() {
  const [earnings, setEarnings] = useState(null);
  const [error, setError] = useState("");

  const [dailyData, setDailyData] = useState([]);
  const [chartError, setChartError] = useState("");
  const [chartLoading, setChartLoading] = useState(true);

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

    (async () => {
      try {
        const res = await getDailyEarnings();
        setDailyData(res.data.data);
      } catch (err) {
        setChartError("Failed to load daily earnings chart");
        console.error(err);
      } finally {
        setChartLoading(false);
      }
    })();
  }, []);

  const summary = [
    { icon: <FaMoneyBillWave />, title: "Today's Earnings", value: `৳${earnings?.todayEarnings || 0}`, className: "todayIcon" },
    { icon: <FaWallet />, title: "Monthly Earnings", value: `৳${earnings?.monthlyEarnings || 0}`, className: "monthIcon" },
    { icon: <FaTruck />, title: "Completed Trips", value: earnings?.totalCompletedTrips || 0, className: "tripIcon" },
  ];

  const maxEarning = Math.max(1, ...dailyData.map((d) => d.earnings));

  const formatDayLabel = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("default", { day: "numeric", month: "short" });
  };

  return (
    <div className="earningsContainer">
      <div className="pageHeader">
        <h1>Earnings</h1>
        <p>Track your delivery income. Each completed trip earns ৳100.</p>
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
          <h2>Earnings - Last 15 Days</h2>
        </div>

        {chartError && <p className="formError">{chartError}</p>}

        {chartLoading ? (
          <p>Loading chart...</p>
        ) : (
          <div
            className="earningsChart"
            style={{
              display: "flex",
              alignItems: "flex-end",
              gap: "8px",
              height: "220px",
              padding: "16px 8px 0",
              overflowX: "auto",
            }}
          >
            {dailyData.map((d) => (
              <div
                key={d.date}
                title={`${formatDayLabel(d.date)}: ৳${d.earnings} (${d.trips} trip${d.trips === 1 ? "" : "s"})`}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "flex-end",
                  minWidth: "28px",
                  flex: "1 0 auto",
                  height: "100%",
                }}
              >
                <span style={{ fontSize: "11px", marginBottom: "4px" }}>
                  {d.earnings > 0 ? `৳${d.earnings}` : ""}
                </span>
                <div
                  style={{
                    width: "100%",
                    maxWidth: "28px",
                    height: `${Math.max(4, (d.earnings / maxEarning) * 160)}px`,
                    background: "linear-gradient(180deg, #2e7d32, #66bb6a)",
                    borderRadius: "4px 4px 0 0",
                  }}
                />
                <span style={{ fontSize: "10px", marginTop: "6px", whiteSpace: "nowrap" }}>
                  {formatDayLabel(d.date)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Earnings;
