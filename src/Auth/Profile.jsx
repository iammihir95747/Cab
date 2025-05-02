import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './profile.css';  // Make sure you import the CSS file

const API_BASE = "http://localhost:5001";

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const response = await fetch(`${API_BASE}/api/auth/profile`, { 
          method: "GET", 
          headers: { 
            "Content-Type": "application/json", 
            Authorization: `Bearer ${token}`, 
          }, 
        });

        if (!response.ok) throw new Error("Failed to fetch profile");

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="profile-card">
      <div className="profile-title">
        <h3>Profile</h3>
      </div>
      {user ? (
        <div className="profile-info">
          <div className="profiletxt">Username: {user.name}</div>
          <div className="profiletxt">Email: {user.email}</div>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default Profile;
