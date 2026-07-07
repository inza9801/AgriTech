import "./css/WarehouseInventory.css";

function WarehouseInventory() {
  const inventory = [
    {
      id: 1,
      batchId: "BATCH-1001",
      crop: "Rice",
      variety: "BRRI Dhan-28",
      quantity: "5.6 Ton",
      location: "Warehouse A",
      grade: "Grade A",
      arrival: "22 Oct 2026",
      expiry: "22 Apr 2027",
      temperature: "24°C",
      humidity: "58%",
      status: "Stored",
    },

    {
      id: 2,
      batchId: "BATCH-1002",
      crop: "Rice",
      variety: "BRRI Dhan-29",
      quantity: "4.8 Ton",
      location: "Warehouse B",
      grade: "Grade A",
      arrival: "15 Oct 2026",
      expiry: "15 Apr 2027",
      temperature: "25°C",
      humidity: "60%",
      status: "Ready for Sale",
    },

    {
      id: 3,
      batchId: "BATCH-1003",
      crop: "Rice",
      variety: "Hybrid Gold",
      quantity: "5.1 Ton",
      location: "Warehouse C",
      grade: "Grade B",
      arrival: "10 Oct 2026",
      expiry: "10 Apr 2027",
      temperature: "26°C",
      humidity: "61%",
      status: "Quality Check",
    },

    {
      id: 4,
      batchId: "BATCH-1004",
      crop: "Rice",
      variety: "BRRI Dhan-74",
      quantity: "6.2 Ton",
      location: "Warehouse D",
      grade: "Premium",
      arrival: "05 Oct 2026",
      expiry: "05 Apr 2027",
      temperature: "23°C",
      humidity: "56%",
      status: "Stored",
    },
  ];

  return (
    <div className="warehouse">
      {/* ===========================
                PAGE HEADER
            =========================== */}

      <div className="pageHeader">
        <h1>Warehouse Inventory</h1>

        <p>
          Monitor warehouse stock, manage crop batches, and track storage
          conditions before selling.
        </p>
      </div>

      {/* ===========================
                SUMMARY CARDS
            =========================== */}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Batches</h3>

          <h1>4</h1>

          <p>Available inventory batches</p>
        </div>

        <div className="summaryCard">
          <h3>Total Stock</h3>

          <h1>21.7 Ton</h1>

          <p>Current warehouse inventory</p>
        </div>

        <div className="summaryCard">
          <h3>Warehouse Usage</h3>

          <h1>68%</h1>

          <p>Storage occupancy</p>
        </div>

        <div className="summaryCard">
          <h3>Ready for Sale</h3>

          <h1>1</h1>

          <p>Available for marketplace</p>
        </div>
      </div>

      {/* ===========================
    INVENTORY TABLE
=========================== */}

      <div className="inventorySection">
        <div className="sectionTitle">
          <h2>Warehouse Inventory</h2>
        </div>

        <div className="tableContainer">
          <table className="inventoryTable">
            <thead>
              <tr>
                <th>Batch ID</th>

                <th>Crop</th>

                <th>Variety</th>

                <th>Quantity</th>

                <th>Location</th>

                <th>Grade</th>

                <th>Arrival Date</th>

                <th>Expiry Date</th>

                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.batchId}</td>

                  <td>{item.crop}</td>

                  <td>{item.variety}</td>

                  <td>{item.quantity}</td>

                  <td>{item.location}</td>

                  <td>
                    <span
                      className={
                        item.grade === "Premium"
                          ? "premiumBadge"
                          : item.grade === "Grade A"
                            ? "gradeABadge"
                            : "gradeBBadge"
                      }
                    >
                      {item.grade}
                    </span>
                  </td>

                  <td>{item.arrival}</td>

                  <td>{item.expiry}</td>

                  <td>
                    <span
                      className={
                        item.status === "Stored"
                          ? "storedBadge"
                          : item.status === "Ready for Sale"
                            ? "readyBadge"
                            : "qualityBadge"
                      }
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    BATCH TRACKING
=========================== */}

      <div className="batchSection">
        <div className="sectionTitle">
          <h2>Batch Tracking</h2>
        </div>

        <div className="batchGrid">
          {inventory.map((item) => (
            <div className="batchCard" key={item.id}>
              <div className="batchHeader">
                <h3>{item.batchId}</h3>

                <span
                  className={
                    item.status === "Stored"
                      ? "storedBadge"
                      : item.status === "Ready for Sale"
                        ? "readyBadge"
                        : "qualityBadge"
                  }
                >
                  {item.status}
                </span>
              </div>

              <div className="batchInfo">
                <p>
                  <strong>Crop :</strong>

                  {item.crop}
                </p>

                <p>
                  <strong>Variety :</strong>

                  {item.variety}
                </p>

                <p>
                  <strong>Warehouse :</strong>

                  {item.location}
                </p>

                <p>
                  <strong>Quantity :</strong>

                  {item.quantity}
                </p>
              </div>

              <div className="trackingTimeline">
                <div className="timelineItem completed">Harvested</div>

                <div className="timelineItem completed">Transported</div>

                <div className="timelineItem completed">Stored</div>

                <div
                  className={
                    item.status === "Ready for Sale"
                      ? "timelineItem completed"
                      : "timelineItem active"
                  }
                >
                  Marketplace
                </div>

                <div className="timelineItem">Sold</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===========================
    STORAGE CONDITIONS
=========================== */}

      <div className="storageSection">
        <div className="sectionTitle">
          <h2>Storage Conditions</h2>
        </div>

        <div className="storageGrid">
          <div className="storageCard">
            <h3>Warehouse Temperature</h3>

            <h1>24°C</h1>

            <p>Optimal for rice storage.</p>

            <div className="storageStatus goodStatus">Optimal</div>
          </div>

          <div className="storageCard">
            <h3>Humidity</h3>

            <h1>58%</h1>

            <p>Suitable moisture level maintained.</p>

            <div className="storageStatus goodStatus">Stable</div>
          </div>

          <div className="storageCard">
            <h3>Warehouse Occupancy</h3>

            <h1>68%</h1>

            <p>Current storage utilization.</p>

            <div className="occupancyBar">
              <div className="occupancyFill" style={{ width: "68%" }}></div>
            </div>
          </div>

          <div className="storageCard">
            <h3>Air Quality</h3>

            <h1>Good</h1>

            <p>Ventilation system operating normally.</p>

            <div className="storageStatus goodStatus">Normal</div>
          </div>

          <div className="storageCard">
            <h3>Pest Monitoring</h3>

            <h1>No Detection</h1>

            <p>AI camera found no pest activity.</p>

            <div className="storageStatus goodStatus">Safe</div>
          </div>

          <div className="storageCard aiCard">
            <h3>AI Storage Recommendation</h3>

            <ul>
              <li>Maintain temperature between 22°C–25°C.</li>

              <li>Keep humidity below 60%.</li>

              <li>Rotate Batch-1003 within 10 days.</li>

              <li>Warehouse occupancy is within safe capacity.</li>

              <li>No immediate storage risk detected.</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WarehouseInventory;
