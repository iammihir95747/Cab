import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminUserManagement.css';

const AdminUserManagement = () => {
  const [users, setUsers] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit' | 'view'
  const [formData, setFormData] = useState({
    name: '', email: '', phoneNumber: '', role: 'user'
  });
  const [selectedUserId, setSelectedUserId] = useState(null);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5001/api/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const openModal = (mode, user = null) => {
    setModalMode(mode);
    if (user) {
      setFormData({
        name: user.name || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        role: user.role || 'user',
      });
      setSelectedUserId(user._id);
    } else {
      setFormData({ name: '', email: '', phoneNumber: '', role: 'user' });
      setSelectedUserId(null);
    }
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setFormData({ name: '', email: '', phoneNumber: '', role: 'user' });
    setSelectedUserId(null);
  };

  const handleInputChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    try {
      if (modalMode === 'add') {
        await axios.post('http://localhost:5001/api/users/register', formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else if (modalMode === 'edit' && selectedUserId) {
        await axios.put(`http://localhost:5001/api/users/${selectedUserId}`, formData, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchUsers();
      closeModal();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  const deleteUser = async (userId) => {
    if (!window.confirm('Delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5001/api/users/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter(user => user._id !== userId));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="admin-user-container">
      <div className="admin-user-header">
        <h2>User Management</h2>
        <button className="add-btn" onClick={() => openModal('add')}>+ Add User</button>
      </div>

      <table className="user-table">
        <thead>
          <tr><th>Name</th><th>Email</th><th>Phone</th><th>Role</th><th>Status</th><th>Actions</th></tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.role}</td>
              <td>{user.isActive ? 'Active' : 'Inactive'}</td>
              <td>
                <button className="view-btn" onClick={() => openModal('view', user)}>👁 View</button>
                
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>{modalMode === 'add' ? 'Add User' : modalMode === 'edit' ? 'Edit User' : 'User Details'}</h3>
            <form onSubmit={handleSubmit}>
              <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Name" disabled={modalMode === 'view'} required />
              <input name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" disabled={modalMode === 'view'} required />
              <input name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} placeholder="Phone Number" disabled={modalMode === 'view'} required />
              <select name="role" value={formData.role} onChange={handleInputChange} disabled={modalMode === 'view'}>
                <option value="user">User</option>
                <option value="driver">Driver</option>
              </select>
              {modalMode !== 'view' && <button type="submit" className="submit-btn">{modalMode === 'add' ? 'Add' : 'Update'}</button>}
              <button type="button" className="cancel-btn" onClick={closeModal}>Close</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUserManagement;
