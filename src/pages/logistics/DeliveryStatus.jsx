import "./css/DeliveryStatus.css";

import {
  FaTruck,
  FaBoxOpen,
  FaCheckCircle,
  FaExclamationTriangle,
  FaArrowDown,
  FaMapMarkerAlt,
  FaEdit,
  FaClipboardCheck
} from "react-icons/fa";

function DeliveryStatus() {

  const summary = [

    {
      icon: <FaBoxOpen />,
      title: "Assigned",
      value: "12",
      className: "assignedIcon"
    },

    {
      icon: <FaTruck />,
      title: "In Transit",
      value: "5",
      className: "transitIcon"
    },

    {
      icon: <FaCheckCircle />,
      title: "Delivered",
      value: "18",
      className: "completedIcon"
    },

    {
      icon: <FaExclamationTriangle />,
      title: "Delayed",
      value: "2",
      className: "delayIcon"
    }

  ];

  const deliveries = [

    {
      id:"ORD-1024",

      farmer:"Green Valley Farm",

      buyer:"Dhaka Agro Traders",

      crop:"Rice",

      quantity:"2 Tons",

      status:"In Transit",

      timeline:[
        {
          title:"Assigned",
          complete:true
        },

        {
          title:"Picked Up",
          complete:true
        },

        {
          title:"In Transit",
          active:true
        },

        {
          title:"Delivered"
        }

      ]
    },

    {
      id:"ORD-1025",

      farmer:"Golden Farm",

      buyer:"Fresh Foods Ltd.",

      crop:"Potato",

      quantity:"5 Tons",

      status:"Delivered",

      timeline:[

        {
          title:"Assigned",
          complete:true
        },

        {
          title:"Picked Up",
          complete:true
        },

        {
          title:"In Transit",
          complete:true
        },

        {
          title:"Delivered",
          complete:true
        }

      ]
    },

    {
      id:"ORD-1026",

      farmer:"Sunrise Farm",

      buyer:"Square Food Processing",

      crop:"Maize",

      quantity:"3 Tons",

      status:"Delayed",

      timeline:[

        {
          title:"Assigned",
          complete:true
        },

        {
          title:"Picked Up",
          complete:true
        },

        {
          title:"Delayed",
          active:true
        },

        {
          title:"Delivered"
        }

      ]
    }

  ];

  return(

    <div className="deliveryStatusContainer">

      {/* ===========================
            PAGE HEADER
      =========================== */}

      <div className="pageHeader">

        <h1>Delivery Status</h1>

        <p>

          Monitor shipment progress and update delivery status.

        </p>

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

              <div
                className={`summaryIcon ${item.className}`}
              >

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
            DELIVERY STATUS
      =========================== */}

      <div className="statusSection">

        <div className="sectionTitle">

          <h2>

            <FaClipboardCheck/>

            Shipment Progress

          </h2>

        </div>

        <div className="statusGrid">

          {

            deliveries.map((delivery)=>(

              <div
                className="statusCard"
                key={delivery.id}
              >

                {/* HEADER */}

                <div className="cardHeader">

                  <div>

                    <h3>{delivery.id}</h3>

                    <p>

                      {delivery.crop}

                      •

                      {delivery.quantity}

                    </p>

                  </div>

                  <span className="statusBadge">

                    {delivery.status}

                  </span>

                </div>

                {/* ROUTE */}

                <div className="routeBox">

                  <div className="location">

                    <FaMapMarkerAlt/>

                    <div>

                      <strong>Pickup</strong>

                      <p>{delivery.farmer}</p>

                    </div>

                  </div>

                  <div className="arrow">

                    <FaArrowDown/>

                  </div>

                  <div className="location">

                    <FaMapMarkerAlt/>

                    <div>

                      <strong>Drop</strong>

                      <p>{delivery.buyer}</p>

                    </div>

                  </div>

                </div>

                {/* TIMELINE */}

                <div className="timeline">

                  {

                    delivery.timeline.map((step,index)=>(

                      <div
                        key={index}
                        className={

                          step.complete
                          ?
                          "timelineItem completed"

                          :

                          step.active

                          ?

                          "timelineItem active"

                          :

                          "timelineItem"

                        }

                      >

                        {step.complete ? "✓" : step.active ? "🚚" : "○"}

                        <span>

                          {step.title}

                        </span>

                      </div>

                    ))

                  }

                </div>

                {/* ACTION */}

                <button className="updateBtn">

                  <FaEdit/>

                  Update Status

                </button>

              </div>

            ))

          }

        </div>

      </div>

    </div>

  );

}

export default DeliveryStatus;