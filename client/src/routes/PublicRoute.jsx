import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

// Keep in sync with ProtectedRoute.jsx's ROLE_HOME map.
const ROLE_HOME = {
  farmer: "/farmer",
  buyer: "/buyer",
  admin: "/logistics-admin",
  driver: "/logistics",
};

const PublicRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) return <div style={{ padding: "40px", textAlign: "center" }}>Loading...</div>;

  if (user) {
    return <Navigate to={ROLE_HOME[user.role] || "/"} replace />;
  }

  return children;
};

export default PublicRoute;
