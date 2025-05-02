import React from 'react';
import './FooterBar.css'; // Import the external CSS file

function FooterBar() {
  return (
    <div className="footer-bar">
      <div className="contact-info">
        <div className="phone">
          <i className="fas fa-phone-alt"></i> {/* Assuming you're using Font Awesome */}
          <span>+91 9054891423</span>
        </div>
        <div className="email">
          <i className="far fa-envelope"></i> {/* Assuming you're using Font Awesome */}
          <span>gohelvivek0000@gmail.com</span>
        </div>
        <div className="address">
          <i className="fas fa-map-marker-alt"></i> {/* Assuming you're using Font Awesome */}
          <span>Near Shiv Leela Hotel, Under Bridge Road, Samanagar, Jamnagar - 361004</span>
        </div>
      </div>
      <div className="social-icons">
        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fas fa-search"></i></a> {/* Example icons */}
        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f"></i></a>
        <a href="#" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
      </div>
    </div>
  );
}

export default FooterBar;