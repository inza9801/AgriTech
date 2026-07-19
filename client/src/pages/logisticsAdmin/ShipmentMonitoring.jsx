import { useState, useEffect } from "react";
import "./css/ShipmentMonitoring.css";
import { getShipments } from "../../api/adminService";

const STAGES = ["Assigned", "Picked Up", "In Transit", "Delivered"];

function ShipmentMonitoring() {
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getShipments();
        setShipments(res.data.data);
      } catch (err) {
        setError("Failed to load shipments");
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="shipmentMonitoring">
      <div className="pageHeader">
        <h1>Shipment Monitoring</h1>
        <p>Track all drivers' shipments.</p>
      </div>

      {error && <p className="formError">{error}</p>}

      <div className="shipmentSection">
        <h2>Shipments</h2>

        <div className="shipmentGrid">
          {shipments.map((s) => {
            const currentIndex = STAGES.indexOf(s.status);
            return (
              <div className="timelineCard" key={s.delivery_id}>
                <h3>{s.order_unique_id} — {s.driver_name}</h3>
                <p><strong>Product:</strong> {s.crop_name} ({s.quantity_tons} Ton)</p>
                <p><strong>Vehicle:</strong> {s.vehicle_number}</p>
                <p><strong>Route:</strong> {s.pickup_location} → {s.drop_location}</p>

                <div className="shipmentTimeline">
                  {STAGES.map((stage, i) => (
                    <div
                      key={stage}
                      className={
                        i < currentIndex ? "timelineItem completedStep" : i === currentIndex ? "timelineItem activeStep" : "timelineItem"
                      }
                    >
                      {stage}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ShipmentMonitoring;