import React, { useState, useEffect } from "react";
import "../styles/Tricks.css"; // Ensure this CSS file exists for styling

const Tricks = () => {
  const [tricks, setTricks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTricks = async () => {
      try {
        const response = await fetch("/api/tricks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log("API Response Data:", data); // Log response data for debugging
        if (Array.isArray(data) && data.length > 0) {
          setTricks(data);
        } else {
          throw new Error("Unexpected response structure");
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTricks();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="tricks-container">
      <h1 className="tricks-title">Tricks To Track</h1>
      <div className="tricks-subtitle">
        <p>Here are a few basic tricks to get you started.</p>
        <p>Create an account to unlock more!</p>
      </div>
      <div className="tricks-list">
        {tricks.map((trick) => (
          <div key={trick.trick_id} className="trick-card">
            <h2 className="trick-name">{trick.name}</h2>
            <p className="trick-description">{trick.description}</p>
            <p className="trick-date">
              {new Date(trick.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tricks;
