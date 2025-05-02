import React, { useState, useEffect } from 'react';
import './Auth.css';
import { useNavigate } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";

const API_BASE = "http://localhost:5001";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/homepage"); // Redirect to home if already logged in
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      toast.error("❌ Email and Password are required");
      setLoading(false);
      return;
    }

    try {
      console.log("Sending Login Request:", { email, password });

      const response = await fetch(`${API_BASE}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (!response.ok || !data.token) {
        throw new Error(data.error || "Login Failed ❌");
      }

      toast.success("✅ Login Successful");

      // Store token and role in localStorage
      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);

      // Redirect based on role
      if (data.role === "user") {
        navigate("/homepage");
      } else if (data.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/homepage");
      }

      window.dispatchEvent(new Event("storage"));
    } catch (error) {
      toast.error(error.message || "Login failed");
      console.error("Login Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register">
        <div className="form-login">
          <form className="form-block" autoComplete="off" onSubmit={handleLogin}>
            <h5 className="titilereg">
              Signin <br />
              <span className="actext">Login to your SteadyDusk account</span>
            </h5>

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

            <button type="submit" className="sub" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>

            <div>
              <Toaster position="top-right" reverseOrder={false} color="#fff" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
