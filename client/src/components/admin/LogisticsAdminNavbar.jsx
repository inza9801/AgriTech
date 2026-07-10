import {
  FaBell,
  FaTasks,
  FaUserCircle
} from "react-icons/fa";

import "./css/LogisticsAdminNavbar.css";

function LogisticsAdminNavbar() {

  return (

    <div className="logisticsAdminNavbar">

      <div>

        <h2>Logistics Administration</h2>

        <p>
          Welcome back, Manager!
        </p>

      </div>

      <div className="navbarRight">

        <div className="dispatchCard">

          <FaTasks />

          <div>

            <strong>18 Pending</strong>

            <p>Dispatch Queue</p>

          </div>

        </div>

        <div className="notification">

          <FaBell />

          <span>5</span>

        </div>

        <div className="profile">

          <FaUserCircle className="profileIcon" />

          <div>

            <strong>Logistics Manager</strong>

            <p>Dispatch Center</p>

          </div>

        </div>

      </div>

    </div>

  );

}

export default LogisticsAdminNavbar;
