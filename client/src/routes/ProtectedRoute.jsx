import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const ROLE_HOME = {
  farmer: "/farmer/dashboard",
  buyer: "/buyer/dashboard",
  admin: "/logistics-admin/dashboard",
  driver: "/logistics/dashboard",
};

const ProtectedRoute = ({ allowedRoles, children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  if (!user) return <Navigate to="/login" replace />;

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  return children;
};

export default ProtectedRoute;