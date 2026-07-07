import { Outlet } from "react-router-dom";
import BuyerNavbar from "../components/buyer/BuyerNavbar";
import BuyerSidebar from "../components/buyer/BuyerSidebar";

const BuyerLayout = () => {
    return (
        <div className="app">

            <BuyerSidebar />

            <div className="main">

                <BuyerNavbar />

                <div className="content">
                    <Outlet />
                </div>

            </div>

        </div>
    );
};

export default BuyerLayout;
