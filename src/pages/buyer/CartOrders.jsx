import "./css/CartOrders.css";

const CartOrders = () => {

    const cartItems = [
        { id: 1, product: "Premium Rice", farmer: "Green Valley Farm", price: 55, quantity: 100, total: 5500 },
        { id: 2, product: "Organic Tomato", farmer: "Fresh Agro", price: 70, quantity: 40, total: 2800 }
    ];

    const orders = [
        { id: "ORD-1001", date: "01 Jul 2026", amount: "৳12,500", status: "Delivered" },
        { id: "ORD-1002", date: "02 Jul 2026", amount: "৳6,800", status: "Shipping" },
        { id: "ORD-1003", date: "03 Jul 2026", amount: "৳4,300", status: "Pending" }
    ];

    return (
        <div className="cartOrders">

            <h1>Cart & Orders</h1>

            <div className="cartLayout">

                <div className="cartSection">
                    <h2>Shopping Cart</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Farmer</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.id}>
                                    <td>{item.product}</td>
                                    <td>{item.farmer}</td>
                                    <td>৳{item.price}</td>
                                    <td><input type="number" defaultValue={item.quantity} min="1" /></td>
                                    <td>৳{item.total}</td>
                                    <td><button className="removeBtn">Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="summarySection">
                    <h2>Order Summary</h2>
                    <div className="summaryRow"><span>Subtotal</span><span>৳8,300</span></div>
                    <div className="summaryRow"><span>Delivery</span><span>৳250</span></div>
                    <div className="summaryRow"><span>Tax</span><span>৳150</span></div>
                    <div className="summaryRow total"><span>Total</span><span>৳8,700</span></div>
                    <button className="checkoutBtn">Proceed To Checkout</button>
                </div>

            </div>

            <div className="historySection">
                <h2>Order History</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Date</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Invoice</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.date}</td>
                                <td>{order.amount}</td>
                                <td>
                                    <span className={`status ${order.status.toLowerCase()}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td><button className="invoiceBtn">Download</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </div>
    );
};

export default CartOrders;
