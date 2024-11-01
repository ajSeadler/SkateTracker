// src/pages/HomePage.js
import React from "react";
import HeroBackground from "../components/HeroBackground";
import { Link } from "react-router-dom";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        {/* Navigation Component */}

        {/* Hero Section */}
        <section className="hero">
          <HeroBackground />
          <div className="hero-content">
            <h1>Welcome To SkateTracker</h1>
            <p>
              Track every trick you’ve ever learned, then push yourself to learn more.
            </p>
            <div className="hero-buttons">
            <Link to="/track-tricks">
  <button className="cta-btn">Get Started</button>
</Link>
              <button className="secondary-btn">Learn More</button>
            </div>
          </div>
        </section>

        {/* Key Features Section */}
        <section className="features">
          <div className="feature-card">
            <div className="feature-icon">🛹</div>
            <h3>Track Your Tricks</h3>
            <p>Log every trick, track your progress, and set goals.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">➕</div>
            <h3>Monitor Recovery</h3>
            <p>Custom recovery plans tailored to your injuries and progress.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analyze Performance</h3>
            <p>Get detailed analytics and insights on your progress.</p>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
