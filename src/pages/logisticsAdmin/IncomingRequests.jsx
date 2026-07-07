import "./css/IncomingRequests.css";

function IncomingRequests() {

    const requests = [

        {
            id: "ORD-1023",
            farmer: "Green Valley Farm",
            buyer: "Dhaka Agro Traders",
            product: "Rice",
            quantity: "5 Tons",
            pickup: "Gazipur",
            delivery: "Dhaka",
            priority: "High",
            status: "Waiting Assignment"
        },

        {
            id: "ORD-1024",
            farmer: "Golden Harvest Farm",
            buyer: "Fresh Mart Ltd.",
            product: "Potato",
            quantity: "3 Tons",
            pickup: "Bogura",
            delivery: "Rajshahi",
            priority: "Medium",
            status: "Waiting Assignment"
        },

        {
            id: "ORD-1025",
            farmer: "Sunrise Agro",
            buyer: "ABC Food Industries",
            product: "Tomato",
            quantity: "2 Tons",
            pickup: "Cumilla",
            delivery: "Dhaka",
            priority: "Low",
            status: "Waiting Assignment"
        },

        {
            id: "ORD-1026",
            farmer: "Green Leaf Farm",
            buyer: "Metro Super Shop",
            product: "Onion",
            quantity: "4 Tons",
            pickup: "Faridpur",
            delivery: "Khulna",
            priority: "High",
            status: "Waiting Assignment"
        }

    ];

    return (

        <div className="incomingRequests">

            {/* ===========================
                PAGE HEADER
            =========================== */}

            <div className="pageHeader">

                <h1>Incoming Delivery Requests</h1>

                <p>

                    Orders accepted by farmers are waiting for driver assignment.

                </p>

            </div>

            {/* ===========================
                REQUEST TABLE
            =========================== */}

            <div className="requestSection">

                <h2>Pending Requests</h2>

                <div className="tableContainer">

                    <table>

                        <thead>

                            <tr>

                                <th>Order ID</th>

                                <th>Farmer</th>

                                <th>Buyer</th>

                                <th>Product</th>

                                <th>Quantity</th>

                                <th>Pickup</th>

                                <th>Delivery</th>

                                <th>Priority</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                requests.map((request, index) => (

                                    <tr key={index}>

                                        <td>{request.id}</td>

                                        <td>{request.farmer}</td>

                                        <td>{request.buyer}</td>

                                        <td>{request.product}</td>

                                        <td>{request.quantity}</td>

                                        <td>{request.pickup}</td>

                                        <td>{request.delivery}</td>

                                        <td>

                                            <span className={`priority ${request.priority.toLowerCase()}`}>

                                                {request.priority}

                                            </span>

                                        </td>

                                        <td>

                                            <span className="waitingStatus">

                                                {request.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button className="detailsBtn">

                                                View Details

                                            </button>

                                        </td>

                                    </tr>

                                ))

                            }

                        </tbody>

                    </table>

                </div>
                {/* ===========================
    REQUEST DETAILS
=========================== */}

                <div className="detailsSection">

                    <h2>Request Details</h2>

                    <div className="detailsGrid">

                        {/* Farmer Information */}

                        <div className="detailsCard">

                            <h3>Farmer Information</h3>

                            <table>

                                <tbody>

                                    <tr>
                                        <td>Farm Name</td>
                                        <td>Green Valley Farm</td>
                                    </tr>

                                    <tr>
                                        <td>Farmer</td>
                                        <td>Md. Hasan</td>
                                    </tr>

                                    <tr>
                                        <td>Phone</td>
                                        <td>01711-123456</td>
                                    </tr>

                                    <tr>
                                        <td>Pickup Location</td>
                                        <td>Gazipur, Dhaka</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        {/* Buyer Information */}

                        <div className="detailsCard">

                            <h3>Buyer Information</h3>

                            <table>

                                <tbody>

                                    <tr>
                                        <td>Company</td>
                                        <td>Dhaka Agro Traders</td>
                                    </tr>

                                    <tr>
                                        <td>Contact</td>
                                        <td>01855-654321</td>
                                    </tr>

                                    <tr>
                                        <td>Delivery Address</td>
                                        <td>Tejgaon Industrial Area</td>
                                    </tr>

                                    <tr>
                                        <td>Requested Date</td>
                                        <td>06 July 2026</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        {/* Product Information */}

                        <div className="detailsCard">

                            <h3>Product Details</h3>

                            <table>

                                <tbody>

                                    <tr>
                                        <td>Product</td>
                                        <td>Premium Rice</td>
                                    </tr>

                                    <tr>
                                        <td>Quantity</td>
                                        <td>5 Tons</td>
                                    </tr>

                                    <tr>
                                        <td>Packaging</td>
                                        <td>50 kg Bags</td>
                                    </tr>

                                    <tr>
                                        <td>Estimated Weight</td>
                                        <td>5000 kg</td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                        {/* Delivery Information */}

                        <div className="detailsCard">

                            <h3>Delivery Information</h3>

                            <table>

                                <tbody>

                                    <tr>
                                        <td>Priority</td>
                                        <td>

                                            <span className="priority high">

                                                High

                                            </span>

                                        </td>
                                    </tr>

                                    <tr>
                                        <td>Estimated Distance</td>
                                        <td>42 km</td>
                                    </tr>

                                    <tr>
                                        <td>Vehicle Type</td>
                                        <td>Medium Truck</td>
                                    </tr>

                                    <tr>
                                        <td>Status</td>
                                        <td>

                                            <span className="waitingStatus">

                                                Waiting Assignment

                                            </span>

                                        </td>
                                    </tr>

                                </tbody>

                            </table>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    );

}

export default IncomingRequests;