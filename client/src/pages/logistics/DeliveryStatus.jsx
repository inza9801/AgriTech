import { useState, useEffect } from "react";
import "./css/DeliveryStatus.css";
import { FaMapMarkerAlt, FaArrowDown, FaClipboardCheck } from "react-icons/fa";
import { getDeliveries, updateDeliveryStatus } from "../../api/logisticsService";

const STAGES = ["Assigned", "Picked Up", "In Transit", "Delivered"];
const NEXT_STATUS = {
  Assigned: "Picked Up",
  "Picked Up": "In Transit",
  "In Transit": "Delivered",
};

function DeliveryStatus() {
  const [deliveries, setDeliveries] = useState([]);
  const [error, setError] = useState("");

  const loadDeliveries = async () => {
    try {
      const res = await getDeliveries();
      setDeliveries(res.data.data);
    } catch (err) {
      setError("Failed to load deliveries");
      console.error(err);
    }
  };

  useEffect(() => {
    loadDeliveries();
  }, []);

  const handleUpdate = async (deliveryId, currentStatus) => {
    const nextStatus = NEXT_STATUS[currentStatus];
    if (!nextStatus) return;
    try {
      await updateDeliveryStatus(deliveryId, nextStatus);
      loadDeliveries();
    } catch (err) {
      setError("Failed to update status");
      console.error(err);
    }
  };

  return (
    <div className="deliveryStatusContainer">
      <div className="pageHeader">
        <h1>Delivery Status</h1>
        <p>Update shipment progress for your active deliveries.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="statusSection">
        <div className="sectionTitle">
          <h2>
            <FaClipboardCheck />
            Shipment Progress
          </h2>
        </div>

        <div className="statusGrid">
          {deliveries.map((delivery) => {
            const currentIndex = STAGES.indexOf(delivery.status);
            const nextStatus = NEXT_STATUS[delivery.status];

            return (
              <div className="statusCard" key={delivery.delivery_id}>
                <div className="cardHeader">
                  <div>
                    <h3>{delivery.order_unique_id}</h3>
                    <p>
                      {delivery.crop_name} • {delivery.quantity_tons} Ton
                    </p>
                  </div>
                  <span className="statusBadge">{delivery.status}</span>
                </div>

                <div className="routeBox">
                  <div className="location">
                    <FaMapMarkerAlt />
                    <div>
                      <strong>Pickup</strong>
                      <p>{delivery.pickup_location}</p>
                    </div>
                  </div>

                  <div className="arrow">
                    <FaArrowDown />
                  </div>

                  <div className="location">
                    <FaMapMarkerAlt />
                    <div>
                      <strong>Drop</strong>
                      <p>{delivery.drop_location}</p>
                    </div>
                  </div>
                </div>

                <div className="timeline">
                  {STAGES.map((stage, i) => (
                    <div
                      key={stage}
                      className={
                        i < currentIndex
                          ? "timelineItem completed"
                          : i === currentIndex
                          ? "timelineItem active"
                          : "timelineItem"
                      }
                    >
                      {i < currentIndex ? "✓" : i === currentIndex ? "🚚" : "○"}
                      <span>{stage}</span>
                    </div>
                  ))}
                </div>

                {nextStatus && (
                  <button className="updateBtn" onClick={() => handleUpdate(delivery.delivery_id, delivery.status)}>
                    Mark as {nextStatus}
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default DeliveryStatus;