import { Outlet } from "react-router-dom";
import BuyerNavbar from "../components/buyer/BuyerNavbar";
import BuyerSidebar from "../components/buyer/BuyerSidebar";
import { CartProvider } from "../contexts/CartContext";

const BuyerLayout = () => {
  return (
    <CartProvider>
      <div className="app">
        <BuyerSidebar />

        <div className="main">
          <BuyerNavbar />

          <div className="content">
            <Outlet />
          </div>
        </div>
      </div>
    </CartProvider>
  );
};

export default BuyerLayout;
