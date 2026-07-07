import "./css/AssignedDeliveries.css";

import {
  FaTruck,
  FaMapMarkerAlt,
  FaArrowDown,
  FaUserTie,
  FaBoxOpen,
  FaClock,
  FaCheckCircle,
  FaEye,
  FaClipboardList
} from "react-icons/fa";

function AssignedDeliveries() {

  const summary = [
    {
      icon: <FaClipboardList />,
      title: "Assigned",
      value: "12",
      className: "assignedIcon"
    },
    {
      icon: <FaBoxOpen />,
      title: "Pending Pickup",
      value: "4",
      className: "pendingIcon"
    },
    {
      icon: <FaTruck />,
      title: "In Transit",
      value: "5",
      className: "transitIcon"
    },
    {
      icon: <FaCheckCircle />,
      title: "Completed",
      value: "3",
      className: "completedIcon"
    }
  ];

  const deliveries = [

    {
      id: "ORD-1024",
      driver: "Abdul Karim",
      vehicle: "Truck-205",

      pickup: "Green Valley Farm",
      pickupLocation: "Gazipur",

      drop: "Dhaka Agro Traders",
      dropLocation: "Tejgaon, Dhaka",

      crop: "Rice",
      quantity: "2 Tons",

      time: "09:30 AM",

      priority: "High",

      status: "Ready for Pickup"
    },

    {
      id: "ORD-1025",
      driver: "Abdul Karim",
      vehicle: "Truck-205",

      pickup: "Golden Farm",
      pickupLocation: "Tangail",

      drop: "Fresh Foods Ltd.",
      dropLocation: "Uttara, Dhaka",

      crop: "Potato",
      quantity: "5 Tons",

      time: "12:30 PM",

      priority: "Medium",

      status: "Assigned"
    },

    {
      id: "ORD-1026",
      driver: "Abdul Karim",
      vehicle: "Truck-205",

      pickup: "Sunrise Farm",
      pickupLocation: "Mymensingh",

      drop: "Square Food Processing",
      dropLocation: "Gazipur",

      crop: "Maize",
      quantity: "3 Tons",

      time: "Tomorrow",

      priority: "Low",

      status: "Scheduled"
    }

  ];

  return (

    <div className="assignedContainer">

      {/* ===========================
            PAGE HEADER
      =========================== */}

      <div className="pageHeader">

        <h1>Assigned Deliveries</h1>

        <p>

          View and manage deliveries assigned to you.

        </p>

      </div>

      {/* ===========================
            SUMMARY
      =========================== */}

      <div className="summaryGrid">

        {

          summary.map((item, index) => (

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
            DELIVERY LIST
      =========================== */}

      <div className="deliverySection">

        <div className="sectionTitle">

          <h2>

            Today's Assigned Deliveries

          </h2>

        </div>

        <div className="deliveryGrid">

          {

            deliveries.map((delivery) => (

              <div
                className="deliveryCard"
                key={delivery.id}
              >

                {/* =====================
                      HEADER
                ====================== */}

                <div className="cardHeader">

                  <div>

                    <h3>{delivery.id}</h3>

                    <p>

                      <FaUserTie />

                      {delivery.driver}

                    </p>

                  </div>

                  <span className="vehicleTag">

                    {delivery.vehicle}

                  </span>

                </div>

                {/* =====================
                     ROUTE
                ====================== */}

                <div className="routeContainer">

                  <div className="locationCard">

                    <FaMapMarkerAlt />

                    <div>

                      <h4>Pickup</h4>

                      <p>{delivery.pickup}</p>

                      <small>{delivery.pickupLocation}</small>

                    </div>

                  </div>

                  <div className="routeArrow">

                    <FaArrowDown />

                  </div>

                  <div className="locationCard">

                    <FaMapMarkerAlt />

                    <div>

                      <h4>Drop</h4>

                      <p>{delivery.drop}</p>

                      <small>{delivery.dropLocation}</small>

                    </div>

                  </div>

                </div>

                {/* =====================
                     INFORMATION
                ====================== */}

                <div className="infoGrid">

                  <div>

                    <span>Crop</span>

                    <h4>{delivery.crop}</h4>

                  </div>

                  <div>

                    <span>Quantity</span>

                    <h4>{delivery.quantity}</h4>

                  </div>

                  <div>

                    <span>

                      <FaClock />

                      Pickup Time

                    </span>

                    <h4>{delivery.time}</h4>

                  </div>

                </div>

                {/* =====================
                    PRIORITY + STATUS
                ====================== */}

                <div className="statusRow">

                  <span className={`priority ${delivery.priority.toLowerCase()}`}>

                    {delivery.priority} Priority

                  </span>

                  <span className="deliveryStatus">

                    {delivery.status}

                  </span>

                </div>

                {/* =====================
                     ACTIONS
                ====================== */}

                <div className="buttonRow">

                  <button className="acceptBtn">

                    <FaCheckCircle />

                    Accept Delivery

                  </button>

                  <button className="detailsBtn">

                    <FaEye />

                    View Details

                  </button>

                </div>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default AssignedDeliveries;