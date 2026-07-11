import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./css/Auth.css";

const ROLE_HOME = {
  farmer: "/farmer/dashboard",
  buyer: "/buyer/dashboard",
  admin: "/logistics-admin/dashboard",
  driver: "/logistics/dashboard",
};

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const user = await login(formData.email, formData.password);
      navigate(ROLE_HOME[user.role] || "/", { replace: true });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="authPage">
      <div className="authCard">
        <h1>Welcome Back</h1>
        <p className="authSubtitle">Login to your AgriTech account</p>

        {error && <p className="authError">{error}</p>}

        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputGroup">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button className="authSubmitBtn" type="submit" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="authFooterText">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <p className="authFooterText">
          Driver? Your account is created by an admin — use your given credentials to log in here.
        </p>
      </div>
    </div>
  );
};

export default Login;