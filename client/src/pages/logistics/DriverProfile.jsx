import { useState, useEffect } from "react";
import "./css/DriverProfile.css";
import {
  FaUserTie,
  FaIdBadge,
  FaPhoneAlt,
  FaEnvelope,
  FaTruck,
  FaCalendarAlt,
  FaBriefcase,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { getDriverProfile, getEarningsSummary } from "../../api/logisticsService";

function DriverProfile() {
  const [driver, setDriver] = useState(null);
  const [stats, setStats] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const [driverRes, statsRes] = await Promise.all([
          getDriverProfile(),
          getEarningsSummary(),
        ]);
        setDriver(driverRes.data.data);
        setStats(statsRes.data.data);
      } catch (err) {
        setError("Failed to load driver profile");
        console.error(err);
      }
    })();
  }, []);

  if (!driver) return <div className="driverProfileContainer">{error || "Loading..."}</div>;

  return (
    <div className="driverProfileContainer">
      <div className="pageHeader">
        <h1>Driver Profile</h1>
        <p>View your personal information, assigned vehicle and work statistics.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <div className="profileCard">
        <div className="profileTop">
          <div className="avatar">
            <FaUserTie />
          </div>
          <div>
            <h2>{driver.name}</h2>
            <p>Logistics Delivery Personnel</p>
          </div>
        </div>
      </div>

      <div className="profileGrid">
        <div className="infoCard">
          <h2>Personal Information</h2>
          <table>
            <tbody>
              <tr><td><FaIdBadge /> Employee ID</td><td>{driver.employee_id}</td></tr>
              <tr><td><FaPhoneAlt /> Phone</td><td>{driver.phone}</td></tr>
              <tr><td><FaEnvelope /> Email</td><td>{driver.email}</td></tr>
              <tr><td><FaMapMarkerAlt /> Address</td><td>{driver.address}</td></tr>
              <tr><td><FaBriefcase /> Experience</td><td>{driver.experience_years} Years</td></tr>
              <tr><td><FaCalendarAlt /> Joined</td><td>{driver.joining_date}</td></tr>
            </tbody>
          </table>
        </div>

        <div className="infoCard">
          <h2>Assigned Vehicle</h2>
          <table>
            <tbody>
              <tr><td><FaTruck /> Vehicle No.</td><td>{driver.vehicle_number}</td></tr>
              <tr><td>Vehicle Type</td><td>{driver.vehicle_type}</td></tr>
              <tr><td>Registration</td><td>{driver.registration_number}</td></tr>
              <tr><td>Capacity</td><td>{driver.capacity_tons} Ton</td></tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="statisticsSection">
        <h2>Driver Statistics</h2>
        <div className="statsGrid">
          <div className="statCard">
            <h1>{stats ? stats.totalCompletedTrips : "--"}</h1>
            <p>Completed Trips</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DriverProfile;