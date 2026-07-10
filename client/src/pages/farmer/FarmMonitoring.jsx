import { useState, useEffect } from "react";
import "./css/FarmMonitoring.css";

import {
  FaTint,
  FaTemperatureHigh,
  FaWater,
  FaCloudRain,
  FaBug,
  FaCamera,
  FaLeaf,
  FaCheckCircle,
  FaSeedling,
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import {
  getLatestSensorReading,
  getSensorHistory,
  getWeather,
} from "../../api/farmerService";

function FarmMonitoring() {
  const [latest, setLatest] = useState(null);
  const [history, setHistory] = useState([]);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [latestRes, historyRes] = await Promise.all([
          getLatestSensorReading(),
          getSensorHistory(),
        ]);
        setLatest(latestRes.data.data);
        setHistory(historyRes.data.data);
      } catch (err) {
        setError("Failed to load sensor data");
        console.error(err);
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const { latitude, longitude } = position.coords;
              const res = await getWeather(latitude, longitude);
              setWeather(res.data.data);
            } catch (err) {
              console.error(err);
            }
          },
          () => console.warn("Location permission denied — weather unavailable")
        );
      }
    })();
  }, []);

  const sensors = [
    {
      icon: <FaTint />,
      title: "Soil Moisture",
      value: latest ? `${latest.soil_moisture_percent} %` : "--",
    },
    {
      icon: <FaTemperatureHigh />,
      title: "Soil Temperature",
      value: latest ? `${latest.soil_temperature_celsius} °C` : "--",
    },
    {
      icon: <FaWater />,
      title: "Humidity",
      value: weather ? `${weather.humidity} %` : "--",
    },
    {
      icon: <FaCloudRain />,
      title: "Rain Probability",
      value: weather ? `${weather.rainProbability} %` : "--",
    },
  ];

  // Reshape history rows into recharts-friendly format
  const graphData = history.map((row) => ({
    time: new Date(row.recorded_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    moisture: row.soil_moisture_percent,
    temperature: row.soil_temperature_celsius,
    nitrogen: row.nitrogen_kgha,
    phosphorus: row.phosphorus_kgha,
    potassium: row.potassium_kgha,
  }));

  return (
    <div className="farmMonitoring">
      <div className="pageHeader">
        <h1>Farm Monitoring</h1>
        <p>Monitor live IoT sensor data and AI crop health analysis.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* SENSOR CARDS (real data) */}
      <div className="sensorGrid">
        {sensors.map((sensor, index) => (
          <div className="sensorCard" key={index}>
            <div className="sensorIcon">{sensor.icon}</div>
            <div>
              <h4>{sensor.title}</h4>
              <h2>{sensor.value}</h2>
            </div>
          </div>
        ))}
      </div>

      {/* DISEASE DETECTION (hardcoded for now) */}
      <div className="diseaseSection">
        <div className="sectionTitle">
          <FaBug />
          <h2>Disease Detection (AI)</h2>
        </div>

        <div className="diseaseContainer">
          <div className="imageCard">
            <div className="imagePlaceholder">
              <FaCamera />
              <p>Rice Leaf Image</p>
            </div>
          </div>

          <div className="resultCard">
            <h3>
              <FaLeaf />
              Prediction Result
            </h3>
            <table>
              <tbody>
                <tr><td>Disease</td><td>Brown Spot</td></tr>
                <tr><td>Confidence</td><td>97.42%</td></tr>
                <tr><td>Severity</td><td>Medium</td></tr>
                <tr><td>Affected Area</td><td>12%</td></tr>
                <tr>
                  <td>Status</td>
                  <td className="healthy">
                    <FaCheckCircle />
                    Detected
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="recommendationCard">
            <h3>Treatment Recommendation</h3>
            <ul>
              <li>Spray Copper Fungicide.</li>
              <li>Remove infected leaves.</li>
              <li>Avoid excessive irrigation.</li>
              <li>Monitor field for next 5 days.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* FERTILIZER RECOMMENDATION (hardcoded for now) */}
      <div className="fertilizerSection">
        <div className="sectionTitle">
          <FaSeedling />
          <h2>AI Fertilizer Recommendation</h2>
        </div>

        <div className="fertilizerContainer">
          <div className="fertilizerCard">
            <h3>Current Soil Information</h3>
            <table>
              <tbody>
                <tr><td>Crop</td><td>Rice</td></tr>
                <tr><td>Soil Type</td><td>Clay</td></tr>
                <tr><td>Nitrogen (N)</td><td>48 kg/ha</td></tr>
                <tr><td>Phosphorus (P)</td><td>21 kg/ha</td></tr>
                <tr><td>Potassium (K)</td><td>34 kg/ha</td></tr>
                <tr><td>pH</td><td>6.4</td></tr>
                <tr><td>Moisture</td><td>43%</td></tr>
              </tbody>
            </table>
          </div>

          <div className="fertilizerCard">
            <h3>Recommended Fertilizer</h3>
            <div className="recommendBox">
              <h1>Urea + DAP</h1>
              <p>
                Based on the current nutrient values, the AI recommends
                applying the following:
              </p>
              <ul>
                <li>✔ Urea : 60 kg/ha</li>
                <li>✔ DAP : 35 kg/ha</li>
                <li>✔ Potash : 20 kg/ha</li>
              </ul>
            </div>
          </div>

          <div className="fertilizerCard">
            <h3>Application Advice</h3>
            <ul className="tips">
              <li>Apply fertilizer early morning.</li>
              <li>Do not irrigate immediately after application.</li>
              <li>Split nitrogen application into two stages.</li>
              <li>Expected yield improvement: 8-12%</li>
              <li>Next recommendation after 10 days.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* SENSOR GRAPH (real history, now with N/P/K) */}
      <div className="graphSection">
        <div className="sectionTitle">
          <h2>Sensor History</h2>
        </div>

        <div className="graphCard">
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={graphData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Line type="monotone" dataKey="moisture" stroke="#2E7D32" strokeWidth={3} name="Soil Moisture (%)" />
              <Line type="monotone" dataKey="temperature" stroke="#FF9800" strokeWidth={3} name="Soil Temperature (°C)" />
              <Line type="monotone" dataKey="nitrogen" stroke="#1976D2" strokeWidth={2} name="Nitrogen (kg/ha)" />
              <Line type="monotone" dataKey="phosphorus" stroke="#8E24AA" strokeWidth={2} name="Phosphorus (kg/ha)" />
              <Line type="monotone" dataKey="potassium" stroke="#D32F2F" strokeWidth={2} name="Potassium (kg/ha)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

export default FarmMonitoring;