import "./css/CropManagement.css";

function CropManagement() {
  const crops = [
    {
      id: 1,
      crop: "Rice",
      variety: "BRRI Dhan-28",
      field: "Field A",
      area: "2.5 Acres",
      plantingDate: "15 Jun 2026",
      stage: "Vegetative",
      health: "Healthy",
      expectedHarvest: "20 Oct 2026",
      expectedYield: "5.6 Ton",

      progress: 55,
      days: 42,
    },

    {
      id: 2,
      crop: "Rice",
      variety: "BRRI Dhan-29",
      field: "Field B",
      area: "1.8 Acres",
      plantingDate: "05 Jun 2026",
      stage: "Tillering",
      health: "Healthy",
      expectedHarvest: "08 Oct 2026",
      expectedYield: "4.8 Ton",

      progress: 70,
      days: 55,
    },

    {
      id: 3,
      crop: "Rice",
      variety: "BRRI Dhan-74",
      field: "Field C",
      area: "3 Acres",
      plantingDate: "25 May 2026",
      stage: "Flowering",
      health: "Disease Alert",
      expectedHarvest: "25 Sep 2026",
      expectedYield: "6.2 Ton",

      progress: 88,
      days: 82,
    },

    {
      id: 4,
      crop: "Rice",
      variety: "Hybrid Gold",
      field: "Field D",
      area: "2 Acres",
      plantingDate: "10 Jun 2026",
      stage: "Vegetative",
      health: "Healthy",
      expectedHarvest: "12 Oct 2026",
      expectedYield: "5.1 Ton",

      progress: 48,
      days: 35,
    },
  ];

  return (
    <div className="cropManagement">
      {/* ===========================
                PAGE HEADER
            =========================== */}

      <div className="pageHeader">
        <h1>Crop Management</h1>

        <p>
          Monitor crop growth, manage cultivation, track health status and
          expected harvest.
        </p>
      </div>

      {/* ===========================
                SUMMARY CARDS
            =========================== */}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Fields</h3>

          <h1>4</h1>

          <p>Active cultivation areas</p>
        </div>

        <div className="summaryCard">
          <h3>Total Crops</h3>

          <h1>4</h1>

          <p>Rice varieties</p>
        </div>

        <div className="summaryCard">
          <h3>Healthy Crops</h3>

          <h1>3</h1>

          <p>75% healthy</p>
        </div>

        <div className="summaryCard">
          <h3>Expected Yield</h3>

          <h1>21.7 Ton</h1>

          <p>Estimated production</p>
        </div>
      </div>

      {/* ===========================
    CROP TABLE
=========================== */}

      <div className="cropTableSection">
        <div className="sectionTitle">
          <h2>Crop Inventory</h2>
        </div>

        <div className="tableContainer">
          <table className="cropTable">
            <thead>
              <tr>
                <th>Crop</th>

                <th>Variety</th>

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
              {crops.map((crop) => (
                <tr key={crop.id}>
                  <td>{crop.crop}</td>

                  <td>{crop.variety}</td>

                  <td>{crop.field}</td>

                  <td>{crop.area}</td>

                  <td>{crop.plantingDate}</td>

                  <td>
                    <span className="stageBadge">{crop.stage}</span>
                  </td>

                  <td>
                    <span
                      className={
                        crop.health === "Healthy"
                          ? "healthyBadge"
                          : "warningBadge"
                      }
                    >
                      {crop.health}
                    </span>
                  </td>

                  <td>{crop.expectedHarvest}</td>

                  <td>{crop.expectedYield}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    GROWTH TRACKING
=========================== */}

      <div className="growthSection">
        <div className="sectionTitle">
          <h2>Growth Tracking</h2>
        </div>

        <div className="growthGrid">
          {crops.map((crop) => (
            <div className="growthCard" key={crop.id}>
              <div className="growthHeader">
                <div>
                  <h3>{crop.variety}</h3>

                  <p>{crop.field}</p>
                </div>

                <span className="growthStage">{crop.stage}</span>
              </div>

              <div className="progressArea">
                <div className="progressInfo">
                  <span>Growth Progress</span>

                  <span>{crop.progress}%</span>
                </div>

                <div className="progressBar">
                  <div
                    className="progressFill"
                    style={{
                      width: `${crop.progress}%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="growthStats">
                <div>
                  <h4>{crop.days}</h4>

                  <p>Days After Planting</p>
                </div>

                <div>
                  <h4>{crop.expectedYield}</h4>

                  <p>Expected Yield</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===========================
    HARVEST TIMELINE
=========================== */}

      <div className="timelineSection">
        <div className="sectionTitle">
          <h2>Harvest Timeline</h2>
        </div>

        <div className="timelineGrid">
          <div className="timelineCard">
            <div className="timelineTop">
              <h3>BRRI Dhan-74</h3>

              <span className="urgentTag">12 Days Left</span>
            </div>

            <p>
              <strong>Field:</strong> Field C
            </p>

            <p>
              <strong>Harvest Date:</strong> 25 Sep 2026
            </p>

            <p>
              <strong>Expected Yield:</strong> 6.2 Ton
            </p>

            <div className="timelineBar">
              <div
                className="timelineFill urgentFill"
                style={{ width: "88%" }}
              ></div>
            </div>
          </div>

          <div className="timelineCard">
            <div className="timelineTop">
              <h3>BRRI Dhan-29</h3>

              <span className="warningTag">25 Days Left</span>
            </div>

            <p>
              <strong>Field:</strong> Field B
            </p>

            <p>
              <strong>Harvest Date:</strong> 08 Oct 2026
            </p>

            <p>
              <strong>Expected Yield:</strong> 4.8 Ton
            </p>

            <div className="timelineBar">
              <div
                className="timelineFill warningFill"
                style={{ width: "70%" }}
              ></div>
            </div>
          </div>

          <div className="timelineCard">
            <div className="timelineTop">
              <h3>BRRI Dhan-28</h3>

              <span className="normalTag">37 Days Left</span>
            </div>

            <p>
              <strong>Field:</strong> Field A
            </p>

            <p>
              <strong>Harvest Date:</strong> 20 Oct 2026
            </p>

            <p>
              <strong>Expected Yield:</strong> 5.6 Ton
            </p>

            <div className="timelineBar">
              <div
                className="timelineFill normalFill"
                style={{ width: "55%" }}
              ></div>
            </div>
          </div>

          <div className="timelineCard">
            <div className="timelineTop">
              <h3>Hybrid Gold</h3>

              <span className="normalTag">42 Days Left</span>
            </div>

            <p>
              <strong>Field:</strong> Field D
            </p>

            <p>
              <strong>Harvest Date:</strong> 12 Oct 2026
            </p>

            <p>
              <strong>Expected Yield:</strong> 5.1 Ton
            </p>

            <div className="timelineBar">
              <div
                className="timelineFill normalFill"
                style={{ width: "48%" }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CropManagement;
