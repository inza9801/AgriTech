import { useState, useEffect } from "react";
import "./css/Irrigation.css";
import {
  FaTint,
  FaTemperatureHigh,
  FaWater,
  FaCloudRain,
  FaSeedling,
} from "react-icons/fa";
import {
  getLatestSensorReading,
  getWeather,
} from "../../api/farmerService";

function Irrigation() {
  const [latest, setLatest] = useState(null);
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getLatestSensorReading();
        setLatest(res.data.data);
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

  const sensorData = [
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
      title: "Air Humidity",
      value: weather ? `${weather.humidity} %` : "--",
    },
    {
      icon: <FaCloudRain />,
      title: "Rain Probability",
      value: weather ? `${weather.rainProbability} %` : "--",
    },
  ];

  // Hardcoded for now — will be replaced by ML model later
  const irrigationNeeded = true;

  return (
    <div className="irrigation">
      <div className="pageHeader">
        <h1>Irrigation Control</h1>
        <p>Monitor live IoT sensor data and irrigation recommendation.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* LIVE SENSOR DATA */}
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
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI RECOMMENDATION (hardcoded for now) */}
      <div className="recommendationSection">
        <div className="sectionTitle">
          <h2>AI Irrigation Recommendation</h2>
        </div>

        <div className="recommendationCard">
          <FaSeedling className="sensorIcon" />
          <h1 className="recommendText">
            {irrigationNeeded ? "Irrigation Required" : "Irrigation Not Required"}
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Irrigation;