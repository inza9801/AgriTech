import { useState, useEffect } from "react";
import "./css/CropManagement.css";
import { getCrop } from "../../api/dashboardService";

function CropManagement() {
  const [crop, setCrop] = useState(null);
  const [error, setError] = useState("");

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

  const health = crop?.health_status === "Healthy" ? "Healthy" : "Diseased";

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
          <h1 className="heading">{crop ? `${crop.expected_yield_tons} Ton` : "--"}</h1>
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
              </tr>
            </thead>
            <tbody>
              {crop && (
                <tr>
                  <td>{crop.crop_name}</td>
                  <td>Field A</td>
                  <td>2.5 Acres</td>
                  <td>{crop.planting_date}</td>
                  <td>
                    <span className="stageBadge">{crop.growth_stage}</span>
                  </td>
                  <td>
                    <span
                      className={
                        health === "Healthy" ? "healthyBadge" : "warningBadge"
                      }
                    >
                      {health}
                    </span>
                  </td>
                  <td>{crop.expected_harvest_date}</td>
                  <td>{crop.expected_yield_tons} Ton</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* GROWTH TRACKING */}
      <div className="growthSection">
        <div className="sectionTitle">
          <h2>Growth Tracking</h2>
        </div>

        <div className="growthGrid">
          {crop && (
            <div className="growthCard">
              <div className="growthHeader">
                <div>
                  <h3>{crop.crop_name}</h3>
                  <p>Field A</p>
                </div>
                <span className="growthStage">{crop.growth_stage}</span>
              </div>

              <div className="progressArea">
                <div className="progressInfo">
                  <span>Growth Progress</span>
                  <span>{crop.progress_percentage}%</span>
                </div>

                <div className="progressBar">
                  <div
                    className="progressFill"
                    style={{ width: `${crop.progress_percentage}%` }}
                  ></div>
                </div>
              </div>

              <div className="growthStats">
                <div>
                  <h4>{crop.days_after_planting}</h4>
                  <p>Days After Planting</p>
                </div>
                <div>
                  <h4>{crop.expected_yield_tons} Ton</h4>
                  <p>Expected Yield</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* HARVEST TIMELINE */}
      <div className="timelineSection">
        <div className="sectionTitle">
          <h2>Harvest Timeline</h2>
        </div>

        <div className="timelineGrid">
          {crop && (
            <div className="timelineCard">
              <div className="timelineTop">
                <h3>{crop.crop_name}</h3>
                <span className="normalTag">{crop.expected_harvest_date}</span>
              </div>

              <p>
                <strong>Field:</strong> Field A
              </p>

              <p>
                <strong>Harvest Date:</strong> {crop.expected_harvest_date}
              </p>

              <p>
                <strong>Expected Yield:</strong> {crop.expected_yield_tons} Ton
              </p>

              <div className="timelineBar">
                <div
                  className="timelineFill normalFill"
                  style={{ width: `${crop.progress_percentage}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CropManagement;