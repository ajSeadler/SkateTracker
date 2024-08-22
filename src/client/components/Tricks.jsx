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

  const addTrickToUser = async (trickId) => {
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
      alert(result.message || "Trick added successfully");

      // Update the UI by marking the trick as added
      setAddedTricks((prev) => new Set(prev).add(trickId));
    } catch (error) {
      console.error("Error adding trick:", error);
      alert("There was an error adding the trick");
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  return (
    <div className="tricks-container">
      <h1 className="tricks-title">Tricks To Track</h1>
      <div className="tricks-list">
        {tricks.map((trick) => (
          <div key={trick.trick_id} className="trick-card">
            <h2 className="trick-name">{trick.name}</h2>
            <p className="trick-description">{trick.description}</p>
            <button
              onClick={() => addTrickToUser(trick.trick_id)}
              disabled={addedTricks.has(trick.trick_id)} // Disable button if trick is already added
            >
              {addedTricks.has(trick.trick_id) ? "Added" : "Add to My Tricks"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tricks;
