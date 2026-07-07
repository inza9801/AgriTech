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

import "./css/FarmerSidebar.css";

function FarmerSidebar() {
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

        <NavLink to="/" end>
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/farm-monitoring">
          <FaSeedling />
          <span>Farm Monitoring</span>
        </NavLink>

        <NavLink to="/irrigation">
          <FaTint />
          <span>Irrigation</span>
        </NavLink>

        <NavLink to="/crop-management">
          <FaTractor />
          <span>Crop Management</span>
        </NavLink>

        <NavLink to="/warehouse">
          <FaWarehouse />
          <span>Warehouse</span>
        </NavLink>

        <NavLink to="/marketplace">
          <FaStore />
          <span>Marketplace</span>
        </NavLink>

        <NavLink to="/orders-logistics">
          <FaTruck />
          <span>Orders & Logistics</span>
        </NavLink>

        <NavLink to="/payments">
          <FaWallet />
          <span>Payments & Earnings</span>
        </NavLink>

      </nav>

      <button className="logoutBtn">

        <FaSignOutAlt />

        Logout

      </button>

    </div>
  );
}

export default FarmerSidebar;