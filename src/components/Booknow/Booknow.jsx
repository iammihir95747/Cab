import React from 'react';
import axios from 'axios';

const BookNow = ({ pickupLocation, dropLocation, vehicleType, phoneNumber, driverPhoneNumber }) => {
  const handleBooking = () => {
    const bookingDetails = {
      pickupLocation,
      dropLocation,
      vehicleType,
      phoneNumber, // User's phone number for WhatsApp
      pickupDateTime: new Date().toISOString(), // Current date-time for pickup
      notes: 'Booking from the website', // Optional notes
      driverPhoneNumber, // Driver's phone number to send details
    };

    axios
      .post('http://localhost:5001/api/send-booking', bookingDetails)
      .then((response) => {
        console.log('Booking confirmed:', response.data);
      })
      .catch((error) => {
        console.error('Error sending booking:', error);
      });
  };

  return (
    <button onClick={handleBooking}>
      Book {vehicleType} from {pickupLocation} to {dropLocation}
    </button>
  );
};

export default BookNow;
