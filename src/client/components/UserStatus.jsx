import React, { useState } from "react";
import "../styles/UserStatus.css";
import { FaImage, FaPaperPlane } from "react-icons/fa";

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
      onNewStatus(newStatus);

      setContent("");
      setMediaUrl("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="status-box">
      <textarea
        className="status-input"
        placeholder="Share something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <div className="status-actions">
        <input
          type="text"
          className="media-input"
          placeholder="Media URL (optional)"
          value={mediaUrl}
          onChange={(e) => setMediaUrl(e.target.value)}
        />
        <FaImage className="icon" />
      </div>
      <button className="post-button" onClick={handlePost}>
        <FaPaperPlane /> Post
      </button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default UserStatus;
