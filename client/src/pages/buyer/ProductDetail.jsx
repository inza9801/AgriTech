import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./css/ProductDetail.css";
import { getListingDetail, addToCart } from "../../api/buyerService";

const ProductDetail = () => {
  const { id } = useParams();

  const [listing, setListing] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchListing = async () => {
      try {
        const res = await getListingDetail(id);
        setListing(res.data.data);
      } catch (err) {
        console.error(err);
        setError("Failed to load product details.");
      }
    };

    fetchListing();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart({
        listing_id: Number(id),
        quantity_kg: listing.quantity_tons * 1000,
      });

      setMessage("Full listing added to cart!");
      setError("");
    } catch (err) {
      console.error(err);
      setError("Failed to add product to cart.");
      setMessage("");
    }
  };

  if (!listing) {
    return (
      <div className="productDetail">
        {error || "Loading..."}
      </div>
    );
  }

  return (
    <div className="productDetail">
      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

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

          <div className="actionButtons">
            <button className="cartBtn" onClick={handleAddToCart}>
              Add Full Listing To Cart
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