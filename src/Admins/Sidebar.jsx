import React, { useState } from "react";
import { Link } from "react-router-dom";
import './Sidebar.css';

const Sidebar = () => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className={`sidebar ${isHovered ? "hovered" : ""}`} 
         onMouseEnter={() => setIsHovered(true)} 
         onMouseLeave={() => setIsHovered(false)}>
      <div className="sidebar-header">
        <h2>Admin</h2>
      </div>
      <ul className="sidebar-menu">
        <li><Link to="/admin" className="sidebar-link">Dashboard</Link></li>
        <li><Link to="/admin/users" className="sidebar-link">User Management</Link></li>

    
      </ul>
    </div>
  );
};

export default Sidebar;
