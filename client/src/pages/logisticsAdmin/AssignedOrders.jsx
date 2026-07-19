import { useState, useEffect } from "react";
import "./css/AssignedOrders.css";
import { getAssignedOrdersToday, getAssignedOrderDetail } from "../../api/adminService";

function AssignedOrders() {
  const [orders, setOrders] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getAssignedOrdersToday();
        setOrders(res.data.data);
      } catch (err) {
        setError("Failed to load assigned orders");
        console.error(err);
      }
    })();
  }, []);

  const handleView = async (delivery_id) => {
    try {
      const res = await getAssignedOrderDetail(delivery_id);
      setSelectedDetail(res.data.data);
    } catch (err) {
      setError("Failed to load order details");
      console.error(err);
    }
  };

  const getStatusClass = (status) => {
    if (status === "Delivered") return "deliveredStatus";
    if (status === "In Transit") return "transitStatus";
    if (status === "Picked Up") return "pickupStatus";
    return "pickupStatus";
  };

  return (
    <div className="assignedOrders">
      <div className="pageHeader">
        <h1>Assigned Orders</h1>
        <p>Deliveries assigned to drivers today.</p>
      </div>

      {error && <p className="formError">{error}</p>}

      <div className="ordersSection">
        <h2>Assigned Delivery Orders — Today</h2>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Farmer</th>
                <th>Buyer</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Product</th>
                <th>Qty</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.delivery_id}>
                  <td>{order.order_unique_id}</td>
                  <td>{order.farmer_name}</td>
                  <td>{order.buyer_name}</td>
                  <td>{order.driver_name}</td>
                  <td>{order.vehicle_number}</td>
                  <td>{order.crop_name}</td>
                  <td>{order.quantity_tons} Ton</td>
                  <td>
                    <span className={getStatusClass(order.status)}>{order.status}</span>
                  </td>
                  <td>
                    <button className="detailsBtn" onClick={() => handleView(order.delivery_id)}>
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedDetail && (
          <div className="activitySection">
            <h2>Order Details — {selectedDetail.order_unique_id}</h2>

            <table>
              <tbody>
                <tr><td>Farmer</td><td>{selectedDetail.farmer_name} ({selectedDetail.farmer_phone})</td></tr>
                <tr><td>Buyer</td><td>{selectedDetail.buyer_name} ({selectedDetail.buyer_phone})</td></tr>
                <tr><td>Driver</td><td>{selectedDetail.driver_name} ({selectedDetail.driver_phone})</td></tr>
                <tr><td>Vehicle</td><td>{selectedDetail.vehicle_number}</td></tr>
                <tr><td>Product</td><td>{selectedDetail.crop_name} — {selectedDetail.quantity_tons} Ton</td></tr>
                <tr><td>Total Price</td><td>৳{selectedDetail.total_price}</td></tr>
                <tr><td>Pickup</td><td>{selectedDetail.pickup_location}</td></tr>
                <tr><td>Drop</td><td>{selectedDetail.drop_location}</td></tr>
                <tr><td>Status</td><td>{selectedDetail.status}</td></tr>
                <tr><td>Assigned At</td><td>{new Date(selectedDetail.assigned_at).toLocaleString()}</td></tr>
                {selectedDetail.picked_up_at && <tr><td>Picked Up At</td><td>{new Date(selectedDetail.picked_up_at).toLocaleString()}</td></tr>}
                {selectedDetail.in_transit_at && <tr><td>In Transit At</td><td>{new Date(selectedDetail.in_transit_at).toLocaleString()}</td></tr>}
                {selectedDetail.delivered_at && <tr><td>Delivered At</td><td>{new Date(selectedDetail.delivered_at).toLocaleString()}</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default AssignedOrders;