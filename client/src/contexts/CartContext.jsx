import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import {
  getCartItems,
  addToCart as addToCartRequest,
  removeCartItem as removeCartItemRequest,
  placeOrder as placeOrderRequest,
} from "../api/buyerService";
import { useAuth } from "./AuthContext";

/**
 * CartContext centralises the buyer's shopping cart so the navbar badge,
 * the mini-cart dropdown, the marketplace grid and the checkout page all
 * read/write the same live data instead of each page re-fetching (or
 * worse, hardcoding) its own copy.
 *
 * It also exposes a `cartAnchorRef` — the navbar attaches this to the cart
 * icon so any page can animate an item "flying" into the cart on add.
 */

const CartContext = createContext(undefined);

export const CartProvider = ({ children }) => {
  const { user } = useAuth?.() ?? {};
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [bump, setBump] = useState(false); // triggers the navbar badge "pop"
  const cartAnchorRef = useRef(null);

  const refreshCart = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getCartItems();
      setCartItems(res.data?.data ?? []);
    } catch (err) {
      console.error("Failed to refresh cart:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) refreshCart();
    else setCartItems([]);
  }, [user, refreshCart]);

  const pulseBadge = useCallback(() => {
    setBump(true);
    window.setTimeout(() => setBump(false), 650);
  }, []);

  const addItem = useCallback(
    async (payload, sourceEl) => {
      await addToCartRequest(payload);
      if (sourceEl && cartAnchorRef.current) {
        flyToCart(sourceEl, cartAnchorRef.current);
      }
      pulseBadge();
      await refreshCart();
    },
    [pulseBadge, refreshCart]
  );

  const removeItem = useCallback(async (cartItemId) => {
    await removeCartItemRequest(cartItemId);
    setCartItems((prev) => prev.filter((i) => i.cart_item_id !== cartItemId));
  }, []);

  const checkout = useCallback(async () => {
    const res = await placeOrderRequest();
    await refreshCart();
    return res;
  }, [refreshCart]);

  const cartCount = useMemo(
    () => cartItems.reduce((sum, i) => sum + (Number(i.quantity_kg) > 0 ? 1 : 1), 0),
    [cartItems]
  );

  const cartTotal = useMemo(
    () => cartItems.reduce((sum, i) => sum + Number(i.total_price || 0), 0),
    [cartItems]
  );

  const value = {
    cartItems,
    cartCount,
    cartTotal,
    loading,
    bump,
    cartAnchorRef,
    refreshCart,
    addItem,
    removeItem,
    checkout,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
};

/**
 * Animates a small ghost of the source element flying into the cart icon.
 * Pure DOM/CSS — no dependency, cleans up after itself.
 */
function flyToCart(sourceEl, targetEl) {
  const from = sourceEl.getBoundingClientRect();
  const to = targetEl.getBoundingClientRect();

  const ghost = document.createElement("div");
  ghost.className = "flyToCartGhost";
  ghost.style.left = `${from.left + from.width / 2 - 9}px`;
  ghost.style.top = `${from.top + from.height / 2 - 9}px`;
  document.body.appendChild(ghost);

  const dx = to.left + to.width / 2 - (from.left + from.width / 2);
  const dy = to.top + to.height / 2 - (from.top + from.height / 2);

  requestAnimationFrame(() => {
    ghost.style.transform = `translate(${dx}px, ${dy}px) scale(0.25)`;
    ghost.style.opacity = "0.15";
  });

  window.setTimeout(() => ghost.remove(), 520);
}
