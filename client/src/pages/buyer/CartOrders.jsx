import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./css/CartOrders.css";
import { getOrderHistory } from "../../api/buyerService";
import { useCart } from "../../contexts/CartContext";
import { useToast } from "../../hooks/useToast";

const CartOrders = () => {
  const navigate = useNavigate();
  const { cartItems, cartTotal, loading: cartLoading, removeItem, checkout } = useCart();
  const [orders, setOrders] = useState([]);
  const [ordersLoading, setOrdersLoading] = useState(true);
  const [error, setError] = useState("");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [removingId, setRemovingId] = useState(null);
  const showToast = useToast();

  const loadOrders = async () => {
    setOrdersLoading(true);
    setError("");
    try {
      const res = await getOrderHistory();
      setOrders(res.data.data);
    } catch (err) {
      setError("Failed to load order history");
      console.error(err);
    } finally {
      setOrdersLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleRemove = async (cart_item_id) => {
    setRemovingId(cart_item_id);
    setError("");
    try {
      await removeItem(cart_item_id);
      showToast("Item removed from cart.", "success");
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
    try {
      await checkout();
      setPlacingOrder(false);
      setOrderPlaced(true);
      showToast("Order placed successfully!", "success");
      await loadOrders();
      setTimeout(() => setOrderPlaced(false), 2200);
    } catch (err) {
      setPlacingOrder(false);
      setError(err.response?.data?.message || "Failed to place order");
      console.error(err);
    }
  };

  const handleViewDetails = (order_id) => {
    navigate(`/buyer/order-detail/${order_id}`);
  };

  const loading = cartLoading || ordersLoading;

  return (
    <div className="cartOrders">
      <div className="pageHeader">
        <h1 className="pageTitle">Cart & Orders</h1>
        <p className="pageSubtitle">Review your cart, place orders, and track order history.</p>
      </div>

      {error && <div className="formError">{error}</div>}

      {loading ? (
        <div className="skeleton" style={{ height: 240, marginBottom: 24 }} />
      ) : (
        <>
          <div className="cartLayout">
            <div className="cartSection commonCard">
              <h2>Shopping Cart</h2>

              {cartItems.length === 0 ? (
                <div className="emptyState">
                  <div className="emptyIcon">🛒</div>
                  <p>Your cart is empty.</p>
                </div>
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
                      <tr
                        key={item.cart_item_id}
                        className={removingId === item.cart_item_id ? "rowRemoving" : ""}
                      >
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
                            {removingId === item.cart_item_id ? "Removing..." : "Remove"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>

            <div className="summarySection commonCard">
              <h2>Order Summary</h2>
              <div className="summaryRow total">
                <span>Total</span>
                <span>৳{cartTotal}</span>
              </div>

              <button
                className={`checkoutBtn ${orderPlaced ? "success" : ""}`}
                onClick={handlePlaceOrder}
                disabled={cartItems.length === 0 || placingOrder || orderPlaced}
              >
                {orderPlaced ? (
                  <span className="checkoutSuccessContent">
                    <span className="checkmark">✓</span> Order Placed
                  </span>
                ) : placingOrder ? (
                  <span className="checkoutSuccessContent">
                    <span className="spinner" /> Placing Order...
                  </span>
                ) : (
                  "Place Order"
                )}
              </button>
            </div>
          </div>

          <div className="historySection">
            <h2>Order History</h2>

            {orders.length === 0 ? (
              <div className="emptyState">
                <div className="emptyIcon">📦</div>
                <p>No past orders.</p>
              </div>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Order ID</th>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Details</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.order_id}>
                      <td>{order.order_unique_id}</td>
                      <td>{new Date(order.created_at).toLocaleDateString()}</td>
                      <td>৳{order.total_price}</td>
                      <td>
                        <span className={`status ${(order.order_status || "").toLowerCase()}`}>
                          {order.order_status}
                        </span>
                      </td>
                      <td>
                        <button
                          className="detailBtn"
                          onClick={() => handleViewDetails(order.order_id)}
                        >
                          View Details
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