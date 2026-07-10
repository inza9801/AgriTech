import { useState, useEffect } from "react";
import "./css/WarehouseInventory.css";
import {
  getUnsoldBatches,
  getWarehouseSummary,
  addBatch,
} from "../../api/farmerService";

function WarehouseInventory() {
  const [batches, setBatches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    crop_name: "",
    quantity_tons: "",
    arrival_date: "",
    expiry_date: "",
    status: "Stored",
  });

  const loadData = async () => {
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
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addBatch({
        crop_name: formData.crop_name,
        quantity_tons: Number(formData.quantity_tons),
        arrival_date: formData.arrival_date,
        expiry_date: formData.expiry_date,
        status: formData.status,
      });

      setFormData({
        crop_name: "",
        quantity_tons: "",
        arrival_date: "",
        expiry_date: "",
        status: "Stored",
      });

      loadData();
    } catch (err) {
      setError("Failed to add batch");
      console.error(err);
    }
  };

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
          <h1 className="headings">{summary ? summary.totalBatches : "--"}</h1>
          <p>Unsold inventory batches</p>
        </div>

        <div className="summaryCard">
          <h3>Total Stock</h3>
          <h1 className="headings">
            {summary ? `${summary.totalStock} Ton` : "--"}
          </h1>
          <p>Current warehouse inventory</p>
        </div>
      </div>

      {/* ADD NEW BATCH */}

      <div className="addBatchSection">
        <div className="sectionTitle">
          <h2>Add Warehouse Batch</h2>
        </div>

        <form className="batchForm" onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="inputGroup">
              <label>Crop Name</label>

              <input
                type="text"
                name="crop_name"
                value={formData.crop_name}
                onChange={handleChange}
                placeholder="Rice"
                required
              />
            </div>

            <div className="inputGroup">
              <label>Quantity (Ton)</label>

              <input
                type="number"
                name="quantity_tons"
                value={formData.quantity_tons}
                onChange={handleChange}
                step="0.01"
                placeholder="5"
                required
              />
            </div>

            <div className="inputGroup">
              <label>Arrival Date</label>

              <input
                type="date"
                name="arrival_date"
                value={formData.arrival_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <label>Expiry Date</label>

              <input
                type="date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                required
              />
            </div>

            <div className="inputGroup">
              <label>Status</label>

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Stored">Stored</option>
                <option value="Ready for Sale">Ready for Sale</option>
                <option value="Sold">Sold</option>
              </select>
            </div>
          </div>

          <button className="submitButton" type="submit">
            Add Batch
          </button>
        </form>
      </div>
      {/* INVENTORY TABLE */}

      <div className="inventorySection">
        <div className="sectionTitle">
          <h2>Unsold Batched</h2>
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
              {batches.length > 0 ? (
                batches.map((item) => (
                  <tr key={item.batch_id}>
                    <td>BATCH-{item.batch_id}</td>

                    <td>{item.crop_name}</td>

                    <td>{item.quantity_tons} Ton</td>

                    <td>
                      {item.arrival_date
                        ? item.arrival_date.split("T")[0]
                        : "--"}
                    </td>

                    <td>
                      {item.expiry_date ? item.expiry_date.split("T")[0] : "--"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ textAlign: "center" }}>
                    No warehouse batches found.
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

export default WarehouseInventory;
