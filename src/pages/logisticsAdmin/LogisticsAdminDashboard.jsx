import "./css/LogisticsAdminDashboard.css";

import {
  FaClipboardList,
  FaTruck,
  FaShippingFast,
  FaCheckCircle,
  FaExclamationTriangle,
  FaUsers,
  FaTasks,
  FaRoute,
  FaCalendarAlt
} from "react-icons/fa";

function LogisticsAdminDashboard() {

  const summary = [

    {
      icon: <FaClipboardList />,
      title: "Pending Requests",
      value: "18",
      className: "pendingIcon"
    },

    {
      icon: <FaTruck />,
      title: "Assigned Orders",
      value: "42",
      className: "assignedIcon"
    },

    {
      icon: <FaUsers />,
      title: "Available Drivers",
      value: "11",
      className: "driverIcon"
    },

    {
      icon: <FaShippingFast />,
      title: "In Transit",
      value: "23",
      className: "transitIcon"
    },

    {
      icon: <FaCheckCircle />,
      title: "Delivered Today",
      value: "15",
      className: "completedIcon"
    },

    {
      icon: <FaExclamationTriangle />,
      title: "Delayed Shipments",
      value: "2",
      className: "delayIcon"
    }

  ];

  const activities = [

    {
      time: "09:20 AM",
      activity: "Farmer accepted order",
      order: "ORD-1023",
      status: "Waiting Assignment",
      className: "waitingStatus"
    },

    {
      time: "09:45 AM",
      activity: "Driver Abdul Karim Assigned",
      order: "ORD-1020",
      status: "Assigned",
      className: "assignedStatus"
    },

    {
      time: "10:10 AM",
      activity: "Shipment Started",
      order: "ORD-1018",
      status: "In Transit",
      className: "transitStatus"
    },

    {
      time: "11:00 AM",
      activity: "Shipment Delivered",
      order: "ORD-1015",
      status: "Delivered",
      className: "deliveredStatus"
    }

  ];

  const drivers = [

    {
      name: "Abdul Karim",
      vehicle: "Truck-205",
      deliveries: "2 Active Deliveries",
      status: "Available",
      className: "availableStatus"
    },

    {
      name: "Hasan Ali",
      vehicle: "Van-08",
      deliveries: "1 Active Delivery",
      status: "Busy",
      className: "busyStatus"
    },

    {
      name: "Rahim Uddin",
      vehicle: "Pickup-11",
      deliveries: "No Active Delivery",
      status: "Available",
      className: "availableStatus"
    }

  ];

  return (

    <div className="logisticsAdminDashboard">

      <div className="pageHeader">

        <h1>Logistics Administration</h1>

        <p>

          Manage delivery requests, dispatch drivers and monitor shipment operations.

        </p>

      </div>

      <div className="welcomeCard">

        <div>

          <h2>

            Welcome Back, Logistics Manager 👋

          </h2>

          <p>

            Department : Dispatch Center | Shift : 8:00 AM - 6:00 PM

          </p>

          <p>

            Today's Dispatch Target : 18 Deliveries

          </p>

        </div>

      </div>

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

      <div className="quickActionSection">

        <h2>

          <FaTasks />

          Quick Actions

        </h2>

        <div className="actionGrid">

          <div className="actionCard">

            <FaClipboardList />

            <h3>Incoming Requests</h3>

            <p>

              Review newly accepted farmer orders waiting for dispatch.

            </p>

          </div>

          <div className="actionCard">

            <FaTruck />

            <h3>Assign Drivers</h3>

            <p>

              Allocate available drivers and vehicles for delivery.

            </p>

          </div>

          <div className="actionCard">

            <FaUsers />

            <h3>Manage Drivers</h3>

            <p>

              View driver availability and current workload.

            </p>

          </div>

          <div className="actionCard">

            <FaRoute />

            <h3>Shipment Monitoring</h3>

            <p>

              Monitor all active deliveries across the network.

            </p>

          </div>

        </div>

      </div>

      <div className="activitySection">

        <h2>

          <FaCalendarAlt />

          Recent Dispatch Activity

        </h2>

        <div className="tableContainer">

          <table>

            <thead>

              <tr>

                <th>Time</th>

                <th>Activity</th>

                <th>Order ID</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                activities.map((item,index)=>(

                  <tr key={index}>

                    <td>{item.time}</td>

                    <td>{item.activity}</td>

                    <td>{item.order}</td>

                    <td>

                      <span className={item.className}>

                        {item.status}

                      </span>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      <div className="driverSection">

        <h2>

          <FaUsers />

          Driver Availability

        </h2>

        <div className="driverGrid">

          {

            drivers.map((driver,index)=>(

              <div
                className="driverCard"
                key={index}
              >

                <h3>{driver.name}</h3>

                <p>

                  <strong>Vehicle:</strong> {driver.vehicle}

                </p>

                <p>

                  <strong>Workload:</strong> {driver.deliveries}

                </p>

                <span className={driver.className}>

                  {driver.status}

                </span>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default LogisticsAdminDashboard;
