import React, { useState, useEffect } from "react";
import "../styles/Recoveries.css";

const Recoveries = ({ userId }) => {
  const [recoveries, setRecoveries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedRecoveries, setAddedRecoveries] = useState(new Set());
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);

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

  const addRecoveryToUser = async (recoveryId) => {
    try {
      const response = await fetch(`/api/recoveries/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Ensure token is included if required
        },
        body: JSON.stringify({ recoveryId }), // Pass recoveryId in the request body
      });
  
      if (!response.ok) {
        throw new Error("Failed to add recovery");
      }
  
      const result = await response.json();
      console.log("Recovery added:", result);
    } catch (error) {
      console.error("Error adding recovery:", error);
    }
  };
  

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="recoveries-container">
      <div className="recoveries-list">
        {recoveries.map((recovery) => (
          <div key={recovery.id} className="recovery-card">
            <div className="recovery-header">
              <div className="recovery-icon">
                {/* Placeholder for an icon, if applicable */}
              </div>
              <h2 className="recovery-name">{recovery.name}</h2>
            </div>
            <p className="recovery-description">{recovery.description}</p>
            <p className="recovery-date">
              {new Date(recovery.created_at).toLocaleDateString()}
            </p>
            <button
              onClick={() => addRecoveryToUser(recovery.id, recovery.name)}
              disabled={addedRecoveries.has(recovery.id)} // Disable button if recovery is already added
            >
              {addedRecoveries.has(recovery.id)
                ? "Added"
                : "Add to My Recoveries"}
            </button>
            {addedRecoveries.has(recovery.id) && (
              <p className="added-message">Recovery added!</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Recoveries;
