import { useState, useEffect } from "react";
import "./css/Tracking.css";
import { getTracking } from "../../api/buyerService";

const STAGES = ["Assigned", "Picked Up", "In Transit", "Delivered"];

const Tracking = () => {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getTracking();
        setShipments(res.data.data);
      } catch (err) {
        setError("Failed to load tracking data");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="trackingPage">
      <h1>Shipment Tracking</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}

      {shipments.length === 0 && !error && <p>No active shipments to track.</p>}

      {shipments.map((shipment, index) => {
        const currentIndex = STAGES.indexOf(shipment.status);

        const timeline = [
          { title: "Assigned", time: shipment.assigned_at },
          { title: "Picked Up", time: shipment.picked_up_at },
          { title: "In Transit", time: shipment.in_transit_at },
          { title: "Delivered", time: shipment.delivered_at },
        ];

        return (
          <div className="trackCard" key={index} style={{ marginBottom: "24px" }}>
            <h2>{shipment.order_unique_id}</h2>

            <div className="progressSection">
              {STAGES.map((stage, i) => (
                <div key={stage} style={{ display: "flex", alignItems: "center" }}>
                  <div className={i <= currentIndex ? "progressItem active" : "progressItem"}>
                    <div className="circle">{i <= currentIndex ? "✓" : i + 1}</div>
                    <p>{stage}</p>
                  </div>
                  {i < STAGES.length - 1 && <div className={i < currentIndex ? "line active" : "line"}></div>}
                </div>
              ))}
            </div>

            <div className="trackingCards">
              <div className="trackCard">
                <h3>Current Location</h3>
                <p>{shipment.status === "Delivered" ? shipment.drop_location : shipment.pickup_location}</p>
              </div>
            </div>

            <div className="driverSection">
              <h2>Logistics Information</h2>
              <table>
                <tbody>
                  <tr><td>Driver</td><td>{shipment.driver_name}</td></tr>
                  <tr><td>Phone</td><td>{shipment.phone}</td></tr>
                  <tr><td>Vehicle</td><td>{shipment.vehicle_number}</td></tr>
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
      })}
    </div>
  );
};

export default Tracking;