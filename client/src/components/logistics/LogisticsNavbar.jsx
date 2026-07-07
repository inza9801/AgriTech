import {
  FaBell,
  FaTruck,
  FaUserCircle
} from "react-icons/fa";

import "./css/LogisticsNavbar.css";

function LogisticsNavbar() {

  return (

    <div className="logisticsNavbar">

      <div>

        <h2>Logistics Management</h2>

        <p>
          Welcome back, Driver!
        </p>

      </div>

      <div className="navbarRight">

        <div className="vehicleCard">

          <FaTruck />

          <div>

            <strong>Truck-205</strong>

            <p>Active Vehicle</p>

          </div>

        </div>

        <div className="notification">

          <FaBell />

          <span>2</span>

        </div>

        <div className="profile">

          <FaUserCircle className="profileIcon" />

          <div>

            <strong>Abdul Karim</strong>

            <p>Verified Driver</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LogisticsNavbar;
