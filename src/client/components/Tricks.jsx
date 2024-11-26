import { useState, useEffect } from "react";
import "../styles/Tricks.css";

const Tricks = ({ userId }) => {
  const [tricks, setTricks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addedTricks, setAddedTricks] = useState(new Set());
  const [userTricks, setUserTricks] = useState(new Set()); // State for user tricks
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
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

    const fetchUserTricks = async () => {
      try {
        const response = await fetch(`/api/tricks/user`, {
          headers: {
            Authorization: `Bearer ${storedToken}`,
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user tricks");
        }
        const data = await response.json();
        setUserTricks(new Set(data.map((trick) => trick.trick_id))); // Assuming user tricks have trick_id
      } catch (error) {
        console.error("Error fetching user tricks:", error);
      }
    };

    fetchTricks();
    if (storedToken) {
      fetchUserTricks();
    }
  }, []);

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
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ trickId, userId }),
      });

      if (!response.ok) {
        throw new Error("Failed to add trick");
      }

      const result = await response.json();
      setAddedTricks((prev) => new Set(prev).add(trickId));
    } catch (error) {
      console.error("Error adding trick:", error);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

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
                {userTricks.has(trick.trick_id) ? ( // Check if trick is already added
                  <p className="added-message">Trick already added!</p>
                ) : (
                  <button
                    onClick={() => addTrickToUser(trick.trick_id)}
                    disabled={addedTricks.has(trick.trick_id)}
                  >
                    {addedTricks.has(trick.trick_id)
                      ? "Added"
                      : "Add to My Tricks"}
                  </button>
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
