import "./css/Payments.css";

function Payments() {
  return (
    <div className="paymentsContainer">
      <div className="pageHeader">
        <h1>Payments</h1>

        <p>
          Monitor earnings, pending payments, and transaction history from your
          marketplace sales.
        </p>
      </div>

      {/* ===========================
                EARNINGS SUMMARY
            =========================== */}

      <div className="summaryGrid">
        <div className="summaryCard">
          <div className="summaryIcon">💰</div>

          <div>
            <h2>৳12.45L</h2>

            <p>Total Earnings</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon pendingIcon">⏳</div>

          <div>
            <h2>৳1.28L</h2>

            <p>Pending Payments</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon receivedIcon">✅</div>

          <div>
            <h2>৳11.17L</h2>

            <p>Received Payments</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon monthIcon">📅</div>

          <div>
            <h2>৳2.84L</h2>

            <p>This Month</p>
          </div>
        </div>

        <div className="summaryCard">
          <div className="summaryIcon averageIcon">📊</div>

          <div>
            <h2>৳48.5K</h2>

            <p>Avg. Order Value</p>
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
                <th>Payment ID</th>
                <th>Buyer</th>
                <th>Order ID</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>PAY001</td>
                <td>Dhaka Agro Traders</td>
                <td>ORD018</td>
                <td>৳65,000</td>
                <td>15 Jul 2026</td>
                <td>Bank Transfer</td>

                <td>
                  <span className="pendingStatus">Pending</span>
                </td>
              </tr>

              <tr>
                <td>PAY002</td>
                <td>Green Valley Foods</td>
                <td>ORD020</td>
                <td>৳42,500</td>
                <td>17 Jul 2026</td>
                <td>Mobile Banking</td>

                <td>
                  <span className="processingStatus">Processing</span>
                </td>
              </tr>

              <tr>
                <td>PAY003</td>
                <td>Fresh Mart</td>
                <td>ORD021</td>
                <td>৳20,500</td>
                <td>18 Jul 2026</td>
                <td>Card</td>

                <td>
                  <span className="pendingStatus">Pending</span>
                </td>
              </tr>
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
                <th>Transaction ID</th>
                <th>Buyer</th>
                <th>Amount</th>
                <th>Method</th>
                <th>Payment Date</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>TXN001</td>
                <td>Agro Foods Ltd.</td>
                <td>৳106,000</td>
                <td>Bank Transfer</td>
                <td>10 Jul 2026</td>

                <td>
                  <span className="completedStatus">Completed</span>
                </td>
              </tr>

              <tr>
                <td>TXN002</td>
                <td>Fresh Mart</td>
                <td>৳82,000</td>
                <td>Mobile Banking</td>
                <td>09 Jul 2026</td>

                <td>
                  <span className="completedStatus">Completed</span>
                </td>
              </tr>

              <tr>
                <td>TXN003</td>
                <td>Green Valley Foods</td>
                <td>৳171,000</td>
                <td>Card</td>
                <td>08 Jul 2026</td>

                <td>
                  <span className="completedStatus">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Payments;
