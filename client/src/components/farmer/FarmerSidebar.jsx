import { NavLink } from "react-router-dom";

import {
  FaLeaf,
  FaChartPie,
  FaSeedling,
  FaTint,
  FaTractor,
  FaWarehouse,
  FaStore,
  FaSignOutAlt,
  FaTruck,
  FaWallet
} from "react-icons/fa";


import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

import "./css/FarmerSidebar.css";

function FarmerSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div className="sidebar">

      <div className="logo">

        <FaLeaf className="logoIcon" />

        <div>
          <h2>AgriTech</h2>
          <p>Farmer Panel</p>
        </div>

      </div>

      <nav>

        <NavLink to="/farmer" end>
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/farmer/farm-monitoring">
          <FaSeedling />
          <span>Farm Monitoring</span>
        </NavLink>

        <NavLink to="/farmer/irrigation">
          <FaTint />
          <span>Irrigation</span>
        </NavLink>

        <NavLink to="/farmer/crop-management">
          <FaTractor />
          <span>Crop Management</span>
        </NavLink>

        <NavLink to="/farmer/warehouse">
          <FaWarehouse />
          <span>Warehouse</span>
        </NavLink>

        <NavLink to="/farmer/marketplace">
          <FaStore />
          <span>Marketplace</span>
        </NavLink>

        <NavLink to="/farmer/orders-logistics">
          <FaTruck />
          <span>Orders & Logistics</span>
        </NavLink>

        <NavLink to="/farmer/payments">
          <FaWallet />
          <span>Payments & Earnings</span>
        </NavLink>

      </nav>

      <button className="logoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>

    </div>
  );
}

export default FarmerSidebar;