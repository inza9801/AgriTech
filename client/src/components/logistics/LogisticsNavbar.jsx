import { FaUserCircle } from "react-icons/fa";
import "./css/LogisticsNavbar.css";
import { useAuth } from "../../contexts/AuthContext";

function LogisticsNavbar() {
  const { user } = useAuth();
  const displayName = user?.name || user?.full_name || "Driver";
  const vehicle = user?.vehicle_number;

  return (
    <div className="logisticsNavbar">
      <div>
        <h2>Logistics Management</h2>
        <p>Welcome back, {displayName.split(" ")[0]}!</p>
      </div>

      <div className="navbarRight">
        <div className="profile">
          <FaUserCircle className="profileIcon" />
          <div>
            <strong>{displayName}</strong>
            <p>{vehicle ? `Vehicle: ${vehicle}` : "Verified Driver"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LogisticsNavbar;
