import { useState, useEffect } from "react";
import "./css/CartOrders.css";
import {
  getCartItems,
  removeCartItem,
  placeOrder,
  getOrderHistory,
} from "../../api/buyerService";
import { jsPDF } from "jspdf";

const CartOrders = () => {
  const [cartItems, setCartItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [removingId, setRemovingId] = useState(null);

  const loadData = async () => {
    setLoading(true);
    setError("");
    try {
      const [cartRes, ordersRes] = await Promise.all([
        getCartItems(),
        getOrderHistory(),
      ]);
      setCartItems(cartRes.data.data);
      setOrders(ordersRes.data.data);
    } catch (err) {
      setError("Failed to load cart/orders");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Auto-clear success message after a few seconds
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => setMessage(""), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const handleRemove = async (cart_item_id) => {
    setRemovingId(cart_item_id);
    setError("");
    try {
      await removeCartItem(cart_item_id);
      setCartItems((prev) =>
        prev.filter((item) => item.cart_item_id !== cart_item_id)
      );
      setMessage("Item removed from cart.");
    } catch (err) {
      setError("Failed to remove item");
      console.error(err);
    } finally {
      setRemovingId(null);
    }
  };

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) return;
    setPlacingOrder(true);
    setError("");
    setMessage("");
    try {
      await placeOrder();
      setMessage("Order placed successfully!");
      await loadData();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to place order");
      console.error(err);
    } finally {
      setPlacingOrder(false);
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + Number(item.total_price),
    0
  );

  const handleInvoiceDownload = (order) => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Invoice", 14, 20);

    doc.setFontSize(11);
    doc.text(`Order ID: ${order.order_unique_id}`, 14, 32);
    doc.text(
      `Date: ${new Date(order.created_at).toLocaleDateString()}`,
      14,
      40
    );
    doc.text(`Status: ${order.order_status}`, 14, 48);

    doc.line(14, 54, 196, 54);

    doc.setFontSize(12);
    doc.text("Amount Due", 14, 64);
    doc.setFontSize(16);
    doc.text(`\u09F3${order.total_price}`, 14, 74);

    doc.setFontSize(10);
    doc.text(
      "Thank you for your order via AgriTech Marketplace.",
      14,
      90
    );

    doc.save(`invoice_${order.order_unique_id}.pdf`);
  };

  return (
    <div className="cartOrders">
      <div className="pageHeader">
        <h1>Cart & Orders</h1>
        <p>Review your cart, place orders, and download invoices.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="cartLayout">
            <div className="cartSection">
              <h2>Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
              ) : (
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
                        <td>
                          <button
                            className="removeBtn"
                            onClick={() => handleRemove(item.cart_item_id)}
                            disabled={removingId === item.cart_item_id}
                          >
                            {removingId === item.cart_item_id
                              ? "Removing..."
                              : "Remove"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="summarySection">
              <h2>Order Summary</h2>
              <div className="summaryRow total">
                <span>Total</span>
                <span>৳{subtotal}</span>
              </div>
              <button
                className="checkoutBtn"
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0 || placingOrder}
              >
                {placingOrder ? "Placing Order..." : "Place Order"}
              </button>
            </div>
          </div>

          <div className="historySection">
            <h2>Order History</h2>

            {orders.length === 0 ? (
              <p>No past orders.</p>
            ) : (
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
                        <span
                          className={`status ${(
                            order.order_status || ""
                          ).toLowerCase()}`}
                        >
                          {order.order_status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="invoiceBtn"
                          onClick={() => handleInvoiceDownload(order)}
                        >
                          Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CartOrders;