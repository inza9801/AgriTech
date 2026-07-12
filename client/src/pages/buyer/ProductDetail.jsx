import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./css/ProductDetail.css";
import { getListingDetail } from "../../api/buyerService";
import { useCart } from "../../contexts/CartContext";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [added, setAdded] = useState(false);
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

  const handleAddToCart = async (e) => {
    if (!isQtyValid) {
      setError(`Enter a quantity between 1 and ${maxKg} kg.`);
      return;
    }

    setAdding(true);
    setError("");
    setAdded(false);
    try {
      await addItem({ listing_id: Number(id), quantity_kg: qtyNum }, e.currentTarget);
      setAdded(true);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Failed to add product to cart.");
    } finally {
      setAdding(false);
    }
  };

  if (loading) {
    return (
      <div className="productDetail">
        <div className="skeleton" style={{ height: 32, width: 240, marginBottom: 20 }} />
        <div className="skeleton" style={{ height: 320, borderRadius: 16 }} />
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="productDetail">
        <div className="emptyState">
          <div className="emptyIcon">⚠</div>
          <p>{error || "Product not found."}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="productDetail">
      {error && <div className="formError">{error}</div>}
      {added && (
        <div className="formSuccess">
          Added to cart.
          <button className="linkBtn" onClick={() => navigate("/buyer/orders")}>
            Go to cart →
          </button>
        </div>
      )}

      <div className="productContainer">
        <div className="productInfo">
          <h1>{listing.crop_name}</h1>
          <h2 className="priceTag">৳{listing.price_per_kg} / kg</h2>

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
            <label htmlFor="qtyInput">Quantity (kg)</label>
            <input
              id="qtyInput"
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
              className="primaryBtn cartBtn"
              onClick={handleAddToCart}
              disabled={adding || !isQtyValid}
            >
              {adding && <span className="spinner" />}
              {adding ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>

      <div className="farmerCard commonCard">
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
