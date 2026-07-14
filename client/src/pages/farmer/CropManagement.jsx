import { useState, useEffect } from "react";
import "./css/CropManagement.css";
import {
  getCrop,
  updateCrop,
  getLatestSensorReading,
  submitSensorReading,
  getFertilizerOptions,
} from "../../api/farmerService";

function CropManagement() {
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  // Latest live sensor reading — soil_moisture_percent/soil_temperature_celsius
  // are read from here (not editable) and carried over whenever a new N/P/K/pH
  // reading is saved below.
  const [latestReading, setLatestReading] = useState(null);
  const [soilOptions, setSoilOptions] = useState([]);
  const [sensorForm, setSensorForm] = useState({
    nitrogen_kgha: "",
    phosphorus_kgha: "",
    potassium_kgha: "",
    ph: "",
    soil_type: "",
  });
  const [sensorSubmitting, setSensorSubmitting] = useState(false);
  const [sensorMessage, setSensorMessage] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getCrop();
        setCrop(res.data.data);
        setGrowthStage(res.data.data.growth_stage);
        setHealthStatus(res.data.data.health_status);
      } catch (err) {
        setError("Failed to load crop data");
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const [latestRes, optionsRes] = await Promise.all([
          getLatestSensorReading(),
          getFertilizerOptions(),
        ]);
        setLatestReading(latestRes.data.data);
        setSoilOptions(optionsRes.data.data.soils || []);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  const health = crop?.health_status === "Healthy" ? "Healthy" : "Diseased";
  const handleUpdate = async () => {
    try {
      await updateCrop(crop.crop_id, {
        growth_stage: growthStage,
        health_status: healthStatus,
      });

      setCrop({
        ...crop,
        growth_stage: growthStage,
        health_status: healthStatus,
      });

      alert("Crop updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  const handleSensorChange = (e) => {
    setSensorForm({ ...sensorForm, [e.target.name]: e.target.value });
  };

  // Saves N/P/K/pH/soil type into the sensors table, carrying over the
  // current live soil_moisture_percent/soil_temperature_celsius reading.
  // This replaces the manual sensor entry that used to live on the Dashboard.
  const handleSensorSubmit = async (e) => {
    e.preventDefault();
    setSensorMessage("");
    setSensorSubmitting(true);
    try {
      const res = await submitSensorReading({
        soil_moisture_percent: latestReading?.soil_moisture_percent ?? 0,
        soil_temperature_celsius: latestReading?.soil_temperature_celsius ?? 0,
        nitrogen_kgha: parseFloat(sensorForm.nitrogen_kgha),
        phosphorus_kgha: parseFloat(sensorForm.phosphorus_kgha),
        potassium_kgha: parseFloat(sensorForm.potassium_kgha),
        ph: parseFloat(sensorForm.ph),
        soil_type: sensorForm.soil_type,
      });
      setLatestReading(res.data.data);
      setSensorForm({
        nitrogen_kgha: "",
        phosphorus_kgha: "",
        potassium_kgha: "",
        ph: "",
        soil_type: "",
      });
      setSensorMessage("success");
    } catch (err) {
      console.error(err);
      setSensorMessage("error");
    } finally {
      setSensorSubmitting(false);
    }
  };

  return (
    <div className="cropManagement">
      <div className="pageHeader">
        <h1>Crop Management</h1>
        <p>
          Monitor crop growth, manage cultivation, track health status and
          expected harvest.
        </p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* SUMMARY CARDS */}
      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Fields</h3>
          <h1 className="heading">1</h1>
          <p>Active cultivation area</p>
        </div>

        <div className="summaryCard">
          <h3>Crop Health</h3>
          <h1 className="heading">{crop ? health : "--"}</h1>
          <p>Current Status</p>
        </div>

        <div className="summaryCard">
          <h3>Expected Yield</h3>
          <h1 className="heading">
            {crop ? `${crop.expected_yield_tons} Ton` : "--"}
          </h1>
          <p>Estimated production</p>
        </div>
      </div>

      {/* SOIL & NUTRIENT SENSOR ENTRY (N/P/K/pH/soil type -> saved to sensors table) */}
      <div className="sensorUpdateSection">
        <div className="sectionTitle">
          <h2>Update Soil & Nutrient Sensors</h2>
        </div>
        <p className="sensorUpdateNote">
          Soil moisture ({latestReading ? `${latestReading.soil_moisture_percent}%` : "--"}) and soil
          temperature ({latestReading ? `${latestReading.soil_temperature_celsius}°C` : "--"}) are
          read automatically from the live IoT feed.
        </p>

        <form onSubmit={handleSensorSubmit} className="sensorUpdateForm">
          <input
            type="number"
            step="0.01"
            name="nitrogen_kgha"
            placeholder="Nitrogen (kg/ha)"
            value={sensorForm.nitrogen_kgha}
            onChange={handleSensorChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="phosphorus_kgha"
            placeholder="Phosphorus (kg/ha)"
            value={sensorForm.phosphorus_kgha}
            onChange={handleSensorChange}
            required
          />
          <input
            type="number"
            step="0.01"
            name="potassium_kgha"
            placeholder="Potassium (kg/ha)"
            value={sensorForm.potassium_kgha}
            onChange={handleSensorChange}
            required
          />
          <input
            type="number"
            step="0.01"
            min="0"
            max="14"
            name="ph"
            placeholder="Soil pH"
            value={sensorForm.ph}
            onChange={handleSensorChange}
            required
          />
          <select
            name="soil_type"
            value={sensorForm.soil_type}
            onChange={handleSensorChange}
            required
          >
            <option value="" disabled>
              Select Soil Type
            </option>
            {soilOptions.map((soil) => (
              <option key={soil} value={soil}>
                {soil}
              </option>
            ))}
          </select>
          <button type="submit" disabled={sensorSubmitting}>
            {sensorSubmitting ? "Saving..." : "Save Reading"}
          </button>
        </form>

        {sensorMessage === "success" && (
          <span className="updateSuccess">Sensor reading saved successfully</span>
        )}
        {sensorMessage === "error" && (
          <span className="updateError">Failed to save sensor reading</span>
        )}
      </div>

      {/* CROP TABLE */}
      <div className="cropTableSection">
        <div className="sectionTitle">
          <h2>Crop Inventory</h2>
        </div>

        <div className="tableContainer">
          <table className="cropTable">
            <thead>
              <tr>
                <th>Crop</th>
                <th>Field</th>
                <th>Area</th>
                <th>Planting Date</th>
                <th>Growth Stage</th>
                <th>Health</th>
                <th>Expected Harvest</th>
                <th>Expected Yield</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {crop && (
                <tr>
                  <td>{crop.crop_name}</td>
                  <td>Field A</td>
                  <td>2.5 Acres</td>
                  <td>{crop.planting_date.split("T")[0]}</td>
                  <td>
                    <select
                      className="cropSelect"
                      value={growthStage}
                      onChange={(e) => setGrowthStage(e.target.value)}
                    >
                      <option>Seedling</option>
                      <option>Tillering</option>
                      <option>Vegetative</option>
                      <option>Flowering</option>
                      <option>Grain Filling</option>
                      <option>Harvest Ready</option>
                    </select>
                  </td>
                  <td>
                    <select
                      className="cropSelect"
                      value={healthStatus}
                      onChange={(e) => setHealthStatus(e.target.value)}
                    >
                      <option>Healthy</option>
                      <option>Diseased</option>
                      <option>Needs Attention</option>
                    </select>
                  </td>
                  <td>{crop.expected_harvest_date.split("T")[0]}</td>
                  <td>{crop.expected_yield_tons} Ton</td>
                  <td className="actionCell">
                    <button className="saveBtn" onClick={handleUpdate}>
                      Save
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default CropManagement;
