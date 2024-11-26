import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Check for token in localStorage or sessionStorage on component mount
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token"); // Or sessionStorage.removeItem if using session storage
    setToken(null); // Remove token from state
    toggleMenu(); // Close menu if open
  };

  return (
    <>
      <header className="header">
        <div className="logo">
          <Link to="/" className={isActive("/") ? "active-link" : ""}>
            Skate<span style={{ fontWeight: "100" }}>Media</span>
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
            to="/community"
            className={isActive("/community") ? "active-link" : ""}
          >
            Media
          </Link>
          <Link to="/me" className={isActive("/me") ? "active-link" : ""}>
            Profile
          </Link>
          {token ? (
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup">
                <button className="login-btn">Sign Up</button>
              </Link>
            </>
          )}
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
            to="/community"
            className={isActive("/community") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Media
          </Link>
          <Link
            to="/me"
            className={isActive("/me") ? "active-link" : ""}
            onClick={toggleMenu}
          >
            Profile
          </Link>
          {token ? (
            <button onClick={handleLogout} className="login-btn">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" onClick={toggleMenu}>
                <button className="login-btn">Login</button>
              </Link>
              <Link to="/signup" onClick={toggleMenu}>
                <button className="login-btn">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Nav;
