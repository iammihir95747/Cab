import React from 'react';
import './Booking2.css';

const BookingSteps = () => {
  const steps = [
    {
      title: "Register or Login",
      description: "Create an account or register your phone number to get started."
    },
    {
      title: "Select a Car & Book",
      description: "Choose your preferred vehicle and complete your booking easily."
    },
    {
      title: "Wait for Driver's Response",
      description: "Driver will confirm your booking and contact you shortly."
    }
  ];

  return (
    <section className="booking-steps">
      <h2 className="booking-steps-title">How to Book a Taxi</h2>
      <div className="steps-container">
        {steps.map((step, index) => (
          <div className="step-card" key={index}>
            <div className="step-number">Step {index + 1}</div>
            <h3 className="step-title">{step.title}</h3>
            <p className="step-description">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BookingSteps;
