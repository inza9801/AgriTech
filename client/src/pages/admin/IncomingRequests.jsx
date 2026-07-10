import { useState, useEffect } from "react";
import "./css/IncomingRequests.css";
import { getIncomingRequests, getRequestDetail } from "../../api/adminService";

function IncomingRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedDetail, setSelectedDetail] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const res = await getIncomingRequests();
        setRequests(res.data.data);
      } catch (err) {
        setError("Failed to load incoming requests");
        console.error(err);
      }
    })();
  }, []);

  const handleViewDetails = async (orderId) => {
    try {
      const res = await getRequestDetail(orderId);
      setSelectedDetail(res.data.data);
    } catch (err) {
      setError("Failed to load request details");
      console.error(err);
    }
  };

  return (
    <div className="incomingRequests">
      <div className="pageHeader">
        <h1>Incoming Delivery Requests</h1>
        <p>Orders accepted by buyers today, waiting for driver assignment.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="requestSection">
        <h2>Pending Requests</h2>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Farmer</th>
                <th>Buyer</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((request) => (
                <tr key={request.order_id}>
                  <td>{request.order_unique_id}</td>
                  <td>{request.farmer_name}</td>
                  <td>{request.buyer_name}</td>
                  <td>{request.crop_name}</td>
                  <td>{request.quantity_tons} Ton</td>
                  <td>
                    <span className="waitingStatus">Waiting Assignment</span>
                  </td>
                  <td>
                    <button className="detailsBtn" onClick={() => handleViewDetails(request.order_id)}>
                      View Details
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedDetail && (
          <div className="detailsSection">
            <h2>Request Details</h2>

            <div className="detailsGrid">
              <div className="detailsCard">
                <h3>Farmer Information</h3>
                <table>
                  <tbody>
                    <tr><td>Farmer</td><td>{selectedDetail.farmer_name}</td></tr>
                    <tr><td>Phone</td><td>{selectedDetail.farmer_phone}</td></tr>
                    <tr><td>Address</td><td>{selectedDetail.farmer_address}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="detailsCard">
                <h3>Buyer Information</h3>
                <table>
                  <tbody>
                    <tr><td>Buyer</td><td>{selectedDetail.buyer_name}</td></tr>
                    <tr><td>Phone</td><td>{selectedDetail.buyer_phone}</td></tr>
                    <tr><td>Address</td><td>{selectedDetail.buyer_address}</td></tr>
                  </tbody>
                </table>
              </div>

              <div className="detailsCard">
                <h3>Product Details</h3>
                <table>
                  <tbody>
                    <tr><td>Product</td><td>{selectedDetail.crop_name}</td></tr>
                    <tr><td>Grade</td><td>{selectedDetail.grade}</td></tr>
                    <tr><td>Quantity</td><td>{selectedDetail.quantity_tons} Ton</td></tr>
                    <tr><td>Total Price</td><td>৳{selectedDetail.total_price}</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default IncomingRequests;