import "./css/LogisticsDashboard.css";

import {
  FaTruck,
  FaBoxOpen,
  FaShippingFast,
  FaCheckCircle,
  FaClipboardList,
  FaMoneyBillWave,
  FaRoute,
  FaCalendarAlt
} from "react-icons/fa";

function LogisticsDashboard() {

  const summary = [

    {
      icon: <FaClipboardList />,
      title: "Assigned Deliveries",
      value: "12",
      className: "assignedIcon"
    },

    {
      icon: <FaBoxOpen />,
      title: "Pending Pickups",
      value: "4",
      className: "pickupIcon"
    },

    {
      icon: <FaShippingFast />,
      title: "In Transit",
      value: "5",
      className: "transitIcon"
    },

    {
      icon: <FaCheckCircle />,
      title: "Completed Today",
      value: "3",
      className: "completedIcon"
    }

  ];

  return (

    <div className="logisticsDashboard">

      {/* ===========================
            PAGE HEADER
      =========================== */}

      <div className="pageHeader">

        <h1>Logistics Dashboard</h1>

        <p>
          Manage your assigned deliveries, pickups and daily transportation tasks.
        </p>

      </div>

      {/* ===========================
            WELCOME CARD
      =========================== */}

      <div className="welcomeCard">

        <div>

          <h2>Welcome Back, Abdul Karim 👋</h2>

          <p>
            Vehicle: Truck-205 | Employee ID: LG-204 | Shift: 8:00 AM - 6:00 PM
          </p>

        </div>

      </div>

      {/* ===========================
            SUMMARY
      =========================== */}

      <div className="summaryGrid">

        {

          summary.map((item,index)=>(

            <div
              className="summaryCard"
              key={index}
            >

              <div className={`summaryIcon ${item.className}`}>

                {item.icon}

              </div>

              <div>

                <h2>{item.value}</h2>

                <p>{item.title}</p>

              </div>

            </div>

          ))

        }

      </div>

      {/* ===========================
            QUICK ACTIONS
      =========================== */}

      <div className="quickActionSection">

        <h2>Quick Actions</h2>

        <div className="actionGrid">

          <div className="actionCard">

            <FaTruck />

            <h3>View Deliveries</h3>

            <p>Check today's assigned delivery tasks.</p>

          </div>

          <div className="actionCard">

            <FaRoute />

            <h3>Delivery Status</h3>

            <p>Update shipment progress.</p>

          </div>

          <div className="actionCard">

            <FaMoneyBillWave />

            <h3>Earnings</h3>

            <p>View completed trip payments.</p>

          </div>

        </div>

      </div>

      {/* ===========================
            TODAY'S SCHEDULE
      =========================== */}

      <div className="scheduleSection">

        <h2>

          <FaCalendarAlt />

          Today's Schedule

        </h2>

        <table>

          <thead>

            <tr>

              <th>Time</th>

              <th>Task</th>

              <th>Location</th>

              <th>Status</th>

            </tr>

          </thead>

          <tbody>

            <tr>

              <td>09:30 AM</td>

              <td>Pickup Rice</td>

              <td>Green Valley Farm</td>

              <td>

                <span className="pendingStatus">

                  Pending

                </span>

              </td>

            </tr>

            <tr>

              <td>11:00 AM</td>

              <td>Deliver Rice</td>

              <td>Dhaka Agro Traders</td>

              <td>

                <span className="transitStatus">

                  Upcoming

                </span>

              </td>

            </tr>

            <tr>

              <td>02:00 PM</td>

              <td>Pickup Potato</td>

              <td>Golden Farm</td>

              <td>

                <span className="scheduledStatus">

                  Scheduled

                </span>

              </td>

            </tr>

          </tbody>

        </table>

      </div>

    </div>

  );

}

export default LogisticsDashboard;