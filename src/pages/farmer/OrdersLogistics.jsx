import "./css/OrdersLogistics.css";

function OrdersLogistics() {
  return (
    <div className="ordersContainer">
      <div className="pageHeader">
        <h1>Orders & Logistics</h1>

        <p>
          Track incoming orders, monitor pickups, manage deliveries, and view
          courier updates.
        </p>
      </div>

      {/* ===========================
                ORDERS SUMMARY
            =========================== */}

      <div className="summaryGrid">
        <div className="summaryCard">
          <div className="summaryIcon">📦</div>

          <div>
            <h2>38</h2>

            <p>Total Orders</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon pendingIcon">⏳</div>

          <div>
            <h2>5</h2>

            <p>Pending Pickup</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon transitIcon">🚚</div>

          <div>
            <h2>9</h2>

            <p>In Transit</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon deliveredIcon">✅</div>

          <div>
            <h2>24</h2>

            <p>Delivered</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon revenueIcon">💰</div>

          <div>
            <h2>৳872K</h2>

            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      {/* ===========================
    INCOMING ORDERS
=========================== */}

      <div className="ordersSection">
        <div className="sectionTitle">
          <h2>Incoming Orders</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Order Date</th>
                <th>Payment</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>ORD001</td>
                <td>Dhaka Agro Traders</td>
                <td>Rice</td>
                <td>2 Ton</td>
                <td>৳106,000</td>
                <td>12 Jul 2026</td>

                <td>
                  <span className="paidStatus">Paid</span>
                </td>

                <td>
                  <span className="pendingPickup">Pickup Pending</span>
                </td>
              </tr>

              <tr>
                <td>ORD002</td>
                <td>Green Valley Foods</td>
                <td>Rice</td>
                <td>3 Ton</td>
                <td>৳171,000</td>
                <td>11 Jul 2026</td>

                <td>
                  <span className="paidStatus">Paid</span>
                </td>

                <td>
                  <span className="transitStatus">In Transit</span>
                </td>
              </tr>

              <tr>
                <td>ORD003</td>
                <td>Fresh Mart</td>
                <td>Wheat</td>
                <td>1.5 Ton</td>
                <td>৳82,000</td>
                <td>10 Jul 2026</td>

                <td>
                  <span className="pendingStatus">Pending</span>
                </td>

                <td>
                  <span className="confirmedStatus">Confirmed</span>
                </td>
              </tr>

              <tr>
                <td>ORD004</td>
                <td>Agro Foods Ltd.</td>
                <td>Maize</td>
                <td>2.5 Ton</td>
                <td>৳138,000</td>
                <td>09 Jul 2026</td>

                <td>
                  <span className="paidStatus">Paid</span>
                </td>

                <td>
                  <span className="deliveredStatus">Delivered</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    PICKUP SCHEDULE
=========================== */}

      <div className="pickupSection">
        <div className="sectionTitle">
          <h2>Pickup Schedule</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Pickup ID</th>
                <th>Logistics Company</th>
                <th>Pickup Date</th>
                <th>Time</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>PK001</td>
                <td>Green Express</td>
                <td>12 Jul 2026</td>
                <td>9:30 AM</td>
                <td>Abdul Karim</td>
                <td>Truck-204</td>

                <td>
                  <span className="scheduledStatus">Scheduled</span>
                </td>
              </tr>

              <tr>
                <td>PK002</td>
                <td>Fast Logistics</td>
                <td>13 Jul 2026</td>
                <td>2:00 PM</td>
                <td>Rahim Uddin</td>
                <td>Pickup Van</td>

                <td>
                  <span className="confirmedStatus">Confirmed</span>
                </td>
              </tr>

              <tr>
                <td>PK003</td>
                <td>Bangla Transport</td>
                <td>13 Jul 2026</td>
                <td>4:15 PM</td>
                <td>Shahid Hasan</td>
                <td>Mini Truck</td>

                <td>
                  <span className="pickupCompleted">Picked Up</span>
                </td>
              </tr>

              <tr>
                <td>PK004</td>
                <td>Rapid Cargo</td>
                <td>14 Jul 2026</td>
                <td>10:00 AM</td>
                <td>Jamal Hossain</td>
                <td>Truck-118</td>

                <td>
                  <span className="scheduledStatus">Scheduled</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    SHIPMENT STATUS
=========================== */}

      <div className="shipmentSection">
        <div className="sectionTitle">
          <h2>Shipment Status</h2>
        </div>

        <div className="shipmentGrid">
          <div className="shipmentCard">
            <div className="shipmentHeader">
              <h3>Order #ORD001</h3>

              <span className="transitStatus">In Transit</span>
            </div>

            <div className="shipmentTimeline">
              <div className="timelineItem completedStep">
                ✓ Order Confirmed
              </div>

              <div className="timelineItem completedStep">
                ✓ Payment Received
              </div>

              <div className="timelineItem completedStep">✓ Picked Up</div>

              <div className="timelineItem activeStep">🚚 In Transit</div>

              <div className="timelineItem">⬜ Delivered</div>
            </div>
          </div>

          <div className="shipmentCard">
            <div className="shipmentHeader">
              <h3>Order #ORD002</h3>

              <span className="confirmedStatus">Pickup Scheduled</span>
            </div>

            <div className="shipmentTimeline">
              <div className="timelineItem completedStep">
                ✓ Order Confirmed
              </div>

              <div className="timelineItem completedStep">
                ✓ Payment Received
              </div>

              <div className="timelineItem activeStep">📅 Pickup Scheduled</div>

              <div className="timelineItem">⬜ In Transit</div>

              <div className="timelineItem">⬜ Delivered</div>
            </div>
          </div>

          <div className="shipmentCard">
            <div className="shipmentHeader">
              <h3>Order #ORD003</h3>

              <span className="deliveredStatus">Delivered</span>
            </div>

            <div className="shipmentTimeline">
              <div className="timelineItem completedStep">
                ✓ Order Confirmed
              </div>

              <div className="timelineItem completedStep">
                ✓ Payment Received
              </div>

              <div className="timelineItem completedStep">✓ Picked Up</div>

              <div className="timelineItem completedStep">✓ In Transit</div>

              <div className="timelineItem completedStep">✓ Delivered</div>
            </div>
          </div>
        </div>
      </div>

      {/* ===========================
    COURIER STATUS
=========================== */}

      <div className="courierSection">
        <div className="sectionTitle">
          <h2>Courier Status</h2>
        </div>

        <div className="courierGrid">
          <div className="courierCard">
            <div className="courierTop">
              <h3>Green Express</h3>

              <span className="transitStatus">In Transit</span>
            </div>

            <p>
              <strong>Driver:</strong> Abdul Karim
            </p>

            <p>
              <strong>Vehicle:</strong> Truck-204
            </p>

            <p>
              <strong>Current Location:</strong> Gazipur
            </p>

            <p>
              <strong>ETA:</strong> 45 Minutes
            </p>
          </div>

          <div className="courierCard">
            <div className="courierTop">
              <h3>Fast Logistics</h3>

              <span className="confirmedStatus">Pickup Scheduled</span>
            </div>

            <p>
              <strong>Driver:</strong> Rahim Uddin
            </p>

            <p>
              <strong>Vehicle:</strong> Pickup Van
            </p>

            <p>
              <strong>Current Location:</strong> Warehouse
            </p>

            <p>
              <strong>ETA:</strong> Tomorrow 10:00 AM
            </p>
          </div>

          <div className="courierCard">
            <div className="courierTop">
              <h3>Rapid Cargo</h3>

              <span className="deliveredStatus">Delivered</span>
            </div>

            <p>
              <strong>Driver:</strong> Jamal Hossain
            </p>

            <p>
              <strong>Vehicle:</strong> Truck-118
            </p>

            <p>
              <strong>Current Location:</strong> Dhaka
            </p>

            <p>
              <strong>Delivered:</strong> 11 Jul 2026
            </p>
          </div>

          <div className="courierCard">
            <div className="courierTop">
              <h3>Bangla Transport</h3>

              <span className="scheduledStatus">Ready for Pickup</span>
            </div>

            <p>
              <strong>Driver:</strong> Shahid Hasan
            </p>

            <p>
              <strong>Vehicle:</strong> Mini Truck
            </p>

            <p>
              <strong>Current Location:</strong> Farm Warehouse
            </p>

            <p>
              <strong>ETA:</strong> 2 Hours
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersLogistics;
