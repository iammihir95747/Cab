import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Nav.css";
import React from 'react';
import Profile from '../components/Profile.png';
import 'font-awesome/css/font-awesome.min.css';




const Navbar = () => {

  const message = "Hello, I want to book a cab for a tour.";
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  // Track login/logout by watching localStorage changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleRegister = () => {
    navigate("/category");
    setMenuOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    setMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    setMenuOpen(false);
    navigate("/"); 
  };

  // Handle Admin navigation
  const handleAdminNavigation = () => {
    navigate("/admin");
    setMenuOpen(false);
  };

  const phoneNumber = "919574713004"; 

  const handleCallNow = () => {
    window.open(`tel:${phoneNumber}`);
  };

  const handleWhatsApp = () => {
    const message = `Hello 👋\nI want to book a cab for a tour.\n\nPlease share:\n📍 Pickup Location:\n📌 Drop Location:\n🕒 Pickup Date & Time:`;
    const encodedMessage = encodeURIComponent(message);
  
    // Check if the user is on Android (this is a simple check, you can refine it if needed)
    const isAndroid = /android/i.test(navigator.userAgent);
  
    if (isAndroid) {
      // Android - try to open WhatsApp Business using deep link
      window.location.href = `intent://send?phone=919574713004&text=${encodedMessage}#Intent;package=com.whatsapp.w4b;scheme=smsto;end`;
    } else {
      // Fallback to regular WhatsApp link
      window.open(`https://wa.me/919574713004?text=${encodedMessage}`, "_blank");
    }
  };
  
  

  return (
    <nav className="navbar">
      <div className="nav-logo">
        <Link to="/" className="nav-logo">Chamunda cabs</Link>
      </div>

      {/* Main Menu */}
      <ul className={`nav-menu ${menuOpen ? "active" : ""}`}>
        <li><Link to="/Homepage" className="nav-link" onClick={() => setMenuOpen(false)}>Home</Link></li>
        <li><Link to="/services" className="nav-link" onClick={() => setMenuOpen(false)}>Services</Link></li>
        <li><Link to="/Places" className="nav-link" onClick={() => setMenuOpen(false)}>Places</Link></li>
        <li><Link to="/About" className="nav-link" onClick={() => setMenuOpen(false)}>About</Link></li>

        {/* If logged in and the user is an admin, show the admin button */}
        {role === "admin" && (
          <li><Link to="/admin" className="nav-link" onClick={() => setMenuOpen(false)}>Admin</Link></li>
        )}
      </ul>

      {/* Mobile menu toggle */}
      <div className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>☰</div>

      {/* Right side menu */}
      <div className="nav-right desktop-only">
        {!isLoggedIn ? (
          <>
            {/* Add any actions for when the user is not logged in */}
          </>
        ) : (
          <>
            <button className="nav-button" onClick={handleLogout}>Logout</button>
            <a href="/profile"><img alt="Profile" src={Profile} className="profilenav" /></a>
          </>
        )}
      </div>

      {/* Right side buttons (Call Now and WhatsApp) */}
      <div className="nav-buttons-right">
        <button className="nav-button call-now" onClick={handleCallNow}>📞 Call Now</button>
        <button className="nav-button whatsapp" onClick={handleWhatsApp}>
  <i className="fa fa-whatsapp"></i> WhatsApp
</button>

      </div>
    </nav>
  );
};

export default Navbar;
