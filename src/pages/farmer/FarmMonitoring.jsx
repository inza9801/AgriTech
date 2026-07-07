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
  FaSeedling
} from "react-icons/fa";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";

function FarmMonitoring() {

  const sensors = [
    {
      icon: <FaTint />,
      title: "Soil Moisture",
      value: "43 %",
      status: "Optimal"
    },
    {
      icon: <FaTemperatureHigh />,
      title: "Temperature",
      value: "31°C",
      status: "Normal"
    },
    {
      icon: <FaWater />,
      title: "Humidity",
      value: "73 %",
      status: "Good"
    },
    {
      icon: <FaCloudRain />,
      title: "Rain Probability",
      value: "65 %",
      status: "Tomorrow"
    }
  ];

  const graphData = [
  {
    time: "08:00",
    moisture: 48,
    temperature: 27
  },
  {
    time: "10:00",
    moisture: 46,
    temperature: 29
  },
  {
    time: "12:00",
    moisture: 44,
    temperature: 31
  },
  {
    time: "14:00",
    moisture: 43,
    temperature: 32
  },
  {
    time: "16:00",
    moisture: 42,
    temperature: 31
  },
  {
    time: "18:00",
    moisture: 45,
    temperature: 29
  },
  {
    time: "20:00",
    moisture: 47,
    temperature: 28
  }
];

  return (
    <div className="farmMonitoring">

      <div className="pageHeader">

        <h1>Farm Monitoring</h1>

        <p>
          Monitor live IoT sensor data and AI crop health analysis.
        </p>

      </div>

      {/* ===========================
          SENSOR CARDS
      ============================ */}

      <div className="sensorGrid">

        {sensors.map((sensor, index) => (

          <div
            className="sensorCard"
            key={index}
          >

            <div className="sensorIcon">

              {sensor.icon}

            </div>

            <div>

              <h4>{sensor.title}</h4>

              <h2>{sensor.value}</h2>

              <span>{sensor.status}</span>

            </div>

          </div>

        ))}

      </div>

      {/* ===========================
            DISEASE DETECTION
      ============================ */}

      <div className="diseaseSection">

        <div className="sectionTitle">

          <FaBug />

          <h2>Disease Detection (AI)</h2>

        </div>

        <div className="diseaseContainer">

          {/* Image */}

          <div className="imageCard">

            <div className="imagePlaceholder">

              <FaCamera />

              <p>Rice Leaf Image</p>

            </div>

          </div>

          {/* AI Result */}

          <div className="resultCard">

            <h3>

              <FaLeaf />

              Prediction Result

            </h3>

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

                  <td>Affected Area</td>

                  <td>12%</td>

                </tr>

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

          {/* Recommendation */}

          <div className="recommendationCard">

            <h3>Treatment Recommendation</h3>

            <ul>

              <li>
                Spray Copper Fungicide.
              </li>

              <li>
                Remove infected leaves.
              </li>

              <li>
                Avoid excessive irrigation.
              </li>

              <li>
                Monitor field for next 5 days.
              </li>

            </ul>

          </div>

        </div>

      </div>

      {/* ===========================
      FERTILIZER RECOMMENDATION
      =========================== */}

      <div className="fertilizerSection">

        <div className="sectionTitle">

          <FaSeedling />

          <h2>AI Fertilizer Recommendation</h2>

        </div>

        <div className="fertilizerContainer">

          {/* Left Card */}

          <div className="fertilizerCard">

            <h3>Current Soil Information</h3>

            <table>

              <tbody>

                <tr>
                  <td>Crop</td>
                  <td>Rice (BRRI Dhan-29)</td>
                </tr>

                <tr>
                  <td>Soil Type</td>
                  <td>Clay</td>
                </tr>

                <tr>
                  <td>Nitrogen (N)</td>
                  <td>48 kg/ha</td>
                </tr>

                <tr>
                  <td>Phosphorus (P)</td>
                  <td>21 kg/ha</td>
                </tr>

                <tr>
                  <td>Potassium (K)</td>
                  <td>34 kg/ha</td>
                </tr>

                <tr>
                  <td>pH</td>
                  <td>6.4</td>
                </tr>

                <tr>
                  <td>Moisture</td>
                  <td>43%</td>
                </tr>

              </tbody>

            </table>

          </div>

          {/* Middle Card */}

          <div className="fertilizerCard">

            <h3>Recommended Fertilizer</h3>

            <div className="recommendBox">

              <h1>Urea + DAP</h1>

              <p>
                Based on the current nutrient values,
                the AI recommends applying the following:
              </p>

              <ul>

                <li>✔ Urea : 60 kg/ha</li>

                <li>✔ DAP : 35 kg/ha</li>

                <li>✔ Potash : 20 kg/ha</li>

              </ul>

            </div>

          </div>

          {/* Right Card */}

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

      {/* ===========================
      SENSOR GRAPH
      =========================== */}

      <div className="graphSection">

        <div className="sectionTitle">

          <h2>Sensor History</h2>

        </div>

        <div className="graphCard">

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <LineChart data={graphData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis />

              <Tooltip />

              <Legend />

              <Line
                type="monotone"
                dataKey="moisture"
                stroke="#2E7D32"
                strokeWidth={3}
                name="Soil Moisture (%)"
              />

              <Line
                type="monotone"
                dataKey="temperature"
                stroke="#FF9800"
                strokeWidth={3}
                name="Temperature (°C)"
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>
  );
}

export default FarmMonitoring;