import React from "react";
import { Link } from "react-router-dom";
import "../styles/Nav.css";

const Nav = () => {
  return (
    <header className="header">
      <div className="logo">
        <Link to="/">SkateTracker</Link>
      </div>
      <nav className="nav">
        <Link to="/">Home</Link>
        <Link to="/track-tricks">Track Tricks</Link>
        <Link to="/recovery">Recovery Progress</Link>
        <Link to="/community">Community</Link>
        <Link to="/profile">Profile</Link>
      </nav>
      <Link to="/login">
        <button className="login-btn">Login / Sign Up</button>
      </Link>
    </header>
  );
};

export default Nav;
