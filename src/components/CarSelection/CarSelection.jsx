import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarSelection.css'; // Custom styling

const API_VITE = "https://cabserver.onrender.com";
const WHATSAPP_BUSINESS_NUMBER = '+919574713004 '; // Your WhatsApp Business number (replace with actual)

const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const navigate = useNavigate();

  // Fetch available cars
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_VITE}/api/vehicles/available`);
      setCars(response.data);  // Assuming response.data contains car information
      setLoading(false);
    } catch (error) {
      setError("Failed to load cars.");
      setLoading(false);
    }
  };

  // Handle "Book Now" button click
  const handleBookNow = (car) => {
    const bookingDetails = `
      *Booking Details:*
      Model: ${car.modelName}
      Type: ${car.type}
      Seats: ${car.capacity}
      Rate: ₹${car.ratePerKm}/km
      Base Fare: ₹${car.baseFare}
      Pickup Location: [User's Pickup Location]  // Replace with dynamic location
      Dropoff Location: [User's Dropoff Location] // Replace with dynamic location
    `;
    
    // URL encode the message for WhatsApp
    const encodedMessage = encodeURIComponent(bookingDetails);
    
    // WhatsApp link with pre-filled message
    const whatsappLink = `https://wa.me/${WHATSAPP_BUSINESS_NUMBER}?text=${encodedMessage}`;
    
    // Open WhatsApp with the pre-filled message
    window.open(whatsappLink, '_blank');
  };

  // Fetch cars on component mount
  React.useEffect(() => {
    fetchCars();
  }, []);

  return (
    <section id="car-selection" className="container my-5">
      <h2 className="text-center mb-4">Select a Car</h2>
      <div className="row justify-content-center">
        {loading ? (
          <p>🚗 Car is loading...</p>
        ) : error ? (
          <p className="text-danger">❌ {error}</p>
        ) : (
          cars.map((car, index) => (
            <div key={index} className="car-card col-md-4 mb-4">
              <div className="card h-100 text-center shadow p-3">
                <img
                  src={car.imageUrl}
                  alt={car.modelName}
                  className="card-img-top"
                  style={{ height: '200px', objectFit: 'cover' }}
                />
                <div className="card-body">
                  <h5 className="card-title">{car.modelName}</h5>
                  <p className="card-text">Type: {car.type}</p>
                  <p className="card-text">Seats: {car.capacity}</p>
                  <p className="card-text">Rate: ₹{car.ratePerKm}/km</p>
                  <p className="card-text">Base Fare: ₹{car.baseFare}</p>
                  <button className="btn btn-primary" onClick={() => handleBookNow(car)}>Book Now</button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </section>
  );
};

export default CarSelection;
