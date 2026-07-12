import "./css/LogisticsSidebar.css";

import { NavLink } from "react-router-dom";

import {
  FaTruck,
  FaClipboardList,
  FaShippingFast,
  FaMoneyBillWave,
  FaUserTie,
  FaSignOutAlt,
} from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
function LogisticsSidebar() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="logisticsSidebar">
      <div className="logo">
        <h2>AgriNexus</h2>

        <p>Logistics</p>
      </div>

      <nav>
        <NavLink to="/logistics" end className="navItem">
          <FaTruck />

          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/logistics/deliveries" className="navItem">
          <FaClipboardList />

          <span>Assigned Deliveries</span>
        </NavLink>

        <NavLink to="/logistics/status" className="navItem">
          <FaShippingFast />

          <span>Delivery Status</span>
        </NavLink>

        <NavLink to="/logistics/earnings" className="navItem">
          <FaMoneyBillWave />

          <span>Earnings</span>
        </NavLink>

        <NavLink to="/logistics/profile" className="navItem">
          <FaUserTie />

          <span>Driver Profile</span>
        </NavLink>
      </nav>
      <button className="logoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
}

export default LogisticsSidebar;
