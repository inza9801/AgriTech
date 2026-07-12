import { FaUserCircle } from "react-icons/fa";
import "./css/LogisticsAdminNavbar.css";
import { useAuth } from "../../contexts/AuthContext";

function LogisticsAdminNavbar() {
  const { user } = useAuth();
  const displayName = user?.name || user?.full_name || "Manager";

  return (
    <div className="logisticsAdminNavbar">
      <div>
        <h2>Logistics Administration</h2>
        <p>Welcome back, {displayName.split(" ")[0]}!</p>
      </div>

      <div className="navbarRight">
        <div className="profile">
          <FaUserCircle className="profileIcon" />
          <div>
            <strong>{displayName}</strong>
            <p>Dispatch Center</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogisticsAdminNavbar;
