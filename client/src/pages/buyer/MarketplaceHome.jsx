import { useState, useEffect } from "react";
import "./css/MarketplaceHome.css";
import { getLocations, getListings } from "../../api/buyerService";

import { Link } from "react-router-dom";

const MarketplaceHome = () => {
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [listings, setListings] = useState([]);
  const [error, setError] = useState("");

  const loadListings = async (location) => {
    try {
      const res = await getListings(location);
      setListings(res.data.data);
    } catch (err) {
      setError("Failed to load listings");
      console.error(err);
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

  return (
    <div className="marketplace">
      <h1>Marketplace</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

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

      <div className="productGrid">
        {listings.map((item) => (
          <div className="marketCard" key={item.listing_id}>
            <div className="imagePlaceholder">🌾</div>
            <h2>{item.crop_name}</h2>
            <p>
              <strong>Company:</strong> {item.farm_name}
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
            <Link to={`/buyer/product/${item.listing_id}`}>
              <button>View Details</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MarketplaceHome;
