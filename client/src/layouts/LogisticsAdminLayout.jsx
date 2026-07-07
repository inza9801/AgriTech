import { Outlet } from "react-router-dom";

import LogisticsAdminSidebar from "../components/logisticsAdmin/LogisticsAdminSidebar";
import LogisticsAdminNavbar from "../components/logisticsAdmin/LogisticsAdminNavbar";

function LogisticsAdminLayout() {

  return (

    <div className="app">

      <LogisticsAdminSidebar />

      <div className="main">

        <LogisticsAdminNavbar />

        <div className="content">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default LogisticsAdminLayout;
