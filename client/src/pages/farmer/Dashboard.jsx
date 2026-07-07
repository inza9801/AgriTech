import { useState, useEffect } from "react";
import "./css/Dashboard.css";
import {
  FaLeaf,
  FaCloudSun,
  FaTint,
  FaShoppingBasket,
  FaSeedling,
  FaBug,
} from "react-icons/fa";
import {
  getDashboardSummary,
  getCrop,
  getLatestSensorReading,
  submitSensorReading,
  getWeather,
  // getlistableBatches,
} from "../../api/dashboardService";

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [crop, setCrop] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // const [totalRows, setTotalRows] = useState(0);

  const [form, setForm] = useState({
    soil_moisture_percent: "",
    soil_temperature_celsius: "",
    nitrogen_kgha: "",
    phosphorus_kgha: "",
    potassium_kgha: "",
  });

  // Hardcoded for now — will be replaced by ML model later
  const diseasePrediction = {
    disease: "Brown Spot",
    confidence: "97.42%",
    severity: "Medium",
    treatment: "Copper Fungicide",
  };

  const fertilizerRecommendation = {
    crop: "Rice",
    nitrogen: 48,
    phosphorus: 21,
    potassium: 34,
    recommendation: "Urea + DAP",
  };

  const alerts = [
    "Brown Spot disease risk detected in Field A.",
    "Irrigation recommended after 2 hours.",
    "Heavy rainfall expected tomorrow.",
    "Apply Urea within 3 days.",
  ];

  const loadDashboardData = async () => {
    try {
      const [summaryRes, cropRes, sensorRes] = await Promise.all([
        getDashboardSummary(),
        getCrop(),
        getLatestSensorReading(),
      ]);
      setSummary(summaryRes.data.data);
      setCrop(cropRes.data.data);
      setSensor(sensorRes.data.data);
    } catch (err) {
      setError("Failed to load dashboard data");
    }
  };

  const loadWeather = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          const res = await getWeather(latitude, longitude);
          setWeather(res.data.data);
        } catch (err) {
          setError("Failed to load weather data");
        }
      },
      () => setError("Location permission denied — weather unavailable"),
    );
  };

  useEffect(() => {
    (async () => {
      await loadDashboardData();
      loadWeather();
      setLoading(false);
    })();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await submitSensorReading({
        soil_moisture_percent: parseFloat(form.soil_moisture_percent),
        soil_temperature_celsius: parseFloat(form.soil_temperature_celsius),
        nitrogen_kgha: parseFloat(form.nitrogen_kgha),
        phosphorus_kgha: parseFloat(form.phosphorus_kgha),
        potassium_kgha: parseFloat(form.potassium_kgha),
      });
      setForm({
        soil_moisture_percent: "",
        soil_temperature_celsius: "",
        nitrogen_kgha: "",
        phosphorus_kgha: "",
        potassium_kgha: "",
      });
      await loadDashboardData();
    } catch (err) {
      setError("Failed to submit sensor reading");
    }
  };

  // useEffect(() => {
  //   const loadBatches = async () => {
  //     try {
  //       const response = await getlistableBatches();
  //       setTotalRows(response.data.data.length);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   loadBatches();
  // }, []);

  if (loading) return <div className="dashboard">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1 className="headings">Overview Dashboard</h1>
      <p className="subtitle">Smart Agriculture Monitoring System</p>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Top Cards */}
      <div className="cards">
        <div className="card">
          <FaLeaf className="cardIcon" />
          <h3>Crop Health</h3>
          <h2 className="headings">{summary?.cropHealth || "N/A"}</h2>
          <p>Current Status</p>
        </div>

        <div className="card">
          <FaCloudSun className="cardIcon" />
          <h3>Weather</h3>
          <h2 className="headings">
            {weather ? `${weather.temperature}°C` : "Loading..."}
          </h2>
          <p>
            {weather
              ? `Humidity: ${weather.humidity}% · Rain chance: ${weather.rainProbability}%`
              : ""}
          </p>
        </div>

        <div className="card">
          <FaTint className="cardIcon" />
          <h3>Irrigation</h3>
          <h2 className="headings">{summary?.irrigationStatus || "N/A"}</h2>
        </div>

        <div className="card">
          <FaShoppingBasket className="cardIcon" />
          <h3>Marketplace</h3>
          <h2 className="headings">{summary?.marketplaceListings || "N/A"}</h2>
          <p>Active Listings</p>
        </div>
      </div>

      {/* Sensor Input Form */}
      <div className="section">
        <h2 className="headings">Enter Live IoT Sensor Data</h2>
        <form onSubmit={handleSubmit} className="sensorForm">
          <input
            type="number"
            name="soil_moisture_percent"
            placeholder="Soil Moisture (%)"
            value={form.soil_moisture_percent}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="soil_temperature_celsius"
            placeholder="Soil Temperature (°C)"
            value={form.soil_temperature_celsius}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="nitrogen_kgha"
            placeholder="Nitrogen (kg/ha)"
            value={form.nitrogen_kgha}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="phosphorus_kgha"
            placeholder="Phosphorus (kg/ha)"
            value={form.phosphorus_kgha}
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="potassium_kgha"
            placeholder="Potassium (kg/ha)"
            value={form.potassium_kgha}
            onChange={handleChange}
            required
          />
          <button type="submit">Submit Reading</button>
        </form>
      </div>

      {/* Sensor Cards (real data) */}
      <div className="section">
        <h2 className="headings">Live IoT Sensor Data</h2>
        <div className="sensorGrid">
          <div className="sensorCard">
            <h3>Soil Moisture</h3>
            <h1>{sensor ? `${sensor.soil_moisture_percent} %` : "--"}</h1>
          </div>
          <div className="sensorCard">
            <h3>Soil Temperature</h3>
            <h1>{sensor ? `${sensor.soil_temperature_celsius} °C` : "--"}</h1>
          </div>
          <div className="sensorCard">
            <h3>Nitrogen</h3>
            <h1>{sensor ? `${sensor.nitrogen_kgha} kg/ha` : "--"}</h1>
          </div>
          <div className="sensorCard">
            <h3>Phosphorus</h3>
            <h1>{sensor ? `${sensor.phosphorus_kgha} kg/ha` : "--"}</h1>
          </div>
          <div className="sensorCard">
            <h3>Potassium</h3>
            <h1>{sensor ? `${sensor.potassium_kgha} kg/ha` : "--"}</h1>
          </div>
        </div>
      </div>

      {/* AI Prediction (hardcoded for now) */}
      <div className="twoColumn">
        <div className="prediction">
          <h2>
            <FaBug /> AI Disease Prediction
          </h2>
          <table>
            <tbody>
              <tr>
                <td>Disease</td>
                <td>{diseasePrediction.disease}</td>
              </tr>
              <tr>
                <td>Confidence</td>
                <td>{diseasePrediction.confidence}</td>
              </tr>
              <tr>
                <td>Severity</td>
                <td>{diseasePrediction.severity}</td>
              </tr>
              <tr>
                <td>Treatment</td>
                <td>{diseasePrediction.treatment}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="prediction">
          <h2>
            <FaSeedling /> Fertilizer Recommendation
          </h2>
          <table>
            <tbody>
              <tr>
                <td>Crop</td>
                <td>{fertilizerRecommendation.crop}</td>
              </tr>
              <tr>
                <td>Nitrogen</td>
                <td>{fertilizerRecommendation.nitrogen}</td>
              </tr>
              <tr>
                <td>Phosphorus</td>
                <td>{fertilizerRecommendation.phosphorus}</td>
              </tr>
              <tr>
                <td>Potassium</td>
                <td>{fertilizerRecommendation.potassium}</td>
              </tr>
              <tr>
                <td>Recommendation</td>
                <td>{fertilizerRecommendation.recommendation}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Crop Table — single crop (Rice) */}
      <div className="section">
        <h2 className="headings">Crop Management Summary</h2>
        <table className="cropTable">
          <thead>
            <tr>
              <th>Crop</th>
              <th>Growth Stage</th>
              <th>Health</th>
              <th>Expected Harvest</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{crop?.crop_name || "Rice"}</td>
              <td>{crop?.growth_stage || "--"}</td>
              <td>{crop?.health_status || "--"}</td>
              <td>{crop?.expected_harvest_date || "--"}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Alerts (hardcoded for now) */}
      <div className="section">
        <h2 className="headings">AI Alerts</h2>
        <div className="alertBox">
          {alerts.map((alert, index) => (
            <div className="alertItem" key={index}>
              ⚠ {alert}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
