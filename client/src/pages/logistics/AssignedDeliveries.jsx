import { useState, useEffect } from "react";
import "./css/AssignedDeliveries.css";
import { FaMapMarkerAlt, FaArrowDown, FaCheckCircle } from "react-icons/fa";
import { getPendingOffers, acceptDelivery } from "../../api/deliveryService";

function AssignedDeliveries() {
  const [offers, setOffers] = useState([]);
  const [error, setError] = useState("");

  const loadOffers = async () => {
    try {
      const res = await getPendingOffers();
      setOffers(res.data.data);
    } catch (err) {
      setError("Failed to load pending offers");
      console.error(err);
    }
  };

  useEffect(() => {
    loadOffers();
  }, []);

  const handleAccept = async (orderId) => {
    try {
      await acceptDelivery(orderId);
      loadOffers();
    } catch (err) {
      setError("Failed to accept delivery");
      console.error(err);
    }
  };

  return (
    <div className="assignedContainer">
      <div className="pageHeader">
        <h1>Assigned Deliveries</h1>
        <p>Accept pending delivery offers.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="deliverySection">
        <div className="sectionTitle">
          <h2>Pending Delivery Offers</h2>
        </div>

        <div className="deliveryGrid">
          {offers.map((offer) => (
            <div className="deliveryCard" key={offer.order_id}>
              <div className="cardHeader">
                <div>
                  <h3>{offer.order_unique_id}</h3>
                </div>
              </div>

              <div className="routeContainer">
                <div className="locationCard">
                  <FaMapMarkerAlt />
                  <div>
                    <h4>From (Seller)</h4>
                    <p>{offer.farmer_name}</p>
                  </div>
                </div>

                <div className="routeArrow">
                  <FaArrowDown />
                </div>

                <div className="locationCard">
                  <FaMapMarkerAlt />
                  <div>
                    <h4>To (Buyer)</h4>
                    <p>{offer.buyer_name}</p>
                  </div>
                </div>
              </div>

              <div className="infoGrid">
                <div>
                  <span>Crop</span>
                  <h4>{offer.crop_name}</h4>
                </div>
                <div>
                  <span>Quantity</span>
                  <h4>{offer.quantity_tons} Ton</h4>
                </div>
              </div>

              <div className="buttonRow">
                <button className="acceptBtn" onClick={() => handleAccept(offer.order_id)}>
                  <FaCheckCircle />
                  Accept Delivery
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AssignedDeliveries;