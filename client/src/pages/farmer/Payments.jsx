import { useEffect, useState } from "react";
import {
  getPaymentsSummary,
  getPendingPayments,
  getTransactions,
  getMonthlyPayments,
} from "../../api/farmerService";
import "./css/Payments.css";
import { FaCalendarAlt, FaCheckCircle } from "react-icons/fa";

const formatTaka = (amount) => `৳${Number(amount || 0).toLocaleString("en-BD")}`;

const formatDate = (dateStr) => {
  if (!dateStr) return "-";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const statusClass = (status) => {
  if (status === "Delivered") return "completedStatus";
  if (status === "Cancelled") return "cancelledStatus";
  if (status === "Pending") return "pendingStatus";
  return "processingStatus"; // Confirmed / Processing / Shipped
};

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function Payments() {
  const [summary, setSummary] = useState({
    totalEarnings: 0,
    pendingAmount: 0,
    thisMonthEarnings: 0,
    todayEarnings: 0,
  });
  const [pendingOrders, setPendingOrders] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const now = new Date();
  const [selectedYear, setSelectedYear] = useState(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(now.getMonth() + 1);
  const [monthlyData, setMonthlyData] = useState({ orders: [], earnings: 0, pending: 0 });
  const [monthlyLoading, setMonthlyLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [summaryRes, pendingRes, txnRes] = await Promise.all([
          getPaymentsSummary(),
          getPendingPayments(),
          getTransactions(),
        ]);
        setSummary(summaryRes.data.data);
        setPendingOrders(pendingRes.data.data);
        setTransactions(txnRes.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load payments data");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  useEffect(() => {
    const loadMonth = async () => {
      try {
        setMonthlyLoading(true);
        const res = await getMonthlyPayments(selectedYear, selectedMonth);
        setMonthlyData(res.data.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load monthly data");
      } finally {
        setMonthlyLoading(false);
      }
    };
    loadMonth();
  }, [selectedYear, selectedMonth]);

  const yearOptions = Array.from({ length: 5 }, (_, i) => now.getFullYear() - i);

  return (
    <div className="paymentsContainer">
      <div className="pageHeader">
        <h1>Payments</h1>
        <p>
          Monitor earnings, pending payments, and transaction history from your
          marketplace sales.
        </p>
      </div>

      {error && <p className="errorText">{error}</p>}

      {/* ===========================
                EARNINGS SUMMARY
            =========================== */}
      <div className="summaryGrid">
        <div className="summaryCard">
          <div className="summaryIcon pendingIcon">⏳</div>
          <div>
            <h2>{loading ? "..." : formatTaka(summary.pendingAmount)}</h2>
            <p>Pending Payments</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon monthIcon"><FaCalendarAlt /></div>
          <div>
            <h2>{loading ? "..." : formatTaka(summary.thisMonthEarnings)}</h2>
            <p>This Month's Earnings</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon receivedIcon"><FaCheckCircle /></div>
          <div>
            <h2>{loading ? "..." : formatTaka(summary.todayEarnings)}</h2>
            <p>Today's Earnings</p>
          </div>
        </div>
      </div>

      {/* ===========================
    PENDING PAYMENTS
=========================== */}
      <div className="paymentsSection">
        <div className="sectionTitle">
          <h2>Pending Payments</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Quantity (tons)</th>
                <th>Amount</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : pendingOrders.length === 0 ? (
                <tr>
                  <td colSpan="7">No pending payments.</td>
                </tr>
              ) : (
                pendingOrders.map((o) => (
                  <tr key={o.order_id}>
                    <td>{o.order_unique_id}</td>
                    <td>{o.buyer_name}</td>
                    <td>{o.crop_name}</td>
                    <td>{o.quantity_tons}</td>
                    <td>{formatTaka(o.total_price)}</td>
                    <td>{formatDate(o.created_at)}</td>
                    <td>
                      <span className={statusClass(o.order_status)}>{o.order_status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    MONTHLY BREAKDOWN
=========================== */}
      <div className="paymentsSection">
        <div className="sectionTitle monthSelectorRow">
          <h2>Monthly Breakdown</h2>
          <div className="monthSelector">
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(Number(e.target.value))}
            >
              {MONTH_NAMES.map((name, idx) => (
                <option key={name} value={idx + 1}>
                  {name}
                </option>
              ))}
            </select>
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(Number(e.target.value))}
            >
              {yearOptions.map((y) => (
                <option key={y} value={y}>
                  {y}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="summaryGrid monthlySummaryGrid">
          <div className="summaryCard">
            <div className="summaryIcon receivedIcon"><FaCheckCircle /></div>
            <div>
              <h2>{monthlyLoading ? "..." : formatTaka(monthlyData.earnings)}</h2>
              <p>Earned in {MONTH_NAMES[selectedMonth - 1]} {selectedYear}</p>
            </div>
          </div>
          <div className="summaryCard">
            <div className="summaryIcon pendingIcon">⏳</div>
            <div>
              <h2>{monthlyLoading ? "..." : formatTaka(monthlyData.pending)}</h2>
              <p>Pending in {MONTH_NAMES[selectedMonth - 1]} {selectedYear}</p>
            </div>
          </div>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Quantity (tons)</th>
                <th>Amount</th>
                <th>Order Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {monthlyLoading ? (
                <tr>
                  <td colSpan="7">Loading...</td>
                </tr>
              ) : monthlyData.orders.length === 0 ? (
                <tr>
                  <td colSpan="7">No orders for this month.</td>
                </tr>
              ) : (
                monthlyData.orders.map((o) => (
                  <tr key={o.order_id}>
                    <td>{o.order_unique_id}</td>
                    <td>{o.buyer_name}</td>
                    <td>{o.crop_name}</td>
                    <td>{o.quantity_tons}</td>
                    <td>{formatTaka(o.total_price)}</td>
                    <td>{formatDate(o.created_at)}</td>
                    <td>
                      <span className={statusClass(o.order_status)}>{o.order_status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===========================
    RECENT TRANSACTIONS
=========================== */}
      <div className="transactionsSection">
        <div className="sectionTitle">
          <h2>Recent Transactions</h2>
        </div>

        <div className="tableContainer">
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Buyer</th>
                <th>Crop</th>
                <th>Amount</th>
                <th>Delivered On</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading...</td>
                </tr>
              ) : transactions.length === 0 ? (
                <tr>
                  <td colSpan="6">No transactions yet.</td>
                </tr>
              ) : (
                transactions.map((t) => (
                  <tr key={t.order_id}>
                    <td>{t.order_unique_id}</td>
                    <td>{t.buyer_name}</td>
                    <td>{t.crop_name}</td>
                    <td>{formatTaka(t.total_price)}</td>
                    <td>{formatDate(t.created_at)}</td>
                    <td>
                      <span className={statusClass(t.order_status)}>{t.order_status}</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;