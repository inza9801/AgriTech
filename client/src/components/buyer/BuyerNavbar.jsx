import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import "./css/BuyerNavbar.css";
import { useAuth } from "../../contexts/AuthContext";
import { useCart } from "../../contexts/CartContext";

const getInitials = (name) => {
  if (!name) return "B";
  const parts = name.trim().split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
};

const BuyerNavbar = () => {
  const { user } = useAuth();
  const { cartItems, cartCount, cartTotal, bump, cartAnchorRef, removeItem } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setCartOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayName = user?.name || user?.full_name || "Buyer";
  const roleLabel = user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : "Buyer";

  return (
    <header className="buyerNavbar">
      <div className="navbarLeft">
        <h2>Buyer Workspace</h2>
      </div>

      <div className="navbarRight">
        <div className="cartWrapper" ref={dropdownRef}>
          <button
            className="iconBtn cartIconBtn"
            ref={cartAnchorRef}
            onClick={() => setCartOpen((o) => !o)}
            aria-label="Open cart"
            aria-expanded={cartOpen}
          >
            <FaShoppingCart />
            {cartCount > 0 && (
              <span className={`cartBadge ${bump ? "bump" : ""}`}>{cartCount}</span>
            )}
          </button>

          {cartOpen && (
            <div className="cartDropdown">
              <div className="cartDropdownHeader">
                <h3>Your Cart</h3>
                <span>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
              </div>

              {cartItems.length === 0 ? (
                <div className="cartDropdownEmpty">Your cart is empty.</div>
              ) : (
                <>
                  <div className="cartDropdownList">
                    {cartItems.slice(0, 5).map((item) => (
                      <div className="cartDropdownItem" key={item.cart_item_id}>
                        <div className="cartDropdownItemInfo">
                          <strong>{item.crop_name}</strong>
                          <span>{item.quantity_kg} kg · ৳{item.total_price}</span>
                        </div>
                        <button
                          className="cartDropdownRemove"
                          onClick={() => removeItem(item.cart_item_id)}
                          aria-label={`Remove ${item.crop_name}`}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {cartItems.length > 5 && (
                      <div className="cartDropdownMore">+{cartItems.length - 5} more</div>
                    )}
                  </div>

                  <div className="cartDropdownFooter">
                    <div className="cartDropdownTotal">
                      <span>Subtotal</span>
                      <strong>৳{cartTotal}</strong>
                    </div>
                    <button
                      className="primaryBtn cartDropdownCheckout"
                      onClick={() => {
                        setCartOpen(false);
                        navigate("/buyer/orders");
                      }}
                    >
                      View Cart & Checkout
                    </button>
                  </div>
                </>
              )}
            </div>
          )}
        </div>

        <div className="buyerProfile">
          <span className="avatar">{getInitials(displayName)}</span>
          <div className="buyerProfileText">
            <strong>{displayName}</strong>
            <span>{roleLabel}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default BuyerNavbar;
