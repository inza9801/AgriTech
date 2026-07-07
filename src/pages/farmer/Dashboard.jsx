import "./css/Dashboard.css";

import {
  FaLeaf,
  FaCloudSun,
  FaTint,
  FaWarehouse,
  FaShoppingBasket,
  FaSeedling,
  FaBug,
  FaArrowUp
} from "react-icons/fa";

function Dashboard() {
  const sensorData = [
    {
      title: "Soil Moisture",
      value: "43 %",
      status: "Optimal"
    },
    {
      title: "Temperature",
      value: "31 °C",
      status: "Normal"
    },
    {
      title: "Humidity",
      value: "73 %",
      status: "Good"
    },
    {
      title: "Water Tank",
      value: "68 %",
      status: "Available"
    }
  ];

  const crops = [
    {
      crop: "BRRI Dhan-29",
      stage: "Flowering",
      health: "Healthy",
      harvest: "18 Sep 2026"
    },
    {
      crop: "BRRI Dhan-81",
      stage: "Tillering",
      health: "Healthy",
      harvest: "06 Oct 2026"
    },
    {
      crop: "BRRI Dhan-92",
      stage: "Ripening",
      health: "Disease Risk",
      harvest: "28 Aug 2026"
    }
  ];

  const alerts = [
    "Brown Spot disease risk detected in Field B.",
    "Irrigation recommended after 2 hours.",
    "Heavy rainfall expected tomorrow.",
    "Apply Urea within 3 days."
  ];

  return (
    <div className="dashboard">

      <h1>Overview Dashboard</h1>

      <p className="subtitle">
        Smart Agriculture Monitoring System
      </p>

      {/* Top Cards */}

      <div className="cards">

        <div className="card">
          <FaLeaf className="cardIcon" />
          <h3>Crop Health</h3>
          <h2>98%</h2>
          <p>Healthy Crops</p>
        </div>

        <div className="card">
          <FaArrowUp className="cardIcon" />
          <h3>Yield Prediction</h3>
          <h2>6.4 Tons</h2>
          <p>Estimated Harvest</p>
        </div>

        <div className="card">
          <FaCloudSun className="cardIcon" />
          <h3>Weather</h3>
          <h2>31°C</h2>
          <p>Sunny</p>
        </div>

        <div className="card">
          <FaTint className="cardIcon" />
          <h3>Irrigation</h3>
          <h2>Automatic</h2>
          <p>Pump OFF</p>
        </div>

        <div className="card">
          <FaWarehouse className="cardIcon" />
          <h3>Warehouse</h3>
          <h2>5400 kg</h2>
          <p>Rice Available</p>
        </div>

        <div className="card">
          <FaShoppingBasket className="cardIcon" />
          <h3>Marketplace</h3>
          <h2>8</h2>
          <p>Active Listings</p>
        </div>

      </div>

      {/* Sensor Cards */}

      <div className="section">

        <h2>Live IoT Sensor Data</h2>

        <div className="sensorGrid">

          {sensorData.map((sensor, index) => (

            <div className="sensorCard" key={index}>

              <h3>{sensor.title}</h3>

              <h1>{sensor.value}</h1>

              <p>{sensor.status}</p>

            </div>

          ))}

        </div>

      </div>

      {/* AI Prediction */}

      <div className="twoColumn">

        <div className="prediction">

          <h2>
            <FaBug /> AI Disease Prediction
          </h2>

          <table>

            <tbody>

              <tr>
                <td>Disease</td>
                <td>Brown Spot</td>
              </tr>

              <tr>
                <td>Confidence</td>
                <td>97.42%</td>
              </tr>

              <tr>
                <td>Severity</td>
                <td>Medium</td>
              </tr>

              <tr>
                <td>Treatment</td>
                <td>Copper Fungicide</td>
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
                <td>Rice</td>
              </tr>

              <tr>
                <td>Nitrogen</td>
                <td>48</td>
              </tr>

              <tr>
                <td>Phosphorus</td>
                <td>21</td>
              </tr>

              <tr>
                <td>Potassium</td>
                <td>34</td>
              </tr>

              <tr>
                <td>Recommendation</td>
                <td>Urea + DAP</td>
              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* Crop Table */}

      <div className="section">

        <h2>Crop Management Summary</h2>

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

            {crops.map((crop, index) => (

              <tr key={index}>

                <td>{crop.crop}</td>

                <td>{crop.stage}</td>

                <td>{crop.health}</td>

                <td>{crop.harvest}</td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Alerts */}

      <div className="section">

        <h2>AI Alerts</h2>

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