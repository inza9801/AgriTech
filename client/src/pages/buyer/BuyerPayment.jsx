import { useState } from "react";
import "./css/BuyerPayment.css";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../hooks/useToast";

const DELIVERY_CHARGE = 250;
const TAX = 150;

const PAYMENT_METHODS = [
  "Credit Card",
  "Debit Card",
  "Mobile Banking",
  "Bank Transfer",
  "Cash On Delivery",
];

const BuyerPayment = () => {
  const { cartTotal } = useCart();
  const showToast = useToast();
  const [method, setMethod] = useState(PAYMENT_METHODS[0]);
  const [paying, setPaying] = useState(false);
  const [paid, setPaid] = useState(false);

  const total = cartTotal + DELIVERY_CHARGE + TAX;

  const handlePayNow = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaid(true);
      showToast("Payment confirmed and funds placed in escrow.", "success");
      setTimeout(() => setPaid(false), 2200);
    }, 1200);
  };

  return (
    <div className="buyerPayment">
      <div className="pageHeader">
        <h1 className="pageTitle">Payment</h1>
        <p className="pageSubtitle">Complete checkout securely with escrow protection.</p>
      </div>

      <div className="paymentGrid">
        <div className="orderSummary commonCard">
          <h2>Order Summary</h2>
          <table>
            <tbody>
              <tr>
                <td>Products</td>
                <td>৳{cartTotal}</td>
              </tr>
              <tr>
                <td>Delivery Charge</td>
                <td>৳{DELIVERY_CHARGE}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>৳{TAX}</td>
              </tr>
              <tr className="totalRow">
                <td>Total</td>
                <td>৳{total}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="paymentMethods commonCard">
          <h2>Payment Method</h2>
          {PAYMENT_METHODS.map((option) => (
            <label className="paymentOption" key={option}>
              <input
                type="radio"
                name="payment"
                checked={method === option}
                onChange={() => setMethod(option)}
              />
              {option}
            </label>
          ))}
        </div>
      </div>

      {(method === "Credit Card" || method === "Debit Card") && (
        <div className="cardSection commonCard">
          <h2>Card Details</h2>
          <div className="cardGrid">
            <input type="text" placeholder="Card Holder Name" />
            <input type="text" placeholder="Card Number" />
            <input type="text" placeholder="MM / YY" />
            <input type="password" placeholder="CVV" />
          </div>
        </div>
      )}

      <div className="escrowSection commonCard">
        <h2>Escrow Protection</h2>
        <table>
          <tbody>
            <tr>
              <td>Status</td>
              <td>
                <span className="escrowBadge">Active</span>
              </td>
            </tr>
            <tr>
              <td>Protected Amount</td>
              <td>৳{total}</td>
            </tr>
            <tr>
              <td>Funds Release</td>
              <td>After Buyer Confirmation</td>
            </tr>
            <tr>
              <td>Payment Security</td>
              <td>Fully Secured</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="paymentButtons">
        <button className="payNow" onClick={handlePayNow} disabled={paying || paid}>
          {paying ? (
            <>
              <span className="spinner" /> Processing...
            </>
          ) : paid ? (
            "✓ Paid"
          ) : (
            "Pay Now"
          )}
        </button>
        <button className="saveMethod" onClick={() => showToast(`${method} saved as default.`, "success")}>
          Save Payment Method
        </button>
      </div>
    </div>
  );
};

export default BuyerPayment;
