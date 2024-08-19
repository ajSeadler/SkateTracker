import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/">SkateTracker</Link>
        </div>
        <nav className="nav">
          <Link to="/">Home</Link>
          <Link to="/track-tricks">Track Tricks</Link>
          <Link to="/recoveries">Recoveries</Link>
          <Link to="/community">Community</Link>
          <Link to="/me">Profile</Link>
        </nav>
        <Link to="/login">
          <button className="login-btn">Login / Sign Up</button>
        </Link>
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
          <Link to="/" onClick={toggleMenu}>
            Home
          </Link>
          <Link to="/track-tricks" onClick={toggleMenu}>
            Track Tricks
          </Link>
          <Link to="/recoveries" onClick={toggleMenu}>
            Recoveries
          </Link>
          <Link to="/community" onClick={toggleMenu}>
            Community
          </Link>
          <Link to="/me" onClick={toggleMenu}>
            Profile
          </Link>
          <Link to="/login" onClick={toggleMenu}>
            <button className="login-btn">Login / Sign Up</button>
          </Link>
        </div>
      )}
    </>
  );
};

export default Nav;
