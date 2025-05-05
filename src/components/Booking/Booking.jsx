import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import './Booking.css';
import Footer from '../Footer/Footer';

const Booking = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const vehicleTypeFromCar = location.state?.vehicleType || '';
  const carTypeFromCar = location.state?.carType || '';

  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    pickupLocation: '',
    dropLocation: '',
    vehicleType: vehicleTypeFromCar ? `${vehicleTypeFromCar} (${carTypeFromCar})` : '',
    pickupDateTime: '',
    notes: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // State to track if the car has been selected
  const [isCarSelected, setIsCarSelected] = useState(!!formData.vehicleType);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.vehicleType) {
      setErrorMessage('Please select a vehicle before submitting.');
      return;
    }

    setIsSubmitting(true);
    setConfirmationMessage('');
    setErrorMessage('');

    try {
      const response = await axios.post('http://localhost:5001/api/send-booking', formData);

      if (response.data.success) {
        setConfirmationMessage('✅ Booking Sent! Our driver will contact you.');
        setFormData({
          name: '',
          phoneNumber: '',
          pickupLocation: '',
          dropLocation: '',
          vehicleType: '',
          pickupDateTime: '',
          notes: '',
        });
      } else {
        setErrorMessage('❌ Error submitting booking. Try again.');
      }
    } catch (error) {
      setErrorMessage('❌ ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSelectVehicle = () => {
    navigate('/vehicles', { state: { fromBooking: true } });
  };

  const handleChangeVehicle = () => {
    setIsCarSelected(false); // Reset car selection state
    setFormData({ ...formData, vehicleType: '' }); // Clear the selected vehicle
  };

  return (
    <>
      <div className="booking-form-section">
        <h2 className="booking-title">Book Your Ride</h2>
        <form onSubmit={handleSubmit} className="booking-form">
          <div>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleChange} 
              placeholder="Name" 
              required 
            />
          </div>
          <div>
            <input 
              type="text" 
              name="phoneNumber" 
              value={formData.phoneNumber} 
              onChange={handleChange} 
              placeholder="Phone Number" 
              required 
            />
          </div>
          <div>
            <input 
              type="text" 
              name="pickupLocation" 
              value={formData.pickupLocation} 
              onChange={handleChange} 
              placeholder="Pickup Location" 
              required 
            />
          </div>
          <div>
            <input 
              type="text" 
              name="dropLocation" 
              value={formData.dropLocation} 
              onChange={handleChange} 
              placeholder="Drop Location" 
              required 
            />
          </div>

          <div>
            {isCarSelected ? (
              <>
                <input 
                  type="text" 
                  name="vehicleType" 
                  value={formData.vehicleType} 
                  readOnly 
                  placeholder="Vehicle Type" 
                  required 
                />
                <button type="button" onClick={handleChangeVehicle}>
                  Change Car
                </button>
              </>
            ) : (
              <button type="button" onClick={handleSelectVehicle}>
                Select Vehicle
              </button>
            )}
          </div>

          <div>
            <input 
              type="datetime-local" 
              name="pickupDateTime" 
              value={formData.pickupDateTime} 
              onChange={handleChange} 
              required 
              placeholder="Pickup Date & Time"
            />
          </div>

          <div>
            <textarea 
              name="notes" 
              value={formData.notes} 
              onChange={handleChange} 
              placeholder="Notes (optional)"
            />
          </div>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Submitting...' : 'Submit Booking'}
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          {confirmationMessage && <p className="confirmation-message">{confirmationMessage}</p>}
        </form>
      </div>

      <Footer />
    </>
  );
};

export default Booking;
