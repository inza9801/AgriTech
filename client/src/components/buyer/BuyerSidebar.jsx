import { NavLink } from "react-router-dom";
import "./css/BuyerSidebar.css";

const BuyerSidebar = () => {

    return (

        <aside className="buyerSidebar">

            <h2 className="logo">AgriNexus</h2>

            <nav>

                <NavLink to="/buyer" end>
                    Dashboard
                </NavLink>

                <NavLink to="/buyer/marketplace">
                    Marketplace
                </NavLink>

                <NavLink to="/buyer/product">
                    Product Details
                </NavLink>

                <NavLink to="/buyer/orders">
                    Cart & Orders
                </NavLink>

                <NavLink to="/buyer/tracking">
                    Tracking
                </NavLink>

                <NavLink to="/buyer/payments">
                    Payments
                </NavLink>

            </nav>

        </aside>

    );
};

export default BuyerSidebar;
