import React, { useState } from "react";
import "../styles/UserStatus.css";

const UserStatus = ({ onNewStatus }) => {
  const [content, setContent] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [error, setError] = useState("");

  const handlePost = async () => {
    if (!content.trim()) {
      setError("Content is required to post a status.");
      return;
    }

    const statusData = { content, media_url: mediaUrl || null };

    try {
      const response = await fetch("/api/status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(statusData),
      });

      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message || "Failed to post status.");
      }

      const { newStatus } = await response.json();

      // Call the onNewStatus function to add the new status to the list in Community component
      onNewStatus(newStatus);

      // Clear the input fields and error
      setContent("");
      setMediaUrl("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="post-form">
      <textarea
        placeholder="New trick to share?"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <input
        type="text"
        placeholder="Media URL (optional)"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
      />
      <button onClick={handlePost}>Post</button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserStatus;
