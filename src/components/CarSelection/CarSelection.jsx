import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CarSelection.css';
import Footer from "../Footer/Footer"

const API_VITE = "http://localhost:5001";
const WHATSAPP_BUSINESS_NUMBER = '+919574713004';

const CarSelection = () => {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const fetchCars = async () => {
    try {
      const response = await axios.get(`${API_VITE}/api/vehicles`);
      console.log(response.data); // Log the full response
      if (response.data.success) {
        setCars(response.data.vehicles); // Set cars only if the response is successful
      } else {
        setError("Failed to load cars.");
      }
      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load cars.");
      setLoading(false);
    }
  };
  
  const handleBookNow = (car) => {
    const fromBooking = location.state?.fromBooking;
  
    if (fromBooking) {
      navigate('/booking', {
        state: {
          vehicleType: car.modelName,
          carType: car.type,
        },
      });
    } else {
      // If selected from homepage, also go to booking
      navigate('/booking', {
        state: {
          vehicleType: car.modelName,
          carType: car.type,
        },
      });
    }
  };
  

  useEffect(() => {
    fetchCars();
  }, []);

  return (
    <>
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
    </>
  );
};

export default CarSelection;
