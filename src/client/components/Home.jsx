import React from "react";
import Nav from "./Nav";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Navigation Component */}
      <Nav />

      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Master Your Skills & Recover Like a Pro</h1>
          <p>
            Track every trick you’ve learned and monitor your recovery progress
            with personalized exercises.
          </p>
          <div className="hero-buttons">
            <button className="cta-btn">Get Started</button>
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
  );
};

export default HomePage;
