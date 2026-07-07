import { Outlet } from "react-router-dom";

import FarmerSidebar from "../components/farmer/FarmerSidebar"; 
import FarmerNavbar from "../components/farmer/FarmerNavbar";

function FarmerLayout() {

  return (

    <div className="app">

      <FarmerSidebar />

      <div className="main">

        <FarmerNavbar />

        <div className="content">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default FarmerLayout;