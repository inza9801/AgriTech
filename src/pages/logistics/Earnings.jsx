import "./css/Earnings.css";

import {
  FaMoneyBillWave,
  FaTruck,
  FaWallet
} from "react-icons/fa";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from "recharts";

function Earnings() {

  const summary = [

    {
      icon:<FaMoneyBillWave />,
      title:"Today's Earnings",
      value:"৳4,850",
      className:"todayIcon"
    },

    {
      icon:<FaWallet />,
      title:"Weekly Earnings",
      value:"৳28,400",
      className:"weekIcon"
    },

    {
      icon:<FaMoneyBillWave />,
      title:"Monthly Earnings",
      value:"৳1,18,250",
      className:"monthIcon"
    },

    {
      icon:<FaTruck />,
      title:"Completed Trips",
      value:"62",
      className:"tripIcon"
    }

  ];

  const tripHistory = [

    {
      id:"TRP-101",

      order:"ORD-1024",

      pickup:"Green Valley Farm",

      drop:"Dhaka Agro Traders",

      distance:"48 km",

      payment:"৳1,850",

      date:"03 Jul 2026",

      status:"Paid"
    },

    {
      id:"TRP-102",

      order:"ORD-1025",

      pickup:"Golden Farm",

      drop:"Fresh Foods Ltd.",

      distance:"62 km",

      payment:"৳2,100",

      date:"03 Jul 2026",

      status:"Paid"
    },

    {
      id:"TRP-103",

      order:"ORD-1026",

      pickup:"Sunrise Farm",

      drop:"Square Food Processing",

      distance:"75 km",

      payment:"৳2,650",

      date:"02 Jul 2026",

      status:"Pending"
    },

    {
      id:"TRP-104",

      order:"ORD-1027",

      pickup:"Fresh Agro Farm",

      drop:"ACI Foods",

      distance:"58 km",

      payment:"৳1,900",

      date:"02 Jul 2026",

      status:"Paid"
    }

  ];

  const chartData = [

    {
      day:"Mon",
      earnings:4200
    },

    {
      day:"Tue",
      earnings:5300
    },

    {
      day:"Wed",
      earnings:4700
    },

    {
      day:"Thu",
      earnings:6100
    },

    {
      day:"Fri",
      earnings:4850
    },

    {
      day:"Sat",
      earnings:5600
    },

    {
      day:"Sun",
      earnings:3600
    }

  ];

  return(

    <div className="earningsContainer">

      {/* ===========================
            PAGE HEADER
      =========================== */}

      <div className="pageHeader">

        <h1>Earnings</h1>

        <p>

          Track your delivery income and completed trip payments.

        </p>

      </div>

      {/* ===========================
            SUMMARY CARDS
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
            TRIP HISTORY
      =========================== */}

      <div className="tripSection">

        <div className="sectionTitle">

          <h2>Trip Payment History</h2>

        </div>

        <div className="tableContainer">

          <table>

            <thead>

              <tr>

                <th>Trip ID</th>

                <th>Order</th>

                <th>Pickup</th>

                <th>Drop</th>

                <th>Distance</th>

                <th>Payment</th>

                <th>Date</th>

                <th>Status</th>

              </tr>

            </thead>

            <tbody>

              {

                tripHistory.map((trip)=>(

                  <tr
                    key={trip.id}
                  >

                    <td>{trip.id}</td>

                    <td>{trip.order}</td>

                    <td>{trip.pickup}</td>

                    <td>{trip.drop}</td>

                    <td>{trip.distance}</td>

                    <td>{trip.payment}</td>

                    <td>{trip.date}</td>

                    <td>

                      <span
                        className={
                          trip.status==="Paid"
                          ?
                          "paidStatus"
                          :
                          "pendingStatus"
                        }
                      >

                        {trip.status}

                      </span>

                    </td>

                  </tr>

                ))

              }

            </tbody>

          </table>

        </div>

      </div>

      {/* ===========================
            WEEKLY EARNINGS
      =========================== */}

      <div className="chartSection">

        <div className="sectionTitle">

          <h2>Weekly Earnings</h2>

        </div>

        <div className="chartCard">

          <ResponsiveContainer
            width="100%"
            height={400}
          >

            <BarChart
              data={chartData}
            >

              <CartesianGrid strokeDasharray="3 3"/>

              <XAxis dataKey="day"/>

              <YAxis/>

              <Tooltip/>

              <Bar
                dataKey="earnings"
                fill="#2E7D32"
                radius={[6,6,0,0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>

    </div>

  );

}

export default Earnings;