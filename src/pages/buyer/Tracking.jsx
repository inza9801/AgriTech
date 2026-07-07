import "./css/Tracking.css";

const Tracking = () => {

    const timeline = [
        { time: "09:15 AM", title: "Order Confirmed", desc: "Your order has been confirmed by the farmer." },
        { time: "11:40 AM", title: "Package Prepared", desc: "Products have been packed for shipment." },
        { time: "02:00 PM", title: "Picked Up", desc: "Shipment has been collected by the logistics team." },
        { time: "05:15 PM", title: "In Transit", desc: "Shipment is on the way to the destination." }
    ];

    return (
        <div className="trackingPage">

            <h1>Shipment Tracking</h1>

            <div className="progressSection">

                <div className="progressItem active">
                    <div className="circle">✓</div>
                    <p>Confirmed</p>
                </div>

                <div className="line active"></div>

                <div className="progressItem active">
                    <div className="circle">✓</div>
                    <p>Packed</p>
                </div>

                <div className="line active"></div>

                <div className="progressItem active">
                    <div className="circle">✓</div>
                    <p>Picked Up</p>
                </div>

                <div className="line"></div>

                <div className="progressItem">
                    <div className="circle">4</div>
                    <p>In Transit</p>
                </div>

                <div className="line"></div>

                <div className="progressItem">
                    <div className="circle">5</div>
                    <p>Delivered</p>
                </div>

            </div>

            <div className="trackingCards">

                <div className="trackCard">
                    <h3>Tracking ID</h3>
                    <p>TRK-78451236</p>
                </div>

                <div className="trackCard">
                    <h3>Current Location</h3>
                    <p>Tangail Distribution Hub</p>
                </div>

                <div className="trackCard">
                    <h3>Estimated Arrival</h3>
                    <p>05 July 2026, 3:30 PM</p>
                </div>

                <div className="trackCard">
                    <h3>Distance Remaining</h3>
                    <p>42 km</p>
                </div>

            </div>

            <div className="driverSection">

                <h2>Logistics Information</h2>

                <table>
                    <tbody>
                        <tr><td>Driver</td><td>Md. Rahim</td></tr>
                        <tr><td>Phone</td><td>01712-345678</td></tr>
                        <tr><td>Vehicle</td><td>Medium Truck</td></tr>
                        <tr><td>Vehicle No.</td><td>DHK-MT-2345</td></tr>
                    </tbody>
                </table>

            </div>

            <div className="mapSection">

                <h2>Shipment Route</h2>

                <div className="mapPlaceholder">
                    📍 Live Map Integration
                </div>

            </div>

            <div className="timelineSection">

                <h2>Shipment Timeline</h2>

                {timeline.map((item, index) => (
                    <div className="timelineItem" key={index}>

                        <div className="timelineDot"></div>

                        <div>
                            <h4>{item.title}</h4>
                            <small>{item.time}</small>
                            <p>{item.desc}</p>
                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
};

export default Tracking;