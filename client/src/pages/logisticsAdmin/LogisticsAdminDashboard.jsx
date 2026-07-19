import { useState, useEffect } from "react";
import "./css/LogisticsAdminDashboard.css";
import {
  FaClipboardList,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
  FaUsers,
} from "react-icons/fa";
import { getDashboardSummary, getShipments } from "../../api/adminService";

function LogisticsAdminDashboard() {
  const [summaryData, setSummaryData] = useState(null);
  const [shipments, setShipments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [summaryRes, shipmentsRes] = await Promise.all([
          getDashboardSummary(),
          getShipments(),
        ]);
        setSummaryData(summaryRes.data.data);
        setShipments(shipmentsRes.data.data);
      } catch (err) {
        setError("Failed to load dashboard data");
        console.error(err);
      }
    })();
  }, []);

  const summary = [
    { icon: <FaClipboardList />, title: "Pending Requests", value: summaryData?.pendingRequests ?? 0, className: "pendingIcon" },
    { icon: <FaTruck />, title: "Total Orders Today", value: summaryData?.totalOrdersToday ?? 0, className: "assignedIcon" },
    { icon: <FaUsers />, title: "Assigned", value: summaryData?.assigned ?? 0, className: "driverIcon" },
    { icon: <FaClipboardList />, title: "Pickup", value: summaryData?.pickup ?? 0, className: "pickupIcon" },
    { icon: <FaShippingFast />, title: "In Transit", value: summaryData?.inTransit ?? 0, className: "transitIcon" },
    { icon: <FaCheckCircle />, title: "Delivered Today", value: summaryData?.deliveredToday ?? 0, className: "completedIcon" },
  ];

  return (
    <div className="logisticsAdminDashboard">
      <div className="pageHeader">
        <h1>Logistics Administration</h1>
        <p>Manage delivery requests, dispatch drivers and monitor shipment operations.</p>
      </div>

      {error && <p className="formError">{error}</p>}

      <div className="summaryGrid">
        {summary.map((item, index) => (
          <div className="summaryCard" key={index}>
            <div className={`summaryIcon ${item.className}`}>{item.icon}</div>
            <div>
              <h2>{item.value}</h2>
              <p>{item.title}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="activitySection">
        <h2>Today's Orders</h2>
        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Crop</th>
                <th>Quantity</th>
                <th>Driver</th>
                <th>Vehicle</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {shipments.map((s) => (
                <tr key={s.delivery_id}>
                  <td>{s.order_unique_id}</td>
                  <td>{s.crop_name}</td>
                  <td>{s.quantity_tons} Ton</td>
                  <td>{s.driver_name}</td>
                  <td>{s.vehicle_number}</td>
                  <td>{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LogisticsAdminDashboard;