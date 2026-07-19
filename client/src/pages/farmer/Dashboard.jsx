import { useState, useEffect } from "react";
import "./css/Dashboard.css";
import {
  FaLeaf,
  FaSun,
  FaCloud,
  FaCloudRain,
  FaShoppingBasket,
} from "react-icons/fa";
import {
  getDashboardSummary,
  getCrop,
  getLatestSensorReading,
  getWeather,
} from "../../api/farmerService";
import FieldSelector from "../../components/common/FieldSelector";
import SensorGrid from "../../components/common/SensorGrid";

// Picks the weather icon for the current condition (sunny / overcast / rainy)
function WeatherIcon({ condition }) {
  if (condition === "sunny")
    return <FaSun className="cardIcon weatherIcon sunny" />;
  if (condition === "rainy")
    return <FaCloudRain className="cardIcon weatherIcon rainy" />;
  return <FaCloud className="cardIcon weatherIcon overcast" />;
}

function Dashboard() {
  const [summary, setSummary] = useState(null);
  const [crop, setCrop] = useState(null);
  const [sensor, setSensor] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // Selected field (only meaningful once the farmer has more than one
  // field — FieldSelector renders nothing otherwise, and this stays null
  // so every call below falls back to the farmer-wide/default behaviour).
  const [fieldId, setFieldId] = useState(null);

  // Weather is now fetched alongside everything else here, scoped to the
  // same field_id — the server resolves the field's stored lat/lng itself,
  // so there's no browser geolocation prompt anymore.
  const loadDashboardData = async (selectedFieldId) => {
    try {
      const [summaryRes, cropRes, sensorRes, weatherRes] = await Promise.all([
        getDashboardSummary(selectedFieldId),
        getCrop(selectedFieldId),
        getLatestSensorReading(selectedFieldId),
        getWeather(selectedFieldId),
      ]);
      setSummary(summaryRes.data.data);
      setCrop(cropRes.data.data);
      setSensor(sensorRes.data.data);
      setWeather(weatherRes.data.data);
    } catch (err) {
      console.error(err);
      setError("Failed to load dashboard data");
    }
  };

  useEffect(() => {
    (async () => {
      await loadDashboardData(null);
      setLoading(false);
    })();
  }, []);

  // Refetch scoped data whenever the farmer picks a different field.
  useEffect(() => {
    if (fieldId === null) return;
    loadDashboardData(fieldId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldId]);

  if (loading) return <div className="dashboard">Loading dashboard...</div>;

  return (
    <div className="dashboard">
      <h1 className="headings">Overview Dashboard</h1>
      <p className="subtitle">Smart Agriculture Monitoring System</p>

      <FieldSelector onChange={setFieldId} />

      {error && <p className="formError">{error}</p>}

      {/* Top Cards */}
      <div className="cards">
        <div className="card">
          <WeatherIcon condition={weather?.condition} />
          <h3>Weather</h3>
          <h2 className="headings">
            {weather ? `${weather.temperature}°C` : "Loading..."}
          </h2>
          <p className={`weatherTag ${weather?.condition || ""}`}>
            {weather
              ? weather.condition.charAt(0).toUpperCase() +
                weather.condition.slice(1)
              : ""}
          </p>
        </div>
        <div className="card">
          <FaLeaf className="cardIcon" />
          <h3>Crop Health</h3>
          <h2 className="headings">{summary?.cropHealth || "N/A"}</h2>
          <p>Current Status</p>
        </div>

        <div className="card">
          <FaCloudRain className="cardIcon" />
          <h3>Rain Probability</h3>
          <h2 className="headings">
            {weather ? `${weather.rainProbability}%` : "--"}
          </h2>
          <p>Chance of rainfall</p>
        </div>

        <div className="card">
          <FaShoppingBasket className="cardIcon" />
          <h3>Marketplace</h3>
          <h2 className="headings">
            {summary ? summary.marketplaceListings : "N/A"}
          </h2>
          <p>Active Listings</p>
        </div>
      </div>

      {/* Sensor Cards — shared component, same one used on FarmMonitoring/Irrigation */}
      <div className="section">
        <h2 className="headings">Live IoT Sensor Data</h2>
        <SensorGrid
          latest={sensor}
          weather={weather}
          soilType={crop?.soil_type}
        />
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
    </div>
  );
}

export default Dashboard;
