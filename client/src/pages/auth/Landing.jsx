import { Link } from "react-router-dom";
import "./css/Landing.css";

const Landing = () => {
  return (
    <div className="landingPage">
      <nav className="landingNav">
        <div className="brand">🌾 AgriTech</div>
        <div className="navActions">
          <Link to="/login" className="navLink">Login</Link>
          <Link to="/register" className="navBtn">Get Started</Link>
        </div>
      </nav>

      <header className="hero">
        <h1>From Farm to Doorstep — All in One Platform</h1>
        <p>
          AgriTech connects farmers, buyers, and logistics teams on a single
          platform to manage crops, marketplace listings, orders, and deliveries
          in real time.
        </p>
        <div className="heroActions">
          <Link to="/register" className="ctaBtn">Create an Account</Link>
          <Link to="/login" className="ctaBtnSecondary">I already have an account</Link>
        </div>
      </header>

      <section className="rolesSection">
        <h2>Built for every role in the supply chain</h2>
        <div className="rolesGrid">
          <div className="roleCard">
            <h3>👨‍🌾 Farmers</h3>
            <p>Monitor crops and soil health, manage warehouse stock, and list produce on the marketplace.</p>
          </div>
          <div className="roleCard">
            <h3>🛒 Buyers</h3>
            <p>Browse available listings, manage your cart, place orders, and track shipments live.</p>
          </div>
          <div className="roleCard">
            <h3>🚚 Delivery Drivers</h3>
            <p>Accept assigned deliveries and update pickup, transit, and delivery status on the go.</p>
          </div>
          <div className="roleCard">
            <h3>🛠️ Logistics Admins</h3>
            <p>Assign incoming orders to drivers, monitor all shipments, and manage the driver fleet.</p>
          </div>
        </div>
      </section>

      <footer className="landingFooter">
        <p>&copy; {new Date().getFullYear()} AgriTech. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Landing;