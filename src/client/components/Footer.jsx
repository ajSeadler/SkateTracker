import React from "react";
import "../styles/Footer.css"; // Ensure you link the CSS file
import { FaTwitter, FaInstagram, FaGithub } from "react-icons/fa"; // React Icons for social media

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-nav">
          <a href="#home" className="footer-link">
            Home
          </a>
          <a href="#track" className="footer-link">
            Track
          </a>
          <a href="#events" className="footer-link">
            Events
          </a>
          <a href="#about" className="footer-link">
            About
          </a>
        </div>
        <div className="footer-social">
          <a
            href="https://twitter.com"
            className="social-icon"
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
          <a
            href="https://instagram.com"
            className="social-icon"
            aria-label="Instagram"
          >
            <FaInstagram />
          </a>
          <a
            href="https://github.com"
            className="social-icon"
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; {new Date().getFullYear()} SkateTracker. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
