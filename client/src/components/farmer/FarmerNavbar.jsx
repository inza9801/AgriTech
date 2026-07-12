import { FaUserCircle } from "react-icons/fa";
import "./css/FarmerNavbar.css";
import { useAuth } from "../../contexts/AuthContext";

function FarmerNavbar() {
  const { user } = useAuth();
  const displayName = user?.name || user?.full_name || "Farmer";
  const farmName = user?.farm_name;

  return (
    <div className="navbar">
      <div>
        <h2>Smart Agriculture Platform</h2>
        <p>Welcome back, {displayName.split(" ")[0]}!</p>
      </div>

      <div className="navbarRight">
        <div className="profile">
          <FaUserCircle className="profileIcon" />
          <div>
            <strong>{displayName}</strong>
            <p>{farmName || "Verified Farmer"}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FarmerNavbar;
