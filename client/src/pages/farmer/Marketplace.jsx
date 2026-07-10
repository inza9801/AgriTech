import { useState, useEffect } from "react";
import "./css/Marketplace.css";
import {
  getListableBatches,
  createListing,
  getListingsSummary,
  getOffers,
  acceptOffer,
  rejectOffer,
} from "../../api/farmerService";

function Marketplace() {
  const [listableBatches, setListableBatches] = useState([]);
  const [summary, setSummary] = useState(null);
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    batch_id: "",
    quantity_tons: "",
    price_per_kg: "",
  });

  const loadData = async () => {
    try {
      const [batchesRes, summaryRes, offersRes] = await Promise.all([
        getListableBatches(),
        getListingsSummary(),
        getOffers(),
      ]);
      setListableBatches(batchesRes.data.data);
      setSummary(summaryRes.data.data);
      setOffers(offersRes.data.data);
    } catch (err) {
      setError("Failed to load marketplace data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createListing({
        batch_id: formData.batch_id,
        quantity_tons: parseFloat(formData.quantity_tons),
        price_per_kg: parseFloat(formData.price_per_kg),
      });
      setFormData({ batch_id: "", quantity_tons: "", price_per_kg: "" });
      await loadData();
    } catch (err) {
      setError("Failed to create listing");
      console.error(err);
    }
  };

  const handleAccept = async (id) => {
    await acceptOffer(id);
    loadData();
  };

  const handleReject = async (id) => {
    await rejectOffer(id);
    loadData();
  };

  return (
    <div className="marketplace">
      <div className="pageHeader">
        <h1>Marketplace</h1>
        <p>List warehouse batches for sale and manage buyer offers.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Listings</h3>
          <h1>{summary ? summary.totalListings : "--"}</h1>
          <p>Products currently listed</p>
        </div>

        <div className="summaryCard">
          <h3>Pending Offers</h3>
          <h1>{offers.filter((o) => o.offer_status === "Pending").length}</h1>
          <p>Awaiting response</p>
        </div>
      </div>

      {/* LISTING FORM — same shape as the warehouse batch table */}
      <div className="listingSection">
        <div className="sectionTitle">
          <h2>Create Product Listing</h2>
        </div>

        <form className="listingForm" onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="inputGroup">
              <label>Batch</label>
              <select name="batch_id" value={formData.batch_id} onChange={handleChange} required>
                <option value="">Select unsold batch</option>
                {listableBatches.map((b) => (
                  <option key={b.batch_id} value={b.batch_id}>
                    BATCH-{b.batch_id} — {b.crop_name} ({b.quantity_tons} Ton)
                  </option>
                ))}
              </select>
            </div>

            <div className="inputGroup">
              <label>Quantity to List (Ton)</label>
              <input
                type="number"
                name="quantity_tons"
                value={formData.quantity_tons}
                onChange={handleChange}
                placeholder="5"
                required
              />
            </div>

            <div className="inputGroup">
              <label>Price (৳/kg)</label>
              <input
                type="number"
                name="price_per_kg"
                value={formData.price_per_kg}
                onChange={handleChange}
                placeholder="52"
                required
              />
            </div>
          </div>

          <button className="submitButton" type="submit">
            Create Listing
          </button>
        </form>
      </div>

      {/* BUYER OFFERS */}
      <div className="offersSection">
        <div className="sectionTitle">
          <h2>Buyer Offers</h2>
        </div>

        <div className="offersGrid">
          {offers.map((offer) => (
            <div className="offerCard" key={offer.offer_id}>
              <div className="offerHeader">
                <div>
                  <h3>{offer.buyer_name}</h3>
                  <p>{offer.crop_name}</p>
                </div>
                <span
                  className={
                    offer.offer_status === "Accepted"
                      ? "acceptedBadge"
                      : offer.offer_status === "Rejected"
                      ? "rejectedBadge"
                      : "pendingBadge"
                  }
                >
                  {offer.offer_status}
                </span>
              </div>

              <div className="offerInfo">
                <p><strong>Quantity:</strong> {offer.quantity_tons} Ton</p>
                <p><strong>Offer Price:</strong> ৳{offer.offer_price_per_kg}/kg</p>
                <p><strong>Offer Date:</strong> {new Date(offer.created_at).toLocaleDateString()}</p>
              </div>

              <div className="offerButtons">
                <button
                  type="button"
                  className="acceptBtn"
                  disabled={offer.offer_status !== "Pending"}
                  onClick={() => handleAccept(offer.offer_id)}
                >
                  Accept
                </button>
                <button
                  type="button"
                  className="rejectBtn"
                  disabled={offer.offer_status !== "Pending"}
                  onClick={() => handleReject(offer.offer_id)}
                >
                  Reject
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