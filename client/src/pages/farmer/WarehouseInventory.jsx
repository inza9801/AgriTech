import { useState, useEffect } from "react";
import "./css/WarehouseInventory.css";
import { getUnsoldBatches, getWarehouseSummary } from "../../api/farmerService";

function WarehouseInventory() {
  const [batches, setBatches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [batchesRes, summaryRes] = await Promise.all([
          getUnsoldBatches(),
          getWarehouseSummary(),
        ]);
        setBatches(batchesRes.data.data);
        setSummary(summaryRes.data.data);
      } catch (err) {
        setError("Failed to load warehouse data");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="warehouse">
      <div className="pageHeader">
        <h1>Warehouse Inventory</h1>
        <p>Monitor unsold crop batches stored in your warehouse.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Batches</h3>
          <h1>{summary ? summary.totalBatches : "--"}</h1>
          <p>Unsold inventory batches</p>
        </div>

        <div className="summaryCard">
          <h3>Total Stock</h3>
          <h1>{summary ? `${summary.totalStock} Ton` : "--"}</h1>
          <p>Current warehouse inventory</p>
        </div>
      </div>

      <div className="inventorySection">
        <div className="sectionTitle">
          <h2>Unsold Batches</h2>
        </div>

        <div className="tableContainer">
          <table className="inventoryTable">
            <thead>
              <tr>
                <th>Batch ID</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Arrival Date</th>
                <th>Expiry Date</th>
              </tr>
            </thead>
            <tbody>
              {batches.map((item) => (
                <tr key={item.batch_id}>
                  <td>BATCH-{item.batch_id}</td>
                  <td>{item.crop_name}</td>
                  <td>{item.quantity_tons} Ton</td>
                  <td>{item.arrival_date}</td>
                  <td>{item.expiry_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default WarehouseInventory;