import React, { useEffect, useState } from "react";
import UserStatus from "./UserStatus";
import Avatar from "@mui/material/Avatar";
import "../styles/Community.css";

const Community = () => {
  const [statuses, setStatuses] = useState([]);

  // Fetch statuses on component mount
  useEffect(() => {
    const fetchStatuses = async () => {
      try {
        const statusResponse = await fetch("/api/status"); // Adjust the endpoint as needed
        const statusData = await statusResponse.json();
        setStatuses(statusData.statuses || []);
      } catch (error) {
        console.error("Error fetching statuses:", error);
      }
    };

    fetchStatuses();
  }, []);

  // Handler function to add a new status to the statuses array
  const handleNewStatus = (newStatus) => {
    setStatuses((prevStatuses) => [newStatus, ...prevStatuses]);
  };

  return (
    <div className="community-paper">
      <div className="community-container">
        {/* Pass handleNewStatus function to UserStatus */}
        <UserStatus onNewStatus={handleNewStatus} />
        {statuses.length === 0 ? (
          <p>No statuses found.</p>
        ) : (
          statuses.map((status) => {
            return (
              <div key={status.id} className="community-card">
                <div className="avatar-container">
                  <Avatar
                    src="/path/to/default-avatar.png" // Replace with a default avatar image or use username to fetch avatar
                    alt={status.username}
                    className="community-avatar"
                  />
                  <div>
                    <h3 className="community-name">{status.username}</h3>
                    <p className="community-time">
                      {new Date(status.created_at).toLocaleDateString()} at{" "}
                      {new Date(status.created_at).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>
                <div className="community-details">
                  <p className="community-detail">{status.content}</p>
                  {status.media_url && (
                    <img
                      src={status.media_url}
                      alt="media"
                      className="community-status-media"
                    />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Community;
