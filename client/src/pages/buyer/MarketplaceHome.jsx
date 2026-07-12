import { useState, useEffect } from "react";
import "./css/MarketplaceHome.css";
import { getLocations, getListings } from "../../api/buyerService";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/CartContext";

const DEFAULT_QUICK_ADD_KG = 50;

const MarketplaceHome = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addingId, setAddingId] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const { addItem } = useCart();

  const loadListings = async (location) => {
    setLoading(true);
    try {
      const res = await getListings(location);
      setListings(res.data.data);
    } catch (err) {
      setError("Failed to load listings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        const res = await getLocations();
        setLocations(res.data.data);
      } catch (err) {
        console.error(err);
      }
      loadListings("");
    })();
  }, []);

  const handleLocationChange = (e) => {
    const location = e.target.value;
    setSelectedLocation(location);
    loadListings(location);
  };

  const handleQuickAdd = async (item, e) => {
    const maxKg = Math.round(item.quantity_tons * 1000);
    const quantity_kg = Math.min(DEFAULT_QUICK_ADD_KG, maxKg);
    if (quantity_kg <= 0) return;

    setAddingId(item.listing_id);
    setError("");
    try {
      await addItem({ listing_id: item.listing_id, quantity_kg }, e.currentTarget);
      setAddedId(item.listing_id);
      setTimeout(() => setAddedId((cur) => (cur === item.listing_id ? null : cur)), 1600);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to add product to cart.");
      console.error(err);
    } finally {
      setAddingId(null);
    }
  };

  return (
    <div className="marketplace">
      <div className="pageHeader">
        <h1 className="pageTitle">Marketplace</h1>
        <p className="pageSubtitle">Browse fresh produce sourced directly from verified farmers.</p>
      </div>

      {error && <div className="formError">{error}</div>}

      <div className="filterBar">
        <select value={selectedLocation} onChange={handleLocationChange}>
          <option value="">All Locations</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="productGrid">
          {Array.from({ length: 6 }).map((_, i) => (
            <div className="skeleton" style={{ height: 260 }} key={i} />
          ))}
        </div>
      ) : listings.length === 0 ? (
        <div className="emptyState">
          <div className="emptyIcon">🔍</div>
          <p>No listings match this filter yet.</p>
        </div>
      ) : (
        <div className="productGrid">
          {listings.map((item) => (
            <div className="marketCard" key={item.listing_id}>
              <h2>{item.crop_name}</h2>
              <p>
                <strong>Farm:</strong> {item.farm_name}
              </p>
              <p>
                <strong>Farmer:</strong> {item.farmer_name}
              </p>
              <p>
                <strong>Location:</strong> {item.location}
              </p>
              <p>
                <strong>Price:</strong> ৳{item.price_per_kg}/kg
              </p>
              <p>
                <strong>Grade:</strong> {item.grade}
              </p>
              <p>
                <strong>Stock:</strong> {item.quantity_tons} Ton
              </p>

              <div className="marketCardActions">
                <Link to={`/buyer/product/${item.listing_id}`} className="viewDetailsLink">
                  View Details
                </Link>
                <button
                  className="primaryBtn quickAddBtn"
                  onClick={(e) => handleQuickAdd(item, e)}
                  disabled={addingId === item.listing_id}
                >
                  {addingId === item.listing_id && <span className="spinner" />}
                  {addedId === item.listing_id
                    ? "Added ✓"
                    : addingId === item.listing_id
                    ? "Adding..."
                    : "Add to Cart"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MarketplaceHome;
