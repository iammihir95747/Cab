import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";  // Import useLocation to access query params
import './Auth.css';
import { toast, Toaster } from "react-hot-toast";
import Footer from '../components/Footer/Footer'

const API_BASE = "http://localhost:5001";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [role, setRole] = useState("");  // Add role state
  const [loading, setLoading] = useState(false);

  const location = useLocation(); // Access the current URL and query params

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);  // Parse query params
    const roleFromUrl = queryParams.get("role");  // Get role from query param
    if (roleFromUrl) {
      setRole(roleFromUrl);  // Set the role if found in URL
    }
  }, [location]);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !phoneNumber || !role) {
      toast.error("❌ All fields are required");
      setLoading(false);
      return;
    }

    if (role !== "admin" && role !== "user") {
      toast.error("❌ Invalid role selected.");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending Registration Request:", { name, email, password, phoneNumber, role });

      const response = await fetch(`${API_BASE}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, phoneNumber, role }),  // Send role in the request
      });

      const data = await response.json();
      console.log("Registration Response:", data);

      if (!response.ok || data.error) {
        // Handling the case for duplicate email or phone number
        if (data.message.includes("email") || data.message.includes("phone number")) {
          toast.error("❌ Email or Phone number already exists.");
        } else {
          toast.error("❌ Registration Failed");
        }
        throw new Error(data.message || "Registration Failed ❌");
      }

      toast.success("✅ Registration Successful");

      // Reset the form after successful registration
      setName("");
      setEmail("");
      setPassword("");
      setPhoneNumber("");
      setRole("");  // Reset role as well

    } catch (error) {
      console.error("Registration Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="register-container">
        <div className="register">
          <div className="form-login">
            <form className="form-block" autoComplete="off" onSubmit={handleRegister}>
              <h5 className="titilereg">
                Signup <br />
                <span className="actext">Create your free account</span>
              </h5>

              <input
                className="form-item"
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                autoComplete="off"
              />

              <input
                className="form-item"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="off"
              />

              <input
                className="form-item"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="new-password"
              />

              <input
                className="form-item"
                type="text"
                placeholder="Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
                autoComplete="off"
              />

              <button type="submit" className="sub" disabled={loading}>
                {loading ? "Registering..." : "Register"}
              </button>

              <div>
                <Toaster position="top-right" reverseOrder={false} color="#fff" />
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Register;
