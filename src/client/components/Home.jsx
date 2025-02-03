import React from "react";
import { Link } from "react-router-dom";
import TrackChangesIcon from "@mui/icons-material/TrackChanges";
import HealingIcon from "@mui/icons-material/Healing";
import InsightsIcon from "@mui/icons-material/Insights";
import { motion } from "framer-motion";
import "../styles/HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.h1
            className="hero-title"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
          >
            Take Your Skating to the Next Level!
          </motion.h1>
          <motion.p
            className="hero-subtitle"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            Track progress, challenge yourself, and connect with other skaters
            in a fully interactive experience.
          </motion.p>
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
        <FeatureCard
          Icon={TrackChangesIcon}
          title="Track Tricks"
          description="Log tricks, monitor growth, and set personal records."
        />
        <FeatureCard
          Icon={HealingIcon}
          title="Personalized Recovery"
          description="Tailored plans to optimize your comeback after injuries."
        />
        <FeatureCard
          Icon={InsightsIcon}
          title="Performance Insights"
          description="Analyze stats and trends to elevate your skills."
        />
      </section>

      {/* Community Section */}
      <section className="community">
        <h2>Join the Skate Community</h2>
        <p>
          Connect with skaters worldwide, share progress, and learn from the
          best. Be part of an ever-growing skateboarding network.
        </p>
        <Link to="/community">
          <button className="cta-btn">Join Now</button>
        </Link>
      </section>
    </div>
  );
};

const FeatureCard = ({ Icon, title, description }) => (
  <motion.div
    className="feature-card"
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
  >
    <Icon className="feature-icon" />
    <h3>{title}</h3>
    <p>{description}</p>
  </motion.div>
);

export default HomePage;
