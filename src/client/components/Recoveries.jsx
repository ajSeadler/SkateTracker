import React, { useState, useEffect } from "react";
import "../styles/Recoveries.css"; // Make sure to create this CSS file for styling

const Recoveries = () => {
  const [recoveries, setRecoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRecoveries = async () => {
      try {
        const response = await fetch("/api/recoveries");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setRecoveries(data.recoveries);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchRecoveries();
  }, []);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error.message}</div>;
  }

  return (
    <div className="recoveries-container">
      <h1 className="recoveries-title">Recoveries</h1>
      <div className="tricks-subtitle">
        <p>
          No pain, no gain—but let's keep it to a minimum. Stay limber, stay
          strong!
        </p>
        <p>Create an account to unlock exclusive recovery tips and tricks!</p>
      </div>

      <div className="recoveries-list">
        {recoveries.map((recovery) => (
          <div key={recovery.id} className="recovery-card">
            <h2 className="recovery-name">{recovery.name}</h2>
            <p className="recovery-description">{recovery.description}</p>
            <p className="recovery-date">
              {new Date(recovery.created_at).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recoveries;
