import "./css/Marketplace.css";
import { useState } from "react";

function Marketplace() {
  const products = [
    {
      id: 1,
      crop: "Rice",
      variety: "BRRI Dhan-28",
      quantity: "5.6 Ton",
      grade: "Grade A",
      price: "৳52/kg",
      buyer: "Wholesale Trader",
      warehouse: "Warehouse A",
      status: "Available",
    },

    {
      id: 2,
      crop: "Rice",
      variety: "BRRI Dhan-29",
      quantity: "4.8 Ton",
      grade: "Premium",
      price: "৳58/kg",
      buyer: "Wholesale Trader",
      warehouse: "Warehouse B",
      status: "Available",
    },

    {
      id: 3,
      crop: "Rice",
      variety: "Hybrid Gold",
      quantity: "5.1 Ton",
      grade: "Grade B",
      price: "৳48/kg",
      buyer: "Wholesale Trader",
      warehouse: "Warehouse C",
      status: "Auction",
    },

    {
      id: 4,
      crop: "Rice",
      variety: "BRRI Dhan-74",
      quantity: "6.2 Ton",
      grade: "Premium",
      price: "৳60/kg",
      buyer: "Wholesale Trader",
      warehouse: "Warehouse D",
      status: "Available",
    },
  ];
  const [offers, setOffers] = useState([
    {
      id: 1,
      buyer: "Dhaka Agro Traders",
      product: "BRRI Dhan-28",
      quantity: "2 Ton",
      offerPrice: "৳53/kg",
      date: "10 Jul 2026",
      status: "Pending",
    },

    {
      id: 2,
      buyer: "Green Valley Wholesale",
      product: "BRRI Dhan-29",
      quantity: "3 Ton",
      offerPrice: "৳57/kg",
      date: "11 Jul 2026",
      status: "Pending",
    },

    {
      id: 3,
      buyer: "Fresh Crop Traders",
      product: "Hybrid Gold",
      quantity: "1.5 Ton",
      offerPrice: "৳49/kg",
      date: "12 Jul 2026",
      status: "Accepted",
    },

    {
      id: 4,
      buyer: "National Rice Supply",
      product: "BRRI Dhan-74",
      quantity: "4 Ton",
      offerPrice: "৳59/kg",
      date: "12 Jul 2026",
      status: "Rejected",
    },
  ]);
  const [saleType, setSaleType] = useState("Fixed Price");

  const [formData, setFormData] = useState({
    crop: "",

    variety: "",

    quantity: "",

    grade: "Grade A",

    buyerType: "Wholesale Trader",

    price: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };
  const acceptOffer = (id) => {
    setOffers(
      offers.map((offer) =>
        offer.id === id ? { ...offer, status: "Accepted" } : offer,
      ),
    );
  };

  const rejectOffer = (id) => {
    setOffers(
      offers.map((offer) =>
        offer.id === id ? { ...offer, status: "Rejected" } : offer,
      ),
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    alert("Product Listing Created!");
  };

  return (
    <div className="marketplace">
      {/* ===========================
                PAGE HEADER
            =========================== */}

      <div className="pageHeader">
        <h1>Marketplace</h1>

        <p>
          Create product listings, receive offers from wholesale traders, and
          manage crop sales.
        </p>
      </div>

      {/* ===========================
                SUMMARY CARDS
            =========================== */}

      <div className="summaryGrid">
        <div className="summaryCard">
          <h3>Total Listings</h3>

          <h1>{products.length}</h1>

          <p>Products currently listed</p>
        </div>

        <div className="summaryCard">
          <h3>Available Stock</h3>

          <h1>21.7 Ton</h1>

          <p>Ready for selling</p>
        </div>

        <div className="summaryCard">
          <h3>Pending Offers</h3>

          <h1>{offers.filter((offer) => offer.status === "Pending").length}</h1>

          <p>Awaiting response</p>
        </div>

        <div className="summaryCard">
          <h3>Estimated Revenue</h3>

          <h1>৳11.9L</h1>

          <p>Expected marketplace income</p>
        </div>
      </div>

      {/* ===========================
    PRODUCT LISTING FORM
=========================== */}

      <div className="listingSection">
        <div className="sectionTitle">
          <h2>Create Product Listing</h2>
        </div>

        <form className="listingForm" onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="inputGroup">
              <label>Crop Name</label>

              <input
                type="text"
                name="crop"
                value={formData.crop}
                onChange={handleChange}
                placeholder="Rice"
              />
            </div>

            <div className="inputGroup">
              <label>Variety</label>

              <input
                type="text"
                name="variety"
                value={formData.variety}
                onChange={handleChange}
                placeholder="BRRI Dhan-28"
              />
            </div>

            <div className="inputGroup">
              <label>Quantity</label>

              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="5 Ton"
              />
            </div>

            <div className="inputGroup">
              <label>Quality Grade</label>

              <select
                name="grade"
                value={formData.grade}
                onChange={handleChange}
              >
                <option>Premium</option>

                <option>Grade A</option>

                <option>Grade B</option>
              </select>
            </div>

            <div className="inputGroup">
              <label>Buyer Type</label>

              <select
                name="buyerType"
                value={formData.buyerType}
                onChange={handleChange}
              >
                <option>Wholesale Trader</option>

                <option>Retail Shop</option>

                <option>Food Processing Company</option>
              </select>
            </div>

            <div className="inputGroup">
              <label>Price (৳/kg)</label>

              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="52"
              />
            </div>
          </div>

          <div className="toggleSection">
            <label>Sale Type</label>

            <div className="toggleButtons">
              <button
                type="button"
                className={
                  saleType === "Fixed Price" ? "activeButton" : "inactiveButton"
                }
                onClick={() => setSaleType("Fixed Price")}
              >
                Fixed Price
              </button>

              <button
                type="button"
                className={
                  saleType === "Auction" ? "activeButton" : "inactiveButton"
                }
                onClick={() => setSaleType("Auction")}
              >
                Auction
              </button>
            </div>
          </div>

          <button className="submitButton" type="submit">
            Create Listing
          </button>
        </form>
      </div>

      {/* ===========================
    MARKETPLACE PRODUCTS
=========================== */}

      <div className="productsSection">
        <div className="sectionTitle">
          <h2>Available Products</h2>
        </div>

        <div className="productsGrid">
          {products.map((product) => (
            <div className="productCard" key={product.id}>
              <div className="productImage">🌾</div>

              <div className="productBody">
                <h3>{product.variety}</h3>

                <p>
                  <strong>Crop :</strong> {product.crop}
                </p>

                <p>
                  <strong>Warehouse :</strong> {product.warehouse}
                </p>

                <p>
                  <strong>Stock :</strong> {product.quantity}
                </p>

                <p>
                  <strong>Buyer Type :</strong> {product.buyer}
                </p>

                <div className="productFooter">
                  <span
                    className={
                      product.grade === "Premium"
                        ? "premiumBadge"
                        : product.grade === "Grade A"
                          ? "gradeABadge"
                          : "gradeBBadge"
                    }
                  >
                    {product.grade}
                  </span>

                  <span className="priceTag">{product.price}</span>
                </div>

                <div className="statusRow">
                  <span
                    className={
                      product.status === "Auction"
                        ? "auctionBadge"
                        : "availableBadge"
                    }
                  >
                    {product.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===========================
    BUYER OFFERS
=========================== */}

      <div className="offersSection">
        <div className="sectionTitle">
          <h2>Buyer Offers</h2>
        </div>

        <div className="offersGrid">
          {offers.map((offer) => (
            <div className="offerCard" key={offer.id}>
              <div className="offerHeader">
                <div>
                  <h3>{offer.buyer}</h3>

                  <p>{offer.product}</p>
                </div>

                <span
                  className={
                    offer.status === "Accepted"
                      ? "acceptedBadge"
                      : offer.status === "Rejected"
                        ? "rejectedBadge"
                        : "pendingBadge"
                  }
                >
                  {offer.status}
                </span>
              </div>

              <div className="offerInfo">
                <p>
                  <strong>Quantity:</strong>

                  {offer.quantity}
                </p>

                <p>
                  <strong>Offer Price:</strong>

                  {offer.offerPrice}
                </p>

                <p>
                  <strong>Offer Date:</strong>

                  {offer.date}
                </p>
              </div>

              <div className="offerButtons">
                <button
                  type="button"
                  className="acceptBtn"
                  disabled={offer.status !== "Pending"}
                  onClick={() => acceptOffer(offer.id)}
                >
                  Accept
                </button>

                <button
                  type="button"
                  className="rejectBtn"
                  disabled={offer.status !== "Pending"}
                  onClick={() => rejectOffer(offer.id)}
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
