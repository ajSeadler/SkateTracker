import { useState, useEffect } from "react";
import "../styles/Tricks.css";

const Tricks = ({ userId }) => {
  const [tricks, setTricks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedTricks, setAddedTricks] = useState(new Set());
  const [token, setToken] = useState(null); // Add state for the token

  useEffect(() => {
    // Retrieve token from localStorage or context
    const storedToken = localStorage.getItem("token"); // Adjust this based on where your token is stored
    setToken(storedToken);

    const fetchTricks = async () => {
      try {
        const response = await fetch("/api/tricks");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTricks(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchTricks();
  }, []); // Empty dependency array ensures this runs only once

  const addTrickToUser = async (trickId, trickName) => {
    if (!token) {
      alert("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(`/api/tricks/user/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Use the token here
        },
        body: JSON.stringify({ trickId, userId }), // Send the userId with the request
      });

      if (!response.ok) {
        throw new Error("Failed to add trick");
      }

      const result = await response.json();

      // Update the UI by marking the trick as added
      setAddedTricks((prev) => new Set(prev).add(trickId));
    } catch (error) {
      console.error("Error adding trick:", error);
      // Handle error appropriately
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  // Organize tricks by category
  const categorizedTricks = tricks.reduce((acc, trick) => {
    if (!acc[trick.category]) {
      acc[trick.category] = [];
    }
    acc[trick.category].push(trick);
    return acc;
  }, {});

  return (
    <div className="tricks-container">
      {Object.entries(categorizedTricks).map(([category, tricks]) => (
        <div key={category} className="category-section">
          <h2 className="category-title">{category}</h2>
          <div className="tricks-list">
            {tricks.map((trick) => (
              <div key={trick.trick_id} className="trick-card">
                <h3 className="trick-name">{trick.name}</h3>
                <p className="trick-description">{trick.difficulty_level}</p>
                <p className="trick-description">{trick.description}</p>
                <button
                  onClick={() => addTrickToUser(trick.trick_id, trick.name)}
                  disabled={addedTricks.has(trick.trick_id)} // Disable button if trick is already added
                >
                  {addedTricks.has(trick.trick_id)
                    ? "Added"
                    : "Add to My Tricks"}
                </button>
                {addedTricks.has(trick.trick_id) && (
                  <p className="added-message">Trick added!</p>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Tricks;
