import "./css/BuyerPayment.css";

const BuyerPayment = () => {
    return (
        <div className="buyerPayment">

            <h1>Payment</h1>

            <div className="paymentGrid">

                <div className="orderSummary">
                    <h2>Order Summary</h2>
                    <table>
                        <tbody>
                            <tr><td>Products</td><td>৳8,300</td></tr>
                            <tr><td>Delivery Charge</td><td>৳250</td></tr>
                            <tr><td>Tax</td><td>৳150</td></tr>
                            <tr className="totalRow"><td>Total</td><td>৳8,700</td></tr>
                        </tbody>
                    </table>
                </div>

                <div className="paymentMethods">
                    <h2>Payment Method</h2>
                    <label className="paymentOption">
                        <input type="radio" name="payment" defaultChecked />
                        Credit Card
                    </label>
                    <label className="paymentOption">
                        <input type="radio" name="payment" />
                        Debit Card
                    </label>
                    <label className="paymentOption">
                        <input type="radio" name="payment" />
                        Mobile Banking
                    </label>
                    <label className="paymentOption">
                        <input type="radio" name="payment" />
                        Bank Transfer
                    </label>
                    <label className="paymentOption">
                        <input type="radio" name="payment" />
                        Cash On Delivery
                    </label>
                </div>

            </div>

            <div className="cardSection">
                <h2>Card Details</h2>
                <div className="cardGrid">
                    <input type="text" placeholder="Card Holder Name" />
                    <input type="text" placeholder="Card Number" />
                    <input type="text" placeholder="MM / YY" />
                    <input type="password" placeholder="CVV" />
                </div>
            </div>

            <div className="escrowSection">
                <h2>Escrow Protection</h2>
                <table>
                    <tbody>
                        <tr><td>Status</td><td><span className="escrowBadge">Active</span></td></tr>
                        <tr><td>Protected Amount</td><td>৳8,700</td></tr>
                        <tr><td>Funds Release</td><td>After Buyer Confirmation</td></tr>
                        <tr><td>Payment Security</td><td>Fully Secured</td></tr>
                    </tbody>
                </table>
            </div>

            <div className="paymentButtons">
                <button className="payNow">Pay Now</button>
                <button className="saveMethod">Save Payment Method</button>
                <button className="downloadReceipt">Download Receipt</button>
            </div>

        </div>
    );
};

export default BuyerPayment;
