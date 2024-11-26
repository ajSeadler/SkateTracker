import React from "react";
import { Link } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import HealingIcon from "@mui/icons-material/Healing";
import InsightsIcon from "@mui/icons-material/Insights";
import ExampleTricks from "./ExampleTricks";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <>
      <div className="homepage">
        <section className="hero">
          <div className="hero-content">
            <h1>Welcome to SkateMedia!</h1>
            <p>
              Track every trick you’ve learned and challenge yourself to master
              new ones.
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
            <div className="feature-icon">
              <TrackChangesIcon
                style={{ fontSize: "3rem", color: "#eef152" }}
              />
            </div>
            <h3>Track Tricks</h3>
            <p>Log tricks, monitor growth, and set personal records.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <HealingIcon style={{ fontSize: "3rem", color: "#eef152" }} />
            </div>
            <h3>Personalized Recovery</h3>
            <p>Tailored plans to optimize your comeback after injuries.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <InsightsIcon style={{ fontSize: "3rem", color: "#eef152" }} />
            </div>
            <h3>Performance Insights</h3>
            <p>Analyze stats and trends to elevate your skills.</p>
          </div>
          <p style={{ fontStyle: "italic", color: "#ddd", paddingTop: "5%" }}>
            Get a glimps below!
          </p>
        </section>
        <ExampleTricks />
      </div>
    </>
  );
};

export default HomePage;
