import "./css/Irrigation.css";
import { useState } from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import {
  FaTint,
  FaTemperatureHigh,
  FaWater,
  FaCloudRain,
  FaPowerOff,
  FaSeedling,
} from "react-icons/fa";

function Irrigation() {
  const sensorData = [
    {
      icon: <FaTint />,
      title: "Soil Moisture",
      value: "43 %",
      status: "Low",
    },
    {
      icon: <FaTemperatureHigh />,
      title: "Soil Temperature",
      value: "31 °C",
      status: "Normal",
    },
    {
      icon: <FaWater />,
      title: "Air Humidity",
      value: "74 %",
      status: "Good",
    },
    {
      icon: <FaWater />,
      title: "Water Level",
      value: "82 %",
      status: "Sufficient",
    },
    {
      icon: <FaCloudRain />,
      title: "Rain Probability",
      value: "25 %",
      status: "Low",
    },
    {
      icon: <FaPowerOff />,
      title: "Pump Status",
      value: "OFF",
      status: "Waiting",
    },
    {
      icon: <FaSeedling />,
      title: "Irrigation Status",
      value: "Required",
      status: "AI Recommendation",
    },
  ];
  const waterHistory = [
    { day: "Mon", water: 210 },
    { day: "Tue", water: 235 },
    { day: "Wed", water: 180 },
    { day: "Thu", water: 255 },
    { day: "Fri", water: 195 },
    { day: "Sat", water: 220 },
    { day: "Sun", water: 205 },
  ];
  const [mode, setMode] = useState("Auto");
  return (
    <div className="irrigation">
      {/* ===========================
          PAGE HEADER
      =========================== */}
      <div className="pageHeader">
        <h1>Irrigation Control</h1>

        <p>
          Monitor irrigation status, manage water supply, and view live IoT
          sensor information.
        </p>
      </div>

      {/* ===========================
      CONTROL PANEL
=========================== */}

      <div className="controlSection">
        <div className="sectionTitle">
          <h2>Irrigation Control Panel</h2>
        </div>

        <div className="controlCard">
          <div className="modeInfo">
            <h3>Current Mode</h3>

            <h1>{mode}</h1>

            <p>
              {mode === "Auto"
                ? "AI automatically controls irrigation based on sensor values."
                : "Farmer manually controls irrigation."}
            </p>
          </div>

          <div className="toggleButtons">
            <button
              className={mode === "Auto" ? "activeButton" : "inactiveButton"}
              onClick={() => setMode("Auto")}
            >
              Auto Mode
            </button>

            <button
              className={mode === "Manual" ? "activeButton" : "inactiveButton"}
              onClick={() => setMode("Manual")}
            >
              Manual Mode
            </button>
          </div>

          <div className="pumpControl">
            <h3>Pump Control</h3>

            <button
              disabled={mode === "Auto"}
              className={mode === "Auto" ? "disabledButton" : "startButton"}
            >
              Start Pump
            </button>

            <button
              disabled={mode === "Auto"}
              className={mode === "Auto" ? "disabledButton" : "stopButton"}
            >
              Stop Pump
            </button>
          </div>
        </div>
      </div>

      {/* ===========================
      LIVE SENSOR DATA
=========================== */}

      <div className="sensorSection">
        <div className="sectionTitle">
          <h2>Live IoT Sensor Data</h2>
        </div>

        <div className="sensorGrid">
          {sensorData.map((sensor, index) => (
            <div className="sensorCard" key={index}>
              <div className="sensorIcon">{sensor.icon}</div>

              <div className="sensorContent">
                <h4>{sensor.title}</h4>

                <h2>{sensor.value}</h2>

                <span>{sensor.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===========================
      PUMP STATUS
=========================== */}

      <div className="pumpSection">
        <div className="sectionTitle">
          <h2>Pump Status</h2>
        </div>

        <div className="pumpCard">
          <div className="pumpLeft">
            <h3>Main Irrigation Pump</h3>

            <h1>{mode === "Auto" ? "Automatic" : "Manual"}</h1>

            <p>
              Current Pump State :
              <span className="pumpState">
                {mode === "Auto"
                  ? " Waiting for AI Decision"
                  : " Controlled by Farmer"}
              </span>
            </p>
          </div>

          <div className="pumpRight">
            <div className="pumpInfo">
              <h4>Water Flow Rate</h4>

              <p>22 L/min</p>
            </div>

            <div className="pumpInfo">
              <h4>Pressure</h4>

              <p>1.8 Bar</p>
            </div>

            <div className="pumpInfo">
              <h4>Today's Runtime</h4>

              <p>1 hr 18 min</p>
            </div>

            <div className="pumpInfo">
              <h4>Next Irrigation</h4>

              <p>06:30 AM</p>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
      WATER USAGE HISTORY
=========================== */}

      <div className="historySection">
        <div className="sectionTitle">
          <h2>Water Usage History</h2>
        </div>

        <div className="historyCard">
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={waterHistory}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="day" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="water"
                stroke="#2E7D32"
                strokeWidth={3}
                name="Water Usage (Liters)"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ===========================
      AI RECOMMENDATION
=========================== */}

      <div className="recommendationSection">
        <div className="sectionTitle">
          <h2>AI Irrigation Recommendation</h2>
        </div>

        <div className="recommendationGrid">
          <div className="recommendationCard">
            <h3>Current Analysis</h3>

            <table>
              <tbody>
                <tr>
                  <td>Crop</td>
                  <td>Rice</td>
                </tr>

                <tr>
                  <td>Growth Stage</td>
                  <td>Vegetative</td>
                </tr>

                <tr>
                  <td>Soil Moisture</td>
                  <td>43%</td>
                </tr>

                <tr>
                  <td>Temperature</td>
                  <td>31°C</td>
                </tr>

                <tr>
                  <td>Humidity</td>
                  <td>74%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="recommendationCard">
            <h3>AI Decision</h3>

            <h1 className="recommendText">Irrigation Required</h1>

            <p>
              Soil moisture is below the recommended threshold. AI recommends
              starting irrigation within the next
              <strong> 30 minutes</strong>.
            </p>

            <ul>
              <li>Recommended Duration : 22 Minutes</li>

              <li>Estimated Water : 180 Liters</li>

              <li>Expected Moisture After Irrigation : 58%</li>
            </ul>
          </div>

          <div className="recommendationCard">
            <h3>Next Schedule</h3>

            <table>
              <tbody>
                <tr>
                  <td>Next Check</td>
                  <td>06:30 AM</td>
                </tr>

                <tr>
                  <td>Rain Forecast</td>
                  <td>25%</td>
                </tr>

                <tr>
                  <td>AI Confidence</td>
                  <td>96.8%</td>
                </tr>

                <tr>
                  <td>Water Saving</td>
                  <td>14%</td>
                </tr>

                <tr>
                  <td>Status</td>
                  <td>Monitoring</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Irrigation;
