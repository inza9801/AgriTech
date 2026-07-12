import "./css/LogisticsAdminSidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaChartPie,
  FaInbox,
  FaClipboardCheck,
  FaUsers,
  FaShippingFast,
  FaHistory,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function LogisticsAdminSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="logisticsAdminSidebar">
      <div className="logo">
        <h2>AgriNexus</h2>

        <p>Logistics Admin</p>
      </div>

      <nav>
        <NavLink to="/logistics-admin" end className="navItem">
          <FaChartPie />

          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/logistics-admin/incoming-requests" className="navItem">
          <FaInbox />

          <span>Incoming Requests</span>
        </NavLink>

        <NavLink to="/logistics-admin/assigned-orders" className="navItem">
          <FaClipboardCheck />

          <span>Assigned Orders</span>
        </NavLink>

        <NavLink to="/logistics-admin/drivers" className="navItem">
          <FaUsers />

          <span>Driver Management</span>
        </NavLink>

        <NavLink to="/logistics-admin/shipments" className="navItem">
          <FaShippingFast />

          <span>Shipment Monitoring</span>
        </NavLink>

        <NavLink to="/logistics-admin/history" className="navItem">
          <FaHistory />

          <span>Delivery History</span>
        </NavLink>
      </nav>
      <button className="logoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default LogisticsAdminSidebar;
