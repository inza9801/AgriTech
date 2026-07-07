import "./css/DriverProfile.css";

import {
  FaUserTie,
  FaIdBadge,
  FaPhoneAlt,
  FaEnvelope,
  FaTruck,
  FaCalendarAlt,
  FaBriefcase,
  FaCheckCircle,
  FaMapMarkerAlt,
  FaUserShield
} from "react-icons/fa";

function DriverProfile() {

  const driver = {

    name: "Abdul Karim",

    employeeId: "LG-204",

    phone: "+880 1712-345678",

    email: "abdul.karim@agrinexus.com",

    address: "Mirpur, Dhaka",

    experience: "6 Years",

    joiningDate: "15 March 2022",

    availability: "Available",

    vehicle: "Truck-205",

    vehicleType: "Medium Cargo Truck",

    registration: "DHK Metro TA-11-2045",

    capacity: "5 Tons",

    completedTrips: 248,

    activeTrips: 3,

    totalEarnings: "৳4,62,850",

    emergencyContact: "Rahim Uddin",

    emergencyPhone: "+880 1812-987654"

  };

  return (

    <div className="driverProfileContainer">

      {/* ===========================
            PAGE HEADER
      =========================== */}

      <div className="pageHeader">

        <h1>Driver Profile</h1>

        <p>

          View your personal information, assigned vehicle and work statistics.

        </p>

      </div>

      {/* ===========================
            PROFILE CARD
      =========================== */}

      <div className="profileCard">

        <div className="profileTop">

          <div className="avatar">

            <FaUserTie />

          </div>

          <div>

            <h2>{driver.name}</h2>

            <p>Logistics Delivery Personnel</p>

            <span className="availableBadge">

              <FaCheckCircle />

              {driver.availability}

            </span>

          </div>

        </div>

      </div>

      {/* ===========================
            PROFILE GRID
      =========================== */}

      <div className="profileGrid">

        {/* PERSONAL INFORMATION */}

        <div className="infoCard">

          <h2>Personal Information</h2>

          <table>

            <tbody>

              <tr>

                <td>

                  <FaIdBadge />

                  Employee ID

                </td>

                <td>{driver.employeeId}</td>

              </tr>

              <tr>

                <td>

                  <FaPhoneAlt />

                  Phone

                </td>

                <td>{driver.phone}</td>

              </tr>

              <tr>

                <td>

                  <FaEnvelope />

                  Email

                </td>

                <td>{driver.email}</td>

              </tr>

              <tr>

                <td>

                  <FaMapMarkerAlt />

                  Address

                </td>

                <td>{driver.address}</td>

              </tr>

              <tr>

                <td>

                  <FaBriefcase />

                  Experience

                </td>

                <td>{driver.experience}</td>

              </tr>

              <tr>

                <td>

                  <FaCalendarAlt />

                  Joined

                </td>

                <td>{driver.joiningDate}</td>

              </tr>

            </tbody>

          </table>

        </div>

        {/* VEHICLE */}

        <div className="infoCard">

          <h2>Assigned Vehicle</h2>

          <table>

            <tbody>

              <tr>

                <td>

                  <FaTruck />

                  Vehicle No.

                </td>

                <td>{driver.vehicle}</td>

              </tr>

              <tr>

                <td>Vehicle Type</td>

                <td>{driver.vehicleType}</td>

              </tr>

              <tr>

                <td>Registration</td>

                <td>{driver.registration}</td>

              </tr>

              <tr>

                <td>Capacity</td>

                <td>{driver.capacity}</td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

      {/* ===========================
            DRIVER STATISTICS
      =========================== */}

      <div className="statisticsSection">

        <h2>Driver Statistics</h2>

        <div className="statsGrid">

          <div className="statCard">

            <h1>{driver.completedTrips}</h1>

            <p>Completed Trips</p>

          </div>

          <div className="statCard">

            <h1>{driver.activeTrips}</h1>

            <p>Active Deliveries</p>

          </div>

          <div className="statCard">

            <h1>{driver.totalEarnings}</h1>

            <p>Total Earnings</p>

          </div>

        </div>

      </div>

      {/* ===========================
            EMERGENCY CONTACT
      =========================== */}

      <div className="emergencySection">

        <h2>

          <FaUserShield />

          Emergency Contact

        </h2>

        <table>

          <tbody>

            <tr>

              <td>Contact Person</td>

              <td>{driver.emergencyContact}</td>

            </tr>

            <tr>

              <td>Phone Number</td>

              <td>{driver.emergencyPhone}</td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default DriverProfile;