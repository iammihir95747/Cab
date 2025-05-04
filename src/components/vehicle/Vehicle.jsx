// Vehicle.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Vehicle = () => {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({
    modelName: '',
    type: '',
    capacity: '',
    ratePerKm: '',
    baseFare: '',
    imageUrl: '',
  });
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/vehicles')  // API call to fetch vehicles
      .then((response) => {
        console.log('Vehicles fetched:', response);  // Log the full response
        if (response.data && response.data.vehicles) {
          setVehicles(response.data.vehicles);  // Set the vehicles state
        }
      })
      .catch((error) => {
        console.error('Error fetching vehicles:', error);
      });
  }, []);
  
  

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission for add or update
  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedVehicle) {
      // Update vehicle
      axios
        .put(`http://localhost:5001/api/vehicles/update/${selectedVehicle._id}`, formData)
        .then((response) => {
          setVehicles(
            vehicles.map((vehicle) =>
              vehicle._id === selectedVehicle._id ? response.data.vehicle : vehicle
            )
          );
          setFormData({
            modelName: '',
            type: '',
            capacity: '',
            ratePerKm: '',
            baseFare: '',
            imageUrl: '',
          });
          setSelectedVehicle(null);
        })
        .catch((error) => {
          console.error('Error updating vehicle:', error);
        });
    } else {
      // Add new vehicle
      axios
        .post('http://localhost:5001/api/vehicles/add', formData)
        .then((response) => {
          setVehicles([...vehicles, response.data.vehicle]);
          setFormData({
            modelName: '',
            type: '',
            capacity: '',
            ratePerKm: '',
            baseFare: '',
            imageUrl: '',
          });
        })
        .catch((error) => {
          console.error('Error adding vehicle:', error);
        });
    }
  };

  // Handle update action
  const handleUpdate = (vehicle) => {
    setSelectedVehicle(vehicle);
    setFormData({
      modelName: vehicle.modelName,
      type: vehicle.type,
      capacity: vehicle.capacity,
      ratePerKm: vehicle.ratePerKm,
      baseFare: vehicle.baseFare,
      imageUrl: vehicle.imageUrl,
    });
  };

  // Handle delete action
  const handleDelete = (vehicleId) => {
    axios
      .delete(`http://localhost:5001/api/vehicles/delete/${vehicleId}`)
      .then(() => {
        setVehicles(vehicles.filter((vehicle) => vehicle._id !== vehicleId));
      })
      .catch((error) => {
        console.error('Error deleting vehicle:', error);
      });
  };

  return (
    <div>
      <h1>Vehicle Management</h1>
      
      {/* Vehicle Form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Model Name</label>
          <input
            type="text"
            name="modelName"
            value={formData.modelName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Type</label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Capacity</label>
          <input
            type="number"
            name="capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Rate per Km</label>
          <input
            type="number"
            name="ratePerKm"
            value={formData.ratePerKm}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Base Fare</label>
          <input
            type="number"
            name="baseFare"
            value={formData.baseFare}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL</label>
          <input
            type="text"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">{selectedVehicle ? 'Update Vehicle' : 'Add Vehicle'}</button>
      </form>

      {/* Vehicle List */}
      <h2>Vehicle List</h2>
      <table>
        <thead>
          <tr>
            <th>Model Name</th>
            <th>Type</th>
            <th>Capacity</th>
            <th>Rate per Km</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {vehicles.length === 0 ? (
    <tr>
      <td colSpan="6" className="text-center">No vehicles available.</td>
    </tr>
  ) : (
    vehicles.map((vehicle) => (
      <tr key={vehicle._id}>
        <td>{vehicle.modelName}</td>
        <td>{vehicle.type}</td>
        <td>{vehicle.capacity}</td>
        <td>{vehicle.ratePerKm}</td>
        <td>{vehicle.baseFare}</td>
        <td>
          {/* Action buttons for update and delete */}
          <button onClick={() => handleEdit(vehicle._id)}>Edit</button>
          <button onClick={() => handleDelete(vehicle._id)}>Delete</button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>
    </div>
  );
};

export default Vehicle;
