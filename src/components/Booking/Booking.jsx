import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast"; // Import toast and Toaster from react-hot-toast
import './Booking.css'; // Assuming you're still using the same styling from Contact.css
import Footer from '../Footer/Footer';
import Bookingsteps from '../Booking/Bookingsteps/Bookingsteps'

const Booking = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    pickupLocation: "",
    dropoffLocation: "",
    pickupDateTime: "",
    bookingType: "one-way", // Default type is "one-way"
    notes: "",
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [message, setMessage] = useState("");

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate phone number (10 digits)
  const validatePhoneNumber = (phoneNumber) => {
    const phoneRegex = /^[0-9]{10}$/;
    return phoneRegex.test(phoneNumber);
  };

  // Validate all required fields
  const validateForm = () => {
    if (!formData.name) {
      toast.error("Name is required.");
      return false;
    }
    if (!formData.email) {
      toast.error("Email is required.");
      return false;
    }
    if (!formData.phoneNumber) {
      toast.error("Phone number is required.");
      return false;
    }
    if (!validatePhoneNumber(formData.phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return false;
    }
    if (!formData.pickupLocation) {
      toast.error("Pickup location is required.");
      return false;
    }
    if (!formData.dropoffLocation) {
      toast.error("Dropoff location is required.");
      return false;
    }
    if (!formData.pickupDateTime) {
      toast.error("Pickup date and time are required.");
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous success messages

    // Validate the form before submission
    if (!validateForm()) {
      return; // Stop form submission if validation fails
    }

    const bookingData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      pickupLocation: { description: formData.pickupLocation },
      dropoffLocation: { description: formData.dropoffLocation },
      pickupDateTime: formData.pickupDateTime,
      bookingType: formData.bookingType,
      notes: formData.notes,
    };

    try {
      const response = await fetch("https://cabserver.onrender.com/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bookingData),
      });

      const result = await response.json();

      if (!response.ok) {
        // Show the backend error in a toast notification
        toast.error(result?.message || "Something went wrong.");
        return;
      }

      setMessage("Booking submitted successfully!");
      toast.success("Booking submitted successfully!");

      setSubmittedData(bookingData);
    } catch (err) {
      console.error("Error making the booking:", err);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
    <div className="contact-container">
      <div className="contact-info-box">
        <h2 className="contact-subtitle">Ready for Your Ride?</h2>
        <h1 className="contact-title">BOOK A RIDE</h1>

        {/* Booking Info Section */}
        <div className="contact-section">
          <h3>Contact Us</h3>
          <p>
          prahlad nagar seema hall the grand monarch ahmedabad - 380015
          </p>
        </div>

        <div className="contact-section">
          <h3>Call Us</h3>
          <p>+91 9054891423<br />gohelvivek0000@gmail.com</p>
        </div>

        <div className="contact-section">
          <h3>Business Hours</h3>
          <p>Mon- Fri: 9am - 8pm<br />Sat-Sun: 10am - 4pm</p>
        </div>
        <div className="contact-section">
          <h3>booking cancellation is not available for now</h3>
         
        </div>
      </div>

      <div className="contact-form-box">
        <h2 className="form-heading">
          Book Your Ride Now, We'll Handle The Rest!
        </h2>

        <form onSubmit={handleSubmit} className="contact-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
          />
          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            type="text"
            name="pickupLocation"
            placeholder="Pickup Location"
            value={formData.pickupLocation}
            onChange={handleChange}
          />
          <input
            type="text"
            name="dropoffLocation"
            placeholder="Dropoff Location"
            value={formData.dropoffLocation}
            onChange={handleChange}
          />
          <input
            type="datetime-local"
            name="pickupDateTime"
            value={formData.pickupDateTime}
            onChange={handleChange}
          />
          <select
            name="bookingType"
            value={formData.bookingType}
            onChange={handleChange}
          >
            <option value="one-way">One Way</option>
            <option value="round-trip">Round Trip</option>
            <option value="tour">Tour</option>
          </select>
          <textarea
            name="notes"
            placeholder="Additional Notes"
            value={formData.notes}
            onChange={handleChange}
          ></textarea>

          <button type="submit">Submit Booking</button>
        </form>
      </div>

      {/* Toast Container for notifications */}
      <Toaster
        position="top-center"
        reverseOrder={false}
        toastOptions={{
          style: {
            background: "#333",
            color: "#fff", // White text
            padding: "10px",
            borderRadius: "8px",
            fontSize: "14px",
          },
          error: {
            style: {
              background: "#000000", // Red background for error
            },
          },
          success: {
            style: {
              background: "#000000", // Green background for success
            },
          },
        }}
      />
      
    </div>

    <Bookingsteps />
    <Footer />


    </>
  );
};

export default Booking;
