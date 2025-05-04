import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarSelection.css'; // Custom styling

// const API_VITE = "https://cabserver.onrender.com";

const WHATSAPP_BUSINESS_NUMBER = '+919574713004'; 
 const API_VITE = "http://localhost:5001";


const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); // loading state
  const [error, setError] = useState(null); // error state
  const navigate = useNavigate();

  // Fetch available cars
  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_VITE}/api/vehicles`);
      console.log(response.data);  // Check if all cars are being returned
      setCars(response.data);  // This should now include all cars, not just Urbania
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
      <div className="row">
        {loading ? (
          <p>🚗 Car is loading...</p>
        ) : error ? (
          <p className="text-danger">❌ {error}</p>
        ) : (
          cars.map((car, index) => (
            <div key={index} className="car-item col-md-4 col-sm-6 col-12">
            <div className="car-box">
              <img
                src={car.imageUrl}
                alt={car.modelName}
                className="car-image"
              />
              <div className="car-info">
                <h5>{car.modelName}</h5>
                <p>Type: {car.type}</p>
                <p>Seats: {car.capacity}</p>
                <p>Rate: ₹{car.ratePerKm}/km</p>
                <p>Base Fare: ₹{car.baseFare}</p>
                <button className="book-btn" onClick={() => handleBookNow(car)}>Book Now</button>
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
