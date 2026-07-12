import { NavLink, useNavigate } from "react-router-dom";
import {
  FaLeaf,
  FaChartPie,
  FaStore,
  FaShoppingBasket,
  FaTruckMoving,
  FaWallet,
  FaSignOutAlt,
} from "react-icons/fa";
import "./css/BuyerSidebar.css";
import { useAuth } from "../../contexts/AuthContext";

const BuyerSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <aside className="buyerSidebar">
      <div className="logo">
        <FaLeaf className="logoIcon" />
        <div>
          <h2>AgriNexus</h2>
          <p>Buyer Panel</p>
        </div>
      </div>

      <nav>
        <NavLink to="/buyer" end>
          <FaChartPie />
          <span>Dashboard</span>
        </NavLink>

        <NavLink to="/buyer/marketplace">
          <FaStore />
          <span>Marketplace</span>
        </NavLink>

        <NavLink to="/buyer/orders">
          <FaShoppingBasket />
          <span>Cart & Orders</span>
        </NavLink>

        <NavLink to="/buyer/tracking">
          <FaTruckMoving />
          <span>Tracking</span>
        </NavLink>

        <NavLink to="/buyer/payments">
          <FaWallet />
          <span>Payments</span>
        </NavLink>
      </nav>

      <button className="logoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default BuyerSidebar;
