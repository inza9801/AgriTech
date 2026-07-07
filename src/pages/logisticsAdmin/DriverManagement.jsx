import { useState } from "react";

import "./css/DriverManagement.css";

import {
    FaUsers,
    FaTruck,
    FaCheckCircle,
    FaClock,
    FaSearch
} from "react-icons/fa";

function DriverManagement() {

    const summary = [

        {
            icon: <FaUsers />,
            title: "Total Drivers",
            value: "18",
            className: "driverIcon"
        },

        {
            icon: <FaCheckCircle />,
            title: "Available",
            value: "9",
            className: "availableIcon"
        },

        {
            icon: <FaTruck />,
            title: "On Delivery",
            value: "7",
            className: "transitIcon"
        },

        {
            icon: <FaClock />,
            title: "Offline",
            value: "2",
            className: "offlineIcon"
        }

    ];

    const drivers = [

        {
            id: "DRV-201",
            name: "Abdul Karim",
            phone: "01711-123456",
            email: "abdul@gmail.com",
            vehicle: "Truck-205",
            license: "DL-458963",
            joined: "12 Jan 2024",
            deliveries: 145,
            completed: 141,
            pending: 4,
            success: "97%",
            earnings: "৳82,500",
            status: "Available"
        },

        {
            id: "DRV-202",
            name: "Hasan Ali",
            phone: "01811-987654",
            email: "hasan@gmail.com",
            vehicle: "Truck-112",
            license: "DL-784512",
            joined: "08 Mar 2023",
            deliveries: 132,
            completed: 126,
            pending: 6,
            success: "95%",
            earnings: "৳76,200",
            status: "Busy"
        },

        {
            id: "DRV-203",
            name: "Rahim Uddin",
            phone: "01922-654987",
            email: "rahim@gmail.com",
            vehicle: "Pickup-11",
            license: "DL-954621",
            joined: "20 Jun 2024",
            deliveries: 98,
            completed: 96,
            pending: 2,
            success: "98%",
            earnings: "৳63,900",
            status: "Available"
        },

        {
            id: "DRV-204",
            name: "Jamal Hossain",
            phone: "01655-741258",
            email: "jamal@gmail.com",
            vehicle: "Truck-301",
            license: "DL-125487",
            joined: "15 Oct 2022",
            deliveries: 166,
            completed: 160,
            pending: 6,
            success: "96%",
            earnings: "৳91,300",
            status: "Offline"
        }

    ];

    const [selectedDriver, setSelectedDriver] = useState(null);

    const getStatusClass = (status) => {
        if (status === "Available") return "availableStatus";
        if (status === "Busy") return "busyStatus";
        return "offlineStatus";
    };

    return (

        <div className="driverManagement">

            <div className="pageHeader">

                <h1>Driver Management</h1>

                <p>

                    Manage delivery drivers and monitor their performance.

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

            <div className="searchSection">

                <FaSearch />

                <input
                    type="text"
                    placeholder="Search driver..."
                />

            </div>

            <div className="driverSection">

                <h2>Driver List</h2>

                <div className="tableContainer">

                    <table>

                        <thead>

                            <tr>

                                <th>ID</th>

                                <th>Name</th>

                                <th>Phone</th>

                                <th>Vehicle</th>

                                <th>Deliveries</th>

                                <th>Earnings</th>

                                <th>Status</th>

                                <th>Action</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                drivers.map((driver, index) => (

                                    <tr key={index}>

                                        <td>{driver.id}</td>

                                        <td>{driver.name}</td>

                                        <td>{driver.phone}</td>

                                        <td>{driver.vehicle}</td>

                                        <td>{driver.deliveries}</td>

                                        <td>{driver.earnings}</td>

                                        <td>

                                            <span className={getStatusClass(driver.status)}>

                                                {driver.status}

                                            </span>

                                        </td>

                                        <td>

                                            <button
                                                className="detailsBtn"
                                                onClick={() => setSelectedDriver(driver)}
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

                selectedDriver && (

                    <div className="profileSection">

                        <h2>Driver Profile</h2>

                        <div className="profileGrid">

                            <div className="profileCard">

                                <div className="driverAvatar">

                                    {selectedDriver.name.charAt(0)}

                                </div>

                                <h3>{selectedDriver.name}</h3>

                                <p>{selectedDriver.id}</p>

                                <table>

                                    <tbody>

                                        <tr>

                                            <td>Phone</td>

                                            <td>{selectedDriver.phone}</td>

                                        </tr>

                                        <tr>

                                            <td>Email</td>

                                            <td>{selectedDriver.email}</td>

                                        </tr>

                                        <tr>

                                            <td>Vehicle</td>

                                            <td>{selectedDriver.vehicle}</td>

                                        </tr>

                                        <tr>

                                            <td>License</td>

                                            <td>{selectedDriver.license}</td>

                                        </tr>

                                        <tr>

                                            <td>Joined</td>

                                            <td>{selectedDriver.joined}</td>

                                        </tr>

                                        <tr>

                                            <td>Status</td>

                                            <td>

                                                <span className={getStatusClass(selectedDriver.status)}>

                                                    {selectedDriver.status}

                                                </span>

                                            </td>

                                        </tr>

                                    </tbody>

                                </table>

                            </div>

                            <div className="statsCard">

                                <h3>Driver Statistics</h3>

                                <div className="statsGrid">

                                    <div className="statBox">

                                        <h1>{selectedDriver.deliveries}</h1>

                                        <p>Total Deliveries</p>

                                    </div>

                                    <div className="statBox">

                                        <h1>{selectedDriver.completed}</h1>

                                        <p>Completed</p>

                                    </div>

                                    <div className="statBox">

                                        <h1>{selectedDriver.pending}</h1>

                                        <p>Pending</p>

                                    </div>

                                    <div className="statBox">

                                        <h1>{selectedDriver.success}</h1>

                                        <p>Success Rate</p>

                                    </div>

                                    <div className="statBox earnings">

                                        <h1>{selectedDriver.earnings}</h1>

                                        <p>Total Earnings</p>

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

export default DriverManagement;
