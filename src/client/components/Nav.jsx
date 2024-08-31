import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation(); // Get the current location

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" className={isActive("/") ? "active-link" : ""}>
            SkateTracker
          </Link>
        </div>
        <nav className="nav">
          <Link to="/" className={isActive("/") ? "active-link" : ""}>
            Home
          </Link>
          <Link
            to="/trick-bank"
            className={isActive("/trick-bank") ? "active-link" : ""}
          >
            Trick Bank
          </Link>
          <Link
            to="/warm-ups"
            className={isActive("/warm-ups") ? "active-link" : ""}
          >
            Warm-Ups
          </Link>
          <Link
            to="/community"
            className={isActive("/community") ? "active-link" : ""}
          >
            Community
          </Link>
          <Link to="/me" className={isActive("/me") ? "active-link" : ""}>
            Profile
          </Link>
        </nav>
        <button className="menu-toggle" onClick={toggleMenu}>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
          <span className="menu-icon"></span>
        </button>
      </header>
      {isMenuOpen && (
        <div className="mobile-menu">
          <button className="menu-toggle" onClick={toggleMenu}>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
            <span className="menu-icon"></span>
          </button>
          <Link
            to="/"
            className={isActive("/") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Home
          </Link>
          <Link
            to="/trick-bank"
            className={isActive("/trick-bank") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Trick Bank
          </Link>
          <Link
            to="/warm-ups"
            className={isActive("/warm-ups") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Warm-Ups
          </Link>
          <Link
            to="/community"
            className={isActive("/community") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Community
          </Link>
          <Link
            to="/me"
            className={isActive("/me") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Profile
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <button className="login-btn">Login</button>
          </Link>
          <Link to="/signup" onClick={toggleMenu}>
            <button className="login-btn">Sign Up</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Nav;
