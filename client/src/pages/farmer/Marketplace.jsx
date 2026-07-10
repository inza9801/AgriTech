import { useState, useEffect } from "react";
import "./css/Marketplace.css";
import {
  getListableBatches,
  createListing,
  getListingsSummary,
  getBuyerRequests,
  confirmOrder,
  cancelOrder,
} from "../../api/farmerService";

function Marketplace() {
  const [listableBatches, setListableBatches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    batch_id: "",
    price_per_kg: "",
  });

  const loadData = async () => {
    try {
      const [batchesRes, summaryRes, requestsRes] = await Promise.all([
        getListableBatches(),
        getListingsSummary(),
        getBuyerRequests(),
      ]);

      setListableBatches(batchesRes.data.data);
      setSummary(summaryRes.data.data);
      setRequests(requestsRes.data.data);
    } catch (err) {
      setError("Failed to load marketplace data");
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
      const selectedBatch = listableBatches.find(
        (batch) => batch.batch_id === Number(formData.batch_id)
      );

      if (!selectedBatch) {
        alert("Please select a batch.");
        return;
      }

      await createListing({
        batch_id: selectedBatch.batch_id,
        quantity_tons: selectedBatch.quantity_tons,
        price_per_kg: Number(formData.price_per_kg),
      });

      setFormData({
        batch_id: "",
        price_per_kg: "",
      });

      loadData();
    } catch (err) {
      setError("Failed to create listing");
      console.error(err);
    }
  };

  const handleConfirm = async (id) => {
    try {
      await confirmOrder(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCancel = async (id) => {
    try {
      await cancelOrder(id);
      loadData();
    } catch (err) {
      console.error(err);
    }
  };

  const selectedBatch = listableBatches.find(
    (batch) => batch.batch_id === Number(formData.batch_id)
  );

  return (
    <div className="marketplace">
      <div className="pageHeader">
        <h1>Marketplace</h1>
        <p>List warehouse batches for sale and manage buyer requests.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Listings</h3>
          <h1>{summary ? summary.totalListings : "--"}</h1>
          <p>Products currently listed</p>
        </div>

        <div className="summaryCard">
          <h3>Pending Requests</h3>
          <h1>{requests.length}</h1>
          <p>Awaiting response</p>
        </div>
      </div>

      {/* CREATE LISTING */}
      <div className="listingSection">
        <div className="sectionTitle">
          <h2>Create Product Listing</h2>
        </div>

        <form className="listingForm" onSubmit={handleSubmit}>
          <div className="formGrid">

            <div className="inputGroup">
              <label>Warehouse Batch</label>

              <select
                name="batch_id"
                value={formData.batch_id}
                onChange={handleChange}
                required
              >
                <option value="">Select Batch</option>

                {listableBatches.map((batch) => (
                  <option
                    key={batch.batch_id}
                    value={batch.batch_id}
                  >
                    Batch #{batch.batch_id} - {batch.crop_name}
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <label>Batch Quantity</label>

              <input
                type="text"
                readOnly
                value={
                  selectedBatch
                    ? `${selectedBatch.quantity_tons} Ton`
                    : ""
                }
              />
            </div>

            <div className="inputGroup">
              <label>Price (৳ / kg)</label>

              <input
                type="number"
                name="price_per_kg"
                value={formData.price_per_kg}
                onChange={handleChange}
                placeholder="Enter price per kg"
                min="1"
                step="0.01"
                required
              />
            </div>
          </div>

          <button className="submitButton" type="submit">
            Create Listing
          </button>
        </form>
      </div>

      {/* BUYER REQUESTS */}
      <div className="offersSection">
        <div className="sectionTitle">
          <h2>Buyer Requests</h2>
        </div>

        <div className="offersGrid">
          {requests.length === 0 && <p>No pending requests.</p>}

          {requests.map((request) => (
            <div className="offerCard" key={request.order_id}>
              <div className="offerHeader">
                <div>
                  <h3>{request.buyer_name}</h3>
                  <p>{request.crop_name}</p>
                </div>

                <span className="pendingBadge">
                  {request.order_status}
                </span>
              </div>

              <div className="offerInfo">
                <p>
                  <strong>Quantity:</strong> {request.quantity_tons} Ton
                </p>

                <p>
                  <strong>Total Price:</strong> ৳
                  {request.total_price}
                </p>

                <p>
                  <strong>Request Date:</strong>{" "}
                  {new Date(request.created_at).toLocaleDateString()}
                </p>
              </div>

              <div className="offerButtons">
                <button
                  className="acceptBtn"
                  type="button"
                  onClick={() => handleConfirm(request.order_id)}
                >
                  Confirm
                </button>

                <button
                  className="rejectBtn"
                  type="button"
                  onClick={() => handleCancel(request.order_id)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Marketplace;