import { useState } from "react";

import "./css/DeliveryHistory.css";

import {
    FaTruck,
    FaCheckCircle,
    FaExclamationTriangle,
    FaMoneyBillWave
} from "react-icons/fa";

function DeliveryHistory() {

    const summary = [

        {
            icon: <FaTruck />,
            title: "Total Deliveries",
            value: "256",
            className: "deliveryIcon"
        },

        {
            icon: <FaCheckCircle />,
            title: "Completed",
            value: "241",
            className: "completedIcon"
        },

        {
            icon: <FaExclamationTriangle />,
            title: "Delayed",
            value: "15",
            className: "delayedIcon"
        },

        {
            icon: <FaMoneyBillWave />,
            title: "Revenue",
            value: "৳4.85M",
            className: "revenueIcon"
        }

    ];

    const deliveries = [

        {
            id: "DL-1001",
            shipment: "SH-1001",
            product: "Rice (2 Tons)",
            farmer: "Green Valley Farm",
            buyer: "Dhaka Agro Ltd.",
            driver: "Abdul Karim",
            date: "03 Jul 2026",
            amount: "৳18,000",
            status: "Delivered"
        },

        {
            id: "DL-1002",
            shipment: "SH-1002",
            product: "Potato (5 Tons)",
            farmer: "Golden Farm",
            buyer: "Fresh Mart",
            driver: "Hasan Ali",
            date: "02 Jul 2026",
            amount: "৳12,500",
            status: "Delayed"
        },

        {
            id: "DL-1003",
            shipment: "SH-1003",
            product: "Mango (1 Ton)",
            farmer: "Sunrise Orchard",
            buyer: "ABC Foods",
            driver: "Rahim Uddin",
            date: "02 Jul 2026",
            amount: "৳21,000",
            status: "Delivered"
        },

        {
            id: "DL-1004",
            shipment: "SH-1004",
            product: "Wheat (3 Tons)",
            farmer: "Modern Agro",
            buyer: "Food Processing Ltd.",
            driver: "Jamal Hossain",
            date: "01 Jul 2026",
            amount: "৳15,700",
            status: "Delivered"
        }

    ];

    const [selectedDelivery, setSelectedDelivery] = useState(null);

    return (

        <div className="deliveryHistory">

            <div className="pageHeader">

                <h1>Delivery History</h1>

                <p>

                    View completed deliveries and previous shipment records.

                </p>

            </div>

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

            <div className="deliverySection">

                <h2>Delivery Records</h2>

                <div className="tableContainer">

                    <table>

                        <thead>

                            <tr>

                                <th>Delivery ID</th>

                                <th>Shipment ID</th>

                                <th>Product</th>

                                <th>Farmer</th>

                                <th>Buyer</th>

                                <th>Driver</th>

                                <th>Date</th>

                                <th>Amount</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                deliveries.map((delivery, index) => (

                                    <tr key={index}>

                                        <td>{delivery.id}</td>

                                        <td>{delivery.shipment}</td>

                                        <td>{delivery.product}</td>

                                        <td>{delivery.farmer}</td>

                                        <td>{delivery.buyer}</td>

                                        <td>{delivery.driver}</td>

                                        <td>{delivery.date}</td>

                                        <td>{delivery.amount}</td>

                                        <td>

                                            <span
                                                className={
                                                    delivery.status === "Delivered"
                                                        ? "deliveredStatus"
                                                        : "delayedStatus"
                                                }
                                            >

                                                {delivery.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="detailsBtn"
                                                onClick={() => setSelectedDelivery(delivery)}
                                            >

                                                View Details

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>

            </div>

            {

                selectedDelivery && (

                    <div className="detailsSection">

                        <h2>

                            Delivery Details - {selectedDelivery.id}

                        </h2>

                        <div className="detailsGrid">

                            <div className="infoCard">

                                <h3>Delivery Information</h3>

                                <table>

                                    <tbody>

                                        <tr>

                                            <td>Delivery ID</td>

                                            <td>{selectedDelivery.id}</td>

                                        </tr>

                                        <tr>

                                            <td>Shipment ID</td>

                                            <td>{selectedDelivery.shipment}</td>

                                        </tr>

                                        <tr>

                                            <td>Product</td>

                                            <td>{selectedDelivery.product}</td>

                                        </tr>

                                        <tr>

                                            <td>Quantity</td>

                                            <td>2 Tons</td>

                                        </tr>

                                        <tr>

                                            <td>Farmer</td>

                                            <td>{selectedDelivery.farmer}</td>

                                        </tr>

                                        <tr>

                                            <td>Buyer</td>

                                            <td>{selectedDelivery.buyer}</td>

                                        </tr>

                                        <tr>

                                            <td>Driver</td>

                                            <td>{selectedDelivery.driver}</td>

                                        </tr>

                                        <tr>

                                            <td>Vehicle</td>

                                            <td>Truck-205</td>

                                        </tr>

                                        <tr>

                                            <td>Pickup</td>

                                            <td>Green Valley Farm</td>

                                        </tr>

                                        <tr>

                                            <td>Destination</td>

                                            <td>Dhaka Agro Ltd.</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            <div className="infoCard">

                                <h3>Payment Information</h3>

                                <table>

                                    <tbody>

                                        <tr>

                                            <td>Delivery Charge</td>

                                            <td>৳2,000</td>

                                        </tr>

                                        <tr>

                                            <td>Product Value</td>

                                            <td>{selectedDelivery.amount}</td>

                                        </tr>

                                        <tr>

                                            <td>Payment Method</td>

                                            <td>Escrow Payment</td>

                                        </tr>

                                        <tr>

                                            <td>Payment Status</td>

                                            <td>

                                                <span className="paidStatus">

                                                    Paid

                                                </span>

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                        </div>

                        <div className="timelineCard">

                            <h3>Delivery Timeline</h3>

                            <div className="deliveryTimeline">

                                <div className="timelineItem completedStep">✔ Order Confirmed</div>

                                <div className="timelineItem completedStep">✔ Driver Assigned</div>

                                <div className="timelineItem completedStep">✔ Picked Up</div>

                                <div className="timelineItem completedStep">✔ In Transit</div>

                                <div className="timelineItem completedStep">✔ Delivered</div>

                            </div>

                        </div>

                        <div className="summaryDetails">

                            <h3>Delivery Summary</h3>

                            <table>

                                <tbody>

                                    <tr>

                                        <td>Delivery Date</td>

                                        <td>{selectedDelivery.date}</td>

                                    </tr>

                                    <tr>

                                        <td>Delivered Time</td>

                                        <td>4:35 PM</td>

                                    </tr>

                                    <tr>

                                        <td>Total Distance</td>

                                        <td>74 km</td>

                                    </tr>

                                    <tr>

                                        <td>Delivery Duration</td>

                                        <td>3 Hours 25 Minutes</td>

                                    </tr>

                                    <tr>

                                        <td>Received By</td>

                                        <td>Warehouse Manager</td>

                                    </tr>

                                    <tr>

                                        <td>Final Status</td>

                                        <td>

                                            <span className="deliveredStatus">

                                                Delivered

                                            </span>

                                        </td>

                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default DeliveryHistory;
