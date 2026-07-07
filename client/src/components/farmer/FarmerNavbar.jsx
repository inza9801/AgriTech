import {
  FaBell,
  FaCloudSun,
  FaUserCircle
} from "react-icons/fa";

import "./css/FarmerNavbar.css";

function FarmerNavbar() {

  return (

    <div className="navbar">

      <div>

        <h2>Smart Agriculture Platform</h2>

        <p>
          Welcome back, Farmer!
        </p>

      </div>

      <div className="navbarRight">

        <div className="weatherCard">

          <FaCloudSun />

          <div>

            <strong>31°C</strong>

            <p>Sunny</p>

          </div>

        </div>

        <div className="notification">

          <FaBell />

          <span>3</span>

        </div>

        <div className="profile">

          <FaUserCircle className="profileIcon"/>

          <div>

            <strong>Rahim Uddin</strong>

            <p>Verified Farmer</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default FarmerNavbar;