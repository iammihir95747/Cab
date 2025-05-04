import React, { useState } from 'react';
import axios from 'axios';

const BookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    pickupLocation: '',
    dropLocation: '',
    vehicleType: '',
    pickupDateTime: '',
    notes: '',
  });

  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    setConfirmationMessage('');

    try {
      const response = await axios.post('http://localhost:5001/api/send-booking', formData);

      if (response.data.success) {
        setConfirmationMessage('✅ Booking Request Sent! A driver will confirm your booking soon.');
      } else {
        setErrorMessage('❌ Error submitting your booking. Please try again later.');
      }
    } catch (error) {
      setErrorMessage('❌ Error: ' + error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="booking-form-container">
      <h2>Car Booking Form</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pickup Location:</label>
          <input
            type="text"
            name="pickupLocation"
            value={formData.pickupLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Drop Location:</label>
          <input
            type="text"
            name="dropLocation"
            value={formData.dropLocation}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Vehicle Type:</label>
          <input
            type="text"
            name="vehicleType"
            value={formData.vehicleType}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Pickup Date & Time:</label>
          <input
            type="datetime-local"
            name="pickupDateTime"
            value={formData.pickupDateTime}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Notes (optional):</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
          />
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Booking'}
        </button>
      </form>

      {confirmationMessage && (
        <div className="confirmation-message">
          <p>{confirmationMessage}</p>
        </div>
      )}

      {errorMessage && (
        <div className="error-message">
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
