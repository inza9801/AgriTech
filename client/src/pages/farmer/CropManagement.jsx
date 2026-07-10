import { useState, useEffect } from "react";
import "./css/CropManagement.css";
import { getCrop, updateCrop } from "../../api/farmerService";

function CropManagement() {
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");
  const [growthStage, setGrowthStage] = useState("");
  const [healthStatus, setHealthStatus] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getCrop();
        setCrop(res.data.data);
      } catch (err) {
        setError("Failed to load crop data");
        console.error(err);
      }
    })();
  }, []);

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
