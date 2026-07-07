import { useState } from "react";

import "./css/ShipmentMonitoring.css";

import {
    FaTruck,
    FaBoxOpen,
    FaShippingFast,
    FaCheckCircle
} from "react-icons/fa";

function ShipmentMonitoring() {

    const summary = [

        {
            icon: <FaTruck />,
            title: "Active Shipments",
            value: "18",
            className: "activeIcon"
        },

        {
            icon: <FaBoxOpen />,
            title: "Pending Pickup",
            value: "5",
            className: "pickupIcon"
        },

        {
            icon: <FaShippingFast />,
            title: "In Transit",
            value: "9",
            className: "transitIcon"
        },

        {
            icon: <FaCheckCircle />,
            title: "Delivered Today",
            value: "4",
            className: "deliveredIcon"
        }

    ];

    const shipments = [

        {
            id: "SH-1001",
            product: "Rice (2 Tons)",
            farmer: "Green Valley Farm",
            buyer: "Dhaka Agro Ltd.",
            driver: "Abdul Karim",
            vehicle: "Truck-205",
            status: "In Transit"
        },

        {
            id: "SH-1002",
            product: "Potato (5 Tons)",
            farmer: "Golden Farm",
            buyer: "Fresh Mart",
            driver: "Hasan Ali",
            vehicle: "Truck-112",
            status: "Pending Pickup"
        },

        {
            id: "SH-1003",
            product: "Mango (1 Ton)",
            farmer: "Sunrise Orchard",
            buyer: "ABC Foods",
            driver: "Rahim Uddin",
            vehicle: "Pickup-11",
            status: "Delivered"
        },

        {
            id: "SH-1004",
            product: "Wheat (3 Tons)",
            farmer: "Modern Agro",
            buyer: "Food Processing Ltd.",
            driver: "Jamal Hossain",
            vehicle: "Truck-301",
            status: "In Transit"
        }

    ];

    const [selectedShipment, setSelectedShipment] = useState(null);

    const getStatusClass = (status) => {
        if (status === "Pending Pickup") return "pendingStatus";
        if (status === "In Transit") return "transitStatus";
        return "deliveredStatus";
    };

    return (

        <div className="shipmentMonitoring">

            <div className="pageHeader">

                <h1>Shipment Monitoring</h1>

                <p>

                    Track all active shipments and monitor delivery progress.

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

            <div className="shipmentSection">

                <h2>Active Shipments</h2>

                <div className="tableContainer">

                    <table>

                        <thead>

                            <tr>

                                <th>Shipment ID</th>

                                <th>Product</th>

                                <th>Farmer</th>

                                <th>Buyer</th>

                                <th>Assigned Driver</th>

                                <th>Vehicle</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                shipments.map((shipment, index) => (

                                    <tr key={index}>

                                        <td>{shipment.id}</td>

                                        <td>{shipment.product}</td>

                                        <td>{shipment.farmer}</td>

                                        <td>{shipment.buyer}</td>

                                        <td>{shipment.driver}</td>

                                        <td>{shipment.vehicle}</td>

                                        <td>

                                            <span className={getStatusClass(shipment.status)}>

                                                {shipment.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="timelineBtn"
                                                onClick={() => setSelectedShipment(shipment)}
                                            >

                                                View Timeline

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

                selectedShipment && (

                    <div className="timelineSection">

                        <h2>

                            Shipment Timeline - {selectedShipment.id}

                        </h2>

                        <div className="timelineGrid">

                            <div className="timelineCard">

                                <h3>Shipment Information</h3>

                                <table>

                                    <tbody>

                                        <tr>

                                            <td>Product</td>

                                            <td>{selectedShipment.product}</td>

                                        </tr>

                                        <tr>

                                            <td>Farmer</td>

                                            <td>{selectedShipment.farmer}</td>

                                        </tr>

                                        <tr>

                                            <td>Buyer</td>

                                            <td>{selectedShipment.buyer}</td>

                                        </tr>

                                        <tr>

                                            <td>Assigned Driver</td>

                                            <td>{selectedShipment.driver}</td>

                                        </tr>

                                        <tr>

                                            <td>Vehicle</td>

                                            <td>{selectedShipment.vehicle}</td>

                                        </tr>

                                        <tr>

                                            <td>Pickup</td>

                                            <td>Green Valley Farm</td>

                                        </tr>

                                        <tr>

                                            <td>Destination</td>

                                            <td>Dhaka Agro Ltd.</td>

                                        </tr>

                                        <tr>

                                            <td>Estimated Arrival</td>

                                            <td>05:30 PM</td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            <div className="timelineCard">

                                <h3>Delivery Progress</h3>

                                <div className="shipmentTimeline">

                                    <div className="timelineItem completedStep">

                                        ✔ Order Confirmed

                                        <span>08:00 AM</span>

                                    </div>

                                    <div className="timelineItem completedStep">

                                        ✔ Driver Assigned

                                        <span>08:15 AM</span>

                                    </div>

                                    <div className="timelineItem completedStep">

                                        ✔ Pickup Completed

                                        <span>09:10 AM</span>

                                    </div>

                                    <div className="timelineItem activeStep">

                                        🚚 In Transit

                                        <span>Current</span>

                                    </div>

                                    <div className="timelineItem">

                                        ○ Arrived at Buyer

                                    </div>

                                    <div className="timelineItem">

                                        ○ Delivered

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                )

            }

        </div>

    );

}

export default ShipmentMonitoring;
