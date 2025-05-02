import React from 'react'
import './footer.css'

const Footer = () => {
  return (
    <div>
         <footer className="footer">
      <div className="footer-section places">
        <h3>Places in Gujarat</h3>
        <ul>
          <li>Ahmedabad</li>
          <li>Surat</li>
          <li>Vadodara</li>
          <li>Rajkot</li>
          <li>Gandhinagar</li>
          <li>Bhavnagar</li>
          <li>Junagadh</li>
          <li>Jamnagar</li>
        </ul>
      </div>
      
      <div className="footer-section pages">
        <h3>Website Pages</h3>
        <ul>
          <li>Home</li>
          <li>Booking</li>
          <li>Services</li>
          <li>Pricing</li>
          <li>About Us</li>
          <li>Contact</li>
        </ul>
      </div>
      
      <div className="footer-section social-media">
        <h3>Follow Us</h3>
        <ul>
          <li><a href="https://facebook.com">Facebook</a></li>
          <li><a href="https://twitter.com">Twitter</a></li>
          <li><a href="https://instagram.com">Instagram</a></li>
          <li><a href="https://linkedin.com">LinkedIn</a></li>
        </ul>
      </div>
    </footer>
    </div>
  )
}

export default Footer
