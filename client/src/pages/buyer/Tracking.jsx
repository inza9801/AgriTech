import { useState, useEffect } from "react";
import { FaTruck } from "react-icons/fa";
import "./css/Tracking.css";
import { getTracking } from "../../api/buyerService";

const STAGES = ["Assigned", "Picked Up", "In Transit", "Delivered"];

const Tracking = () => {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const res = await getTracking();
        setShipments(res.data.data);
      } catch (err) {
        setError("Failed to load tracking data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <div className="trackingPage">
      <div className="pageHeader">
        <h1 className="pageTitle">Shipment Tracking</h1>
        <p className="pageSubtitle">Follow your orders from pickup to delivery.</p>
      </div>

      {error && <div className="formError">{error}</div>}

      {loading ? (
        <div className="skeleton" style={{ height: 260 }} />
      ) : shipments.length === 0 ? (
        <div className="emptyState">
          <FaTruck className="emptyIcon" />
          <p>No active shipments to track.</p>
        </div>
      ) : (
        shipments.map((shipment, index) => {
          const currentIndex = STAGES.indexOf(shipment.status);

          const timeline = [
            { title: "Assigned", time: shipment.assigned_at },
            { title: "Picked Up", time: shipment.picked_up_at },
            { title: "In Transit", time: shipment.in_transit_at },
            { title: "Delivered", time: shipment.delivered_at },
          ];

          return (
            <div className="shipmentCard" key={index}>
              <h2>{shipment.order_unique_id}</h2>

              <div className="progressSection">
                {STAGES.map((stage, i) => (
                  <div className="progressRow" key={stage}>
                    <div className={i <= currentIndex ? "progressItem active" : "progressItem"}>
                      <div className="circle">{i <= currentIndex ? "✓" : i + 1}</div>
                      <p>{stage}</p>
                    </div>
                    {i < STAGES.length - 1 && (
                      <div className={i < currentIndex ? "line active" : "line"}></div>
                    )}
                  </div>
                ))}
              </div>

              <div className="trackingCards">
                <div className="locationCard">
                  <h3>Current Location</h3>
                  <p>
                    {shipment.status === "Delivered"
                      ? shipment.drop_location
                      : shipment.pickup_location}
                  </p>
                </div>
              </div>

              <div className="driverSection">
                <h2>Logistics Information</h2>
                <table>
                  <tbody>
                    <tr>
                      <td>Driver</td>
                      <td>{shipment.driver_name}</td>
                    </tr>
                    <tr>
                      <td>Phone</td>
                      <td>{shipment.phone}</td>
                    </tr>
                    <tr>
                      <td>Vehicle</td>
                      <td>{shipment.vehicle_number}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="timelineSection">
                <h2>Shipment Timeline</h2>
                {timeline
                  .filter((t) => t.time)
                  .map((item, i) => (
                    <div className="timelineItem" key={i}>
                      <div className="timelineDot"></div>
                      <div>
                        <h4>{item.title}</h4>
                        <small>{new Date(item.time).toLocaleString()}</small>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Tracking;
