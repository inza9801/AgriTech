import { useState, useEffect } from "react";
import "./css/CartOrders.css";
import { getCartItems, removeCartItem, placeOrder, getOrderHistory } from "../../api/buyerService";

const CartOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadData = async () => {
    try {
      const [cartRes, ordersRes] = await Promise.all([getCartItems(), getOrderHistory()]);
      setCartItems(cartRes.data.data);
      setOrders(ordersRes.data.data);
    } catch (err) {
      setError("Failed to load cart/orders");
      console.error(err);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleRemove = async (cart_item_id) => {
    await removeCartItem(cart_item_id);
    loadData();
  };

  const handlePlaceOrder = async () => {
    try {
      await placeOrder();
      setMessage("Order placed successfully!");
      loadData();
    } catch (err) {
      setError("Failed to place order");
      console.error(err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + Number(item.total_price), 0);

  const handleInvoiceDownload = (orderId) => {
    alert(`Invoice download for ${orderId} — to be implemented.`);
  };

  return (
    <div className="cartOrders">
      <h1>Cart & Orders</h1>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

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
              {cartItems.map((item) => (
                <tr key={item.cart_item_id}>
                  <td>{item.crop_name}</td>
                  <td>{item.farmer_name}</td>
                  <td>৳{item.price_per_kg}</td>
                  <td>{item.quantity_kg} kg</td>
                  <td>৳{item.total_price}</td>
                  <td><button className="removeBtn" onClick={() => handleRemove(item.cart_item_id)}>Remove</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="summarySection">
          <h2>Order Summary</h2>
          <div className="summaryRow total"><span>Total</span><span>৳{subtotal}</span></div>
          <button className="checkoutBtn" onClick={handlePlaceOrder} disabled={cartItems.length === 0}>
            Place Order
          </button>
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
            {orders.map((order) => (
              <tr key={order.order_id}>
                <td>{order.order_unique_id}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                <td>৳{order.total_price}</td>
                <td>
                  <span className={`status ${order.order_status.toLowerCase()}`}>
                    {order.order_status}
                  </span>
                </td>
                <td><button className="invoiceBtn" onClick={() => handleInvoiceDownload(order.order_unique_id)}>Download</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CartOrders;