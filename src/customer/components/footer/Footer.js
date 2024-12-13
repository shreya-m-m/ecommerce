import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/about">About</a>
        <div className="contact-info">
          <p style={{ color: "white" }}>Contact Us</p>
          <div>
            <p style={{ color: "white" }}>Trendinsta, Bsk 3rd Stage, Banglore</p>
            <p style={{ color: "white" }}>Phone: 8616753248</p>
            <p style={{ color: "white" }}>Email: trendista@gmail.com</p>
          </div>
        </div>
      </div>

      <div className="footer-icons">
        <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
        <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
        <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fas fa-times"></i></a> {/* Replace with your custom icon and link */}
      </div>
      <div className="footer-copyright">
        © 2024 Your Company, Inc. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
