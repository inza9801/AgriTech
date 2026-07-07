import "./css/AssignedOrders.css";

import {
    FaClipboardCheck,
    FaTruck,
    FaCheckCircle,
    FaExclamationTriangle
} from "react-icons/fa";

function AssignedOrders() {

    const orders = [

        {
            id: "ORD-1023",
            farmer: "Green Valley Farm",
            buyer: "Dhaka Agro Traders",
            driver: "Abdul Karim",
            vehicle: "Truck-205",
            product: "Rice",
            quantity: "5 Tons",
            assigned: "06 Jul 2026",
            status: "In Transit"
        },

        {
            id: "ORD-1024",
            farmer: "Golden Harvest Farm",
            buyer: "Fresh Mart Ltd.",
            driver: "Hasan Ali",
            vehicle: "Truck-112",
            product: "Potato",
            quantity: "3 Tons",
            assigned: "06 Jul 2026",
            status: "Pickup Scheduled"
        },

        {
            id: "ORD-1025",
            farmer: "Sunrise Agro",
            buyer: "ABC Food Industries",
            driver: "Rahim Uddin",
            vehicle: "Pickup-11",
            product: "Tomato",
            quantity: "2 Tons",
            assigned: "05 Jul 2026",
            status: "Delivered"
        },

        {
            id: "ORD-1026",
            farmer: "Green Leaf Farm",
            buyer: "Metro Super Shop",
            driver: "Jamal Hossain",
            vehicle: "Truck-301",
            product: "Onion",
            quantity: "4 Tons",
            assigned: "05 Jul 2026",
            status: "Delayed"
        }

    ];

    const summary = [

        {
            icon: <FaClipboardCheck />,
            title: "Assigned Today",
            value: "18",
            className: "assignedIcon"
        },

        {
            icon: <FaTruck />,
            title: "In Transit",
            value: "9",
            className: "transitIcon"
        },

        {
            icon: <FaCheckCircle />,
            title: "Delivered Today",
            value: "12",
            className: "deliveredIcon"
        },

        {
            icon: <FaExclamationTriangle />,
            title: "Delayed",
            value: "2",
            className: "delayedIcon"
        }

    ];

    return (

        <div className="assignedOrders">

            {/* ===========================
                PAGE HEADER
            =========================== */}

            <div className="pageHeader">

                <h1>Assigned Orders</h1>

                <p>

                    Monitor deliveries that have already been assigned to drivers.

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
                ASSIGNED TABLE
            =========================== */}

            <div className="ordersSection">

                <h2>Assigned Delivery Orders</h2>

                <div className="tableContainer">

                    <table>

                        <thead>

                            <tr>

                                <th>Order ID</th>

                                <th>Farmer</th>

                                <th>Buyer</th>

                                <th>Driver</th>

                                <th>Vehicle</th>

                                <th>Product</th>

                                <th>Qty</th>

                                <th>Assigned</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                orders.map((order, index) => (

                                    <tr key={index}>

                                        <td>{order.id}</td>

                                        <td>{order.farmer}</td>

                                        <td>{order.buyer}</td>

                                        <td>{order.driver}</td>

                                        <td>{order.vehicle}</td>

                                        <td>{order.product}</td>

                                        <td>{order.quantity}</td>

                                        <td>{order.assigned}</td>

                                        <td>

                                            <span className={

                                                order.status === "Delivered"

                                                    ? "deliveredStatus"

                                                    : order.status === "Delayed"

                                                        ? "delayedStatus"

                                                        : order.status === "In Transit"

                                                            ? "transitStatus"

                                                            : "pickupStatus"

                                            }>

                                                {order.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button className="detailsBtn">

                                                View

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>
            {/* ===========================
    RECENT ASSIGNMENT ACTIVITY
=========================== */}

            <div className="activitySection">

                <h2>Recent Assignment Activity</h2>

                <div className="activityTimeline">

                    <div className="activityItem">

                        <div className="activityDot"></div>

                        <div className="activityContent">

                            <h4>Driver Assigned</h4>

                            <p>

                                <strong>ORD-1023</strong> assigned to
                                <strong> Abdul Karim </strong>
                                using <strong>Truck-205</strong>.

                            </p>

                            <span>10 minutes ago</span>

                        </div>

                    </div>

                    <div className="activityItem">

                        <div className="activityDot active"></div>

                        <div className="activityContent">

                            <h4>Pickup Completed</h4>

                            <p>

                                Driver
                                <strong> Hasan Ali </strong>
                                collected potatoes from
                                <strong> Golden Harvest Farm</strong>.

                            </p>

                            <span>35 minutes ago</span>

                        </div>

                    </div>

                    <div className="activityItem">

                        <div className="activityDot delivered"></div>

                        <div className="activityContent">

                            <h4>Delivery Completed</h4>

                            <p>

                                <strong>ORD-1025</strong>
                                delivered successfully to
                                <strong> ABC Food Industries</strong>.

                            </p>

                            <span>1 hour ago</span>

                        </div>

                    </div>

                    <div className="activityItem">

                        <div className="activityDot delayed"></div>

                        <div className="activityContent">

                            <h4>Delivery Delayed</h4>

                            <p>

                                <strong>ORD-1026</strong>
                                delayed due to heavy traffic.
                                Estimated delay:
                                <strong> 45 minutes</strong>.

                            </p>

                            <span>2 hours ago</span>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AssignedOrders;