import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "./Sidebar";
import './Admin.css';

const Admin = () => {
  return (
    <div className="admin-container">
      <Sidebar />
      <div className="admin-content">
        <div className="admin-header">
          <h1>Admin Dashboard</h1>
        </div>
        <div className="admin-body">
          <div className="card">
            <h2>User Management</h2>
            <p>Manage all users here</p>
            <Link to="/admin/users" className="btn">Go to Users</Link>
          </div>
         
        </div>
      </div>
    </div>
  );
};

export default Admin;
