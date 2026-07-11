import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/ProductDetail.css";
import { getListingDetail, addToCart } from "../../api/buyerService";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [quantityKg, setQuantityKg] = useState("");
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await getListingDetail(id);
        setListing(res.data.data);
        setQuantityKg(String(Math.round(res.data.data.quantity_tons * 1000)));
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchListing();
  }, [id]);

  const maxKg = listing ? Math.round(listing.quantity_tons * 1000) : 0;
  const qtyNum = Number(quantityKg);
  const isQtyValid = qtyNum > 0 && qtyNum <= maxKg;

  const handleAddToCart = async () => {
    if (!isQtyValid) {
      setError(`Enter a quantity between 1 and ${maxKg} kg.`);
      return;
    }

    setAdding(true);
    setError("");
    setMessage("");
    try {
      await addToCart({
        listing_id: Number(id),
        quantity_kg: qtyNum,
      });
      setMessage("Added to cart!");
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Failed to add product to cart."
      );
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return <div className="productDetail">Loading...</div>;
  }

  if (!listing) {
    return <div className="productDetail">{error || "Product not found."}</div>;
  }

  return (
    <div className="productDetail">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && (
        <p style={{ color: "green" }}>
          {message}{" "}
          <button className="cartBtn" onClick={() => navigate("/buyer/cart")}>
            Go to Cart
          </button>
        </p>
      )}

      <div className="productContainer">
        <div className="productImages">
          <div className="mainImage">🌾</div>
        </div>

        <div className="productInfo">
          <h1>{listing.crop_name}</h1>
          <h2>৳{listing.price_per_kg} / kg</h2>

          <table>
            <tbody>
              <tr>
                <td>Available Quantity</td>
                <td>{listing.quantity_tons} Ton</td>
              </tr>
              <tr>
                <td>Grade</td>
                <td>{listing.grade}</td>
              </tr>
              <tr>
                <td>Sale Type</td>
                <td>{listing.sale_type}</td>
              </tr>
              <tr>
                <td>Arrival Date</td>
                <td>{listing.arrival_date}</td>
              </tr>
              <tr>
                <td>Expiry Date</td>
                <td>{listing.expiry_date}</td>
              </tr>
              <tr>
                <td>Location</td>
                <td>{listing.location}</td>
              </tr>
            </tbody>
          </table>

          <div className="quantityInput">
            <label>Quantity (kg)</label>
            <input
              type="number"
              min="1"
              max={maxKg}
              value={quantityKg}
              onChange={(e) => setQuantityKg(e.target.value)}
            />
            <small>Max available: {maxKg} kg</small>
          </div>

          <div className="actionButtons">
            <button
              className="cartBtn"
              onClick={handleAddToCart}
              disabled={adding || !isQtyValid}
            >
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="farmerCard">
        <h2>Farmer Profile</h2>

        <table>
          <tbody>
            <tr>
              <td>Farm Name</td>
              <td>{listing.farm_name}</td>
            </tr>
            <tr>
              <td>Farmer</td>
              <td>{listing.farmer_name}</td>
            </tr>
            <tr>
              <td>Location</td>
              <td>{listing.location}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductDetail;