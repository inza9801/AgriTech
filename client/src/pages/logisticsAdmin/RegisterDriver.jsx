import { useState, useEffect } from "react";
import "./css/RegisterDriver.css";
import { registerDriver, getDrivers } from "../../api/authApi";

const initialForm = {
  full_name: "",
  username: "",
  email: "",
  password: "",
  phone_number: "",
  address: "",
  employee_id: "",
  driver_phone: "",
  vehicle_number: "",
  vehicle_type: "",
  registration_number: "",
  capacity_tons: "",
  experience_years: "",
  joining_date: "",
};

const DriverManagement = () => {
  const [drivers, setDrivers] = useState([]);
  const [formData, setFormData] = useState(initialForm);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadDrivers = async () => {
    setLoading(true);
    try {
      const res = await getDrivers();
      setDrivers(res.data.data);
    } catch (err) {
      setError("Failed to load drivers");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDrivers();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");
    setSubmitting(true);
    try {
      await registerDriver(formData);
      setMessage(`Driver "${formData.full_name}" registered successfully.`);
      setFormData(initialForm);
      loadDrivers();
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register driver");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="driverManagement">
      <div className="pageHeader">
        <h1>Driver Management</h1>
        <p>Register new drivers and view the current fleet.</p>
      </div>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {message && <p style={{ color: "green" }}>{message}</p>}

      <div className="driverFormSection">
        <h2>Register New Driver</h2>

        <form className="driverForm" onSubmit={handleSubmit}>
          <div className="formGrid">
            <div className="inputGroup">
              <label>Full Name</label>
              <input type="text" name="full_name" value={formData.full_name} onChange={handleChange} required />
            </div>

            <div className="inputGroup">
              <label>Username (for login)</label>
              <input type="text" name="username" value={formData.username} onChange={handleChange} required />
            </div>

            <div className="inputGroup">
              <label>Email (for login)</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div className="inputGroup">
              <label>Password</label>
              <input type="password" name="password" value={formData.password} onChange={handleChange} minLength={6} required />
            </div>

            <div className="inputGroup">
              <label>Phone Number</label>
              <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Address</label>
              <input type="text" name="address" value={formData.address} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Employee ID</label>
              <input type="text" name="employee_id" value={formData.employee_id} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Experience (years)</label>
              <input type="number" name="experience_years" value={formData.experience_years} onChange={handleChange} min="0" />
            </div>

            <div className="inputGroup">
              <label>Joining Date</label>
              <input type="date" name="joining_date" value={formData.joining_date} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Vehicle Number</label>
              <input type="text" name="vehicle_number" value={formData.vehicle_number} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Vehicle Type</label>
              <input type="text" name="vehicle_type" value={formData.vehicle_type} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Registration Number</label>
              <input type="text" name="registration_number" value={formData.registration_number} onChange={handleChange} />
            </div>

            <div className="inputGroup">
              <label>Capacity (tons)</label>
              <input type="number" step="0.01" name="capacity_tons" value={formData.capacity_tons} onChange={handleChange} min="0" />
            </div>
          </div>

          <button className="submitButton" type="submit" disabled={submitting}>
            {submitting ? "Registering..." : "Register Driver"}
          </button>
        </form>
      </div>

      <div className="driverListSection">
        <h2>Current Drivers</h2>

        {loading ? (
          <p>Loading drivers...</p>
        ) : drivers.length === 0 ? (
          <p>No drivers registered yet.</p>
        ) : (
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Username</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Vehicle</th>
                  <th>Capacity</th>
                </tr>
              </thead>
              <tbody>
                {drivers.map((d) => (
                  <tr key={d.driver_id}>
                    <td>{d.name}</td>
                    <td>{d.username}</td>
                    <td>{d.email}</td>
                    <td>{d.phone}</td>
                    <td>{d.vehicle_number} ({d.vehicle_type})</td>
                    <td>{d.capacity_tons} Ton</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default DriverManagement;