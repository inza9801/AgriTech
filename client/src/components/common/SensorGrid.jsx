import {
  FaTint,
  FaTemperatureHigh,
  FaFlask,
  FaLeaf,
  FaWater,
  FaCloudRain,
  FaLightbulb,
} from "react-icons/fa";
import "./css/SensorGrid.css";

/**
 * Shared IoT sensor readout grid.
 * Single source of truth for the sensor cards that used to be duplicated
 * (and drifting slightly out of sync) across Dashboard, FarmMonitoring and
 * Irrigation. Pulled from the FarmMonitoring version since it covered the
 * full set of fields.
 *
 * Props:
 *  - latest:  latest iot_sensor_readings row for the field (or null while loading)
 *  - weather: weather object from getWeather (or null while loading)
 *  - soilType: soil type string for the field (from crop.soil_type or field.soil_type)
 */
function SensorGrid({ latest, weather, soilType }) {
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
      icon: <FaFlask />,
      title: "Nitrogen",
      value: latest ? `${latest.nitrogen_kgha} kg/ha` : "--",
    },
    {
      icon: <FaFlask />,
      title: "Phosphorus",
      value: latest ? `${latest.phosphorus_kgha} kg/ha` : "--",
    },
    {
      icon: <FaFlask />,
      title: "Potassium",
      value: latest ? `${latest.potassium_kgha} kg/ha` : "--",
    },
    {
      icon: <FaFlask />,
      title: "Soil pH",
      value: latest ? latest.ph : "--",
    },
    {
      icon: <FaLeaf />,
      title: "Soil Type",
      value: soilType || "--",
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
    {
      icon: <FaCloudRain />,
      title: "Rainfall",
      value: weather ? `${weather.rainfall} mm` : "--",
    },
    {
      icon: <FaLightbulb />,
      title: "Light Intensity",
      value: weather ? `${weather.lightIntensity} W/m²` : "--",
    },
  ];

  return (
    <div className="sensorGrid">
      {sensors.map((sensor, index) => (
        <div className="sensorCard" key={index}>
          <div className="sensorIcon">{sensor.icon}</div>
          <div className="sensorContent">
            <h4>{sensor.title}</h4>
            <h2>{sensor.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SensorGrid;