import { useState, useEffect } from "react";
import "./css/DriverManagement.css";
import { FaUsers } from "react-icons/fa";
import { getDrivers, getAssignableOrders, assignOrder } from "../../api/adminService";

function DriverManagement() {
  const [drivers, setDrivers] = useState([]);
  const [assignableOrders, setAssignableOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [assigningDriverId, setAssigningDriverId] = useState(null);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const loadData = async () => {
    try {
      const [driversRes, ordersRes] = await Promise.all([
        getDrivers(),
        getAssignableOrders(),
      ]);
      setDrivers(driversRes.data.data);
      setAssignableOrders(ordersRes.data.data);
    } catch (err) {
      setError("Failed to load data");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleAssignSubmit = async (driver_id) => {
    if (!selectedOrderId) {
      setError("Please select an order");
      return;
    }
    try {
      await assignOrder({ order_id: selectedOrderId, driver_id });
      setMessage("Order assigned successfully!");
      setError("");
      setAssigningDriverId(null);
      setSelectedOrderId("");
      loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to assign order");
      console.error(err);
    }
  };

  return (
    <div className="driverManagement">
      <div className="pageHeader">
        <h1>Driver Management</h1>
        <p>Manage delivery drivers and assign today's orders.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="driverSection">
        <h2>
          <FaUsers /> Driver List
        </h2>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Phone</th>
                <th>Vehicle</th>
                <th>Today's Orders</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {drivers.map((driver) => (
                <tr key={driver.driver_id}>
                  <td>{driver.name}</td>
                  <td>{driver.phone}</td>
                  <td>{driver.vehicle_number}</td>
                  <td>
                    {driver.todaysOrders.length === 0 ? (
                      "None"
                    ) : (
                      <select defaultValue="">
                        <option value="" disabled>
                          {driver.todaysOrders.length} order(s) — view
                        </option>
                        {driver.todaysOrders.map((o) => (
                          <option key={o.delivery_id} value={o.delivery_id}>
                            {o.order_unique_id} — {o.delivery_status}
                          </option>
                        ))}
                      </select>
                    )}
                  </td>
                  <td>
                    {assigningDriverId === driver.driver_id ? (
                      <div style={{ display: "flex", gap: "8px" }}>
                        <select
                          value={selectedOrderId}
                          onChange={(e) => setSelectedOrderId(e.target.value)}
                        >
                          <option value="">Select order</option>
                          {assignableOrders.map((o) => (
                            <option key={o.order_id} value={o.order_id}>
                              {o.order_unique_id} — {o.crop_name} ({o.quantity_tons} Ton)
                            </option>
                          ))}
                        </select>
                        <button className="detailsBtn" onClick={() => handleAssignSubmit(driver.driver_id)}>
                          Submit
                        </button>
                      </div>
                    ) : (
                      <button className="detailsBtn" onClick={() => setAssigningDriverId(driver.driver_id)}>
                        Assign Order
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DriverManagement;