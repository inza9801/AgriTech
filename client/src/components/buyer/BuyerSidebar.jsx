import { NavLink } from "react-router-dom";
import "./css/BuyerSidebar.css";
import { FaSignOutAlt } from "react-icons/fa";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const BuyerSidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };
  return (
    <aside className="buyerSidebar">
      <h2 className="logo">AgriNexus</h2>

      <nav>
        <NavLink to="/buyer" end>
          Dashboard
        </NavLink>

        <NavLink to="/buyer/marketplace">Marketplace</NavLink>

        <NavLink to="/buyer/product">Product Details</NavLink>

        <NavLink to="/buyer/orders">Cart & Orders</NavLink>

        <NavLink to="/buyer/tracking">Tracking</NavLink>

        <NavLink to="/buyer/payments">Payments</NavLink>
      </nav>
      <button className="logoutBtn" onClick={handleLogout}>
        <FaSignOutAlt />
        Logout
      </button>
    </aside>
  );
};

export default BuyerSidebar;
