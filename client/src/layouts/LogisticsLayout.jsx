import { Outlet } from "react-router-dom";

import LogisticsSidebar from "../components/logistics/LogisticsSidebar";
import LogisticsNavbar from "../components/logistics/LogisticsNavbar";

function LogisticsLayout() {

  return (

    <div className="app">

      <LogisticsSidebar />

      <div className="main">

        <LogisticsNavbar />

        <div className="content">

          <Outlet />

        </div>

      </div>

    </div>

  );

}

export default LogisticsLayout;