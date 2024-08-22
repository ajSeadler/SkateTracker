import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import "../styles/Community.css";
import useUserData from "../hooks/useUserData"; // Import the custom hook

const Community = () => {
  const [users, setUsers] = useState([]);
  const { tricks } = useUserData(); // Destructure tricks from the hook

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users"); // Adjust the endpoint as needed
        const data = await response.json();
        setUsers(data.users || []);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <>
      <div className="community-paper">
        <div className="community-container">
          <h2 className="community-heading">Community</h2>
          {users.length === 0 ? (
            <p>No users found.</p>
          ) : (
            users.map((user) => {
              const userTricks = tricks.filter(
                (trick) => trick.user_id === user.id
              ); // Filter tricks by user ID

              return (
                <div key={user.id} className="community-card">
                  <div className="avatar-container">
                    <Avatar
                      src="/path/to/avatar.png" // Replace with user's avatar path
                      alt={user.name}
                      className="community-avatar"
                    />
                    <div>
                      <h3 className="community-name">{user.name}</h3>
                    </div>
                  </div>
                  <div className="community-details">
                    <p className="community-detail">
                      <strong>
                        {user.first_name} {user.last_name}
                      </strong>
                    </p>

                    <p className="community-detail">
                      <strong>Number of Tricks:</strong> {userTricks.length}
                    </p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
};

export default Community;
