import React, { useState, useEffect } from "react";
import "../styles/UserStatus.css";

const MyPosts = ({ userId }) => {
  const [statuses, setStatuses] = useState([]);
  const [error, setError] = useState("");

  // Fetch the user's statuses
  useEffect(() => {
    const fetchUserStatuses = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("User is not logged in.");
          return;
        }

        const statusesResponse = await fetch(`/api/status/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!statusesResponse.ok) {
          const { message } = await statusesResponse.json();
          setError(message || "Failed to fetch statuses.");
          return;
        }

        const { statuses } = await statusesResponse.json();
        setStatuses(statuses);
      } catch (err) {
        setError("An error occurred while fetching statuses.");
      }
    };

    if (userId) {
      fetchUserStatuses();
    }
  }, [userId]);

  // Handle deleting a status
  const handleDelete = async (statusId) => {
    try {
      const response = await fetch(`/api/status/${statusId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        const { message } = await response.json();
        setError(message || "Failed to delete status.");
        return;
      }

      // Remove the deleted status from the UI
      setStatuses(statuses.filter((status) => status.id !== statusId));
    } catch (err) {
      setError("An error occurred while deleting the status.");
    }
  };

  return (
    <div className="post-feed">
      {error && (
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      )}
      {statuses.length === 0 ? (
        <div className="no-posts-card">
          <h4 className="no-posts-header">No Posts Yet</h4>
          <p className="no-posts-subtext">
            Learned a new trick?{" "}
            <a href="/community" className="cta-button">
              Post a Clip!
            </a>
          </p>
        </div>
      ) : (
        // Render your statuses here

        statuses.map((status) => (
          <div key={status.id} className="post">
            <p>{status.content}</p>
            {status.media_url && <img src={status.media_url} alt="Media" />}
            <div className="post-footer">
              <span>
                {/* Use created_at instead of status_date */}
                Posted on {new Date(
                  status.created_at
                ).toLocaleDateString()} at{" "}
                {new Date(status.created_at).toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              {/* Delete button */}
              <button
                className="delete-button"
                onClick={() => handleDelete(status.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default MyPosts;
