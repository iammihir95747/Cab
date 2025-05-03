import React from 'react'
import './footer.css'
import { MdEmail, MdPhone } from 'react-icons/md' // import icons

const Footer = () => {
  return (
    <div>
      <footer className="footer">
        <div className="footer-section pages">
          <h3>About us</h3>
          <h6>
            When it’s about your Business, Trust the name Trusted for over 15 years.
            All the machines can be seen in running condition at our factory.
          </h6>
        </div>

        <div className="footer-section social-media">
          <h3>Follow Us</h3>
          <ul>
            <li>
              <MdEmail className="footer-icon" />
              <span>gohelvivek0000@gmail.com</span>
            </li>
            <li>
              <MdPhone className="footer-icon" />
              <span>+91 9054891423</span>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  )
}

export default Footer
