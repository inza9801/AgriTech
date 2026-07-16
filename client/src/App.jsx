import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";

import FarmerLayout from "./layouts/FarmerLayout";
import BuyerLayout from "./layouts/BuyerLayout";
import LogisticsLayout from "./layouts/LogisticsLayout";
import LogisticsAdminLayout from "./layouts/LogisticsAdminLayout";

/* ===========================
   AUTH / PUBLIC PAGES
=========================== */

import Landing from "./pages/auth/Landing";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

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
   LOGISTICS (DRIVER) PAGES
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
import RegisterDriver from "./pages/logisticsAdmin/RegisterDriver";

/* ===========================
   OTHER PAGES
=========================== */

import NotFound from "./pages/NotFound";

import "./App.css";

function App() {
  return (
    <Routes>
      {/* ===========================
          PUBLIC ROUTES
      =========================== */}

      <Route path="/" element={<PublicRoute><Landing /></PublicRoute>} />
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      {/* ===========================
          FARMER ROUTES
      =========================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["farmer"]}>
            <FarmerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/farmer" element={<Dashboard />} />
        <Route path="/farmer/farm-monitoring" element={<FarmMonitoring />} />
        <Route path="/farmer/irrigation" element={<Irrigation />} />
        <Route path="/farmer/crop-management" element={<CropManagement />} />
        <Route path="/farmer/warehouse" element={<WarehouseInventory />} />
        <Route path="/farmer/marketplace" element={<Marketplace />} />
        <Route path="/farmer/orders-logistics" element={<OrdersLogistics />} />
        <Route path="/farmer/payments" element={<Payments />} />
      </Route>

      {/* ===========================
          BUYER ROUTES
      =========================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["buyer"]}>
            <BuyerLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/buyer" element={<BuyerDashboard />} />
        <Route path="/buyer/marketplace" element={<MarketplaceHome />} />
        <Route path="/buyer/product/:id" element={<ProductDetail />} />
        <Route path="/buyer/orders" element={<CartOrders />} />
        <Route path="/buyer/tracking" element={<Tracking />} />
        <Route path="/buyer/payments" element={<BuyerPayment />} />
      </Route>

      {/* ===========================
          LOGISTICS (DRIVER) ROUTES
      =========================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["driver"]}>
            <LogisticsLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/logistics" element={<LogisticsDashboard />} />
        <Route path="/logistics/deliveries" element={<AssignedDeliveries />} />
        <Route path="/logistics/status" element={<DeliveryStatus />} />
        <Route path="/logistics/earnings" element={<Earnings />} />
        <Route path="/logistics/profile" element={<DriverProfile />} />
      </Route>

      {/* ===========================
          LOGISTICS ADMIN ROUTES
      =========================== */}

      <Route
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <LogisticsAdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/logistics-admin" element={<LogisticsAdminDashboard />} />
        <Route path="/logistics-admin/incoming-requests" element={<IncomingRequests />} />
        <Route path="/logistics-admin/assigned-orders" element={<AssignedOrders />} />
        <Route path="/logistics-admin/drivers" element={<DriverManagement />} />
        <Route path="/logistics-admin/shipments" element={<ShipmentMonitoring />} />
        <Route path="/logistics-admin/history" element={<DeliveryHistory />} />
        <Route path="/logistics-admin/register-driver" element={<RegisterDriver />} />
      </Route>

      {/* ===========================
          NOT FOUND
      =========================== */}

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;