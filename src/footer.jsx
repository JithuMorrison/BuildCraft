// src/Footer.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="home-footer">
      <div className="footer-content">
        <p>&copy; 2024 BuildCraft. All rights reserved.</p>

        <div className="footer-links">
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>Email: jithus2004@gmail.com</p>
            <p>Phone: 898970001</p>
          </div>
          <div className="privacy-policy">
            <h4>Privacy Policy</h4>
            <p>Your privacy is important to us. Please review our <a href="#privacy" className="footer-link">Privacy Policy</a> for more information.</p>
          </div>
        </div>

        <nav className="footer-nav">
          <ul>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#privacy">Blogs</a></li>
          </ul>
        </nav>
        <div className="social-media">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

