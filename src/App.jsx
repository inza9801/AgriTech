import { Routes, Route } from "react-router-dom";

import FarmerLayout from "./layouts/FarmerLayout";
import BuyerLayout from "./layouts/BuyerLayout";
import LogisticsLayout from "./layouts/LogisticsLayout";
import LogisticsAdminLayout from "./layouts/LogisticsAdminLayout";

/* ===========================
   FARMER PAGES
=========================== */

import Dashboard from "./pages/farmer/Dashboard";
import FarmMonitoring from "./pages/farmer/FarmMonitoring";
import Irrigation from "./pages/farmer/Irrigation";
import CropManagement from "./pages/farmer/CropManagement";
import WarehouseInventory from "./pages/farmer/WarehouseInventory";
import Marketplace from "./pages/farmer/Marketplace";
import OrdersLogistics from "./pages/farmer/OrdersLogistics";
import Payments from "./pages/farmer/Payments";

/* ===========================
   BUYER PAGES
=========================== */

import BuyerDashboard from "./pages/buyer/BuyerDashboard";
import MarketplaceHome from "./pages/buyer/MarketplaceHome";
import ProductDetail from "./pages/buyer/ProductDetail";
import CartOrders from "./pages/buyer/CartOrders";
import Tracking from "./pages/buyer/Tracking";
import BuyerPayment from "./pages/buyer/BuyerPayment";

/* ===========================
   LOGISTICS PAGES
=========================== */

import LogisticsDashboard from "./pages/logistics/LogisticsDashboard";
import AssignedDeliveries from "./pages/logistics/AssignedDeliveries";
import DeliveryStatus from "./pages/logistics/DeliveryStatus";
import Earnings from "./pages/logistics/Earnings";
import DriverProfile from "./pages/logistics/DriverProfile";

/* ===========================
   LOGISTICS ADMIN PAGES
=========================== */

import LogisticsAdminDashboard from "./pages/logisticsAdmin/LogisticsAdminDashboard";
import IncomingRequests from "./pages/logisticsAdmin/IncomingRequests";
import AssignedOrders from "./pages/logisticsAdmin/AssignedOrders";
import DriverManagement from "./pages/logisticsAdmin/DriverManagement";
import ShipmentMonitoring from "./pages/logisticsAdmin/ShipmentMonitoring";
import DeliveryHistory from "./pages/logisticsAdmin/DeliveryHistory";

/* ===========================
   OTHER PAGES
=========================== */

import NotFound from "./pages/NotFound";

import "./App.css";

function App() {

  return (

    <Routes>

      {/* ===========================
          FARMER ROUTES
      =========================== */}

      <Route element={<FarmerLayout />}>

        <Route path="/" element={<Dashboard />} />
        <Route path="/farm-monitoring" element={<FarmMonitoring />} />
        <Route path="/irrigation" element={<Irrigation />} />
        <Route path="/crop-management" element={<CropManagement />} />
        <Route path="/warehouse" element={<WarehouseInventory />} />
        <Route path="/marketplace" element={<Marketplace />} />
        <Route path="/orders-logistics" element={<OrdersLogistics />} />
        <Route path="/payments" element={<Payments />} />

      </Route>

      {/* ===========================
          BUYER ROUTES
      =========================== */}

      <Route element={<BuyerLayout />}>

        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/marketplace" element={<MarketplaceHome />} />
        <Route path="/buyer/product" element={<ProductDetail />} />
        <Route path="/buyer/orders" element={<CartOrders />} />
        <Route path="/buyer/tracking" element={<Tracking />} />
        <Route path="/buyer/payments" element={<BuyerPayment />} />

      </Route>

      {/* ===========================
          LOGISTICS ROUTES
      =========================== */}

      <Route element={<LogisticsLayout />}>

        <Route path="/logistics" element={<LogisticsDashboard />} />
        <Route path="/logistics/deliveries" element={<AssignedDeliveries />} />
        <Route path="/logistics/status" element={<DeliveryStatus />} />
        <Route path="/logistics/earnings" element={<Earnings />} />
        <Route path="/logistics/profile" element={<DriverProfile />} />

      </Route>

      {/* ===========================
          LOGISTICS ADMIN ROUTES
      =========================== */}

      <Route element={<LogisticsAdminLayout />}>

        <Route path="/logistics-admin" element={<LogisticsAdminDashboard />} />
        <Route path="/logistics-admin/incoming-requests" element={<IncomingRequests />} />
        <Route path="/logistics-admin/assigned-orders" element={<AssignedOrders />} />
        <Route path="/logistics-admin/drivers" element={<DriverManagement />} />
        <Route path="/logistics-admin/shipments" element={<ShipmentMonitoring />} />
        <Route path="/logistics-admin/history" element={<DeliveryHistory />} />

      </Route>

      {/* ===========================
          NOT FOUND
      =========================== */}

      <Route path="*" element={<NotFound />} />

    </Routes>

  );

}

export default App;