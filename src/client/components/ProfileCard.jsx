// ProfileCard.js
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  LinearProgress,
} from "@mui/material";
import { Star } from "@mui/icons-material";
import MyPosts from "./MyPosts"; // Import MyPosts component
import Goals from "./Goals";
import "../styles/ProfilePage.css";

const ProfileCard = ({ userData, tricks, trickGoals, trickGoalsLoading }) => {
  const [totalTricks, setTotalTricks] = useState(0);
  const [masteredTricks, setMasteredTricks] = useState(0);

  useEffect(() => {
    if (tricks) {
      // Set the total number of tricks based on the user's tricks
      setTotalTricks(tricks.length);

      // Calculate mastered tricks
      const masteredCount = tricks.filter(
        (trick) => trick.status === "mastered"
      ).length;
      setMasteredTricks(masteredCount);
    }
  }, [tricks]);

  if (!userData) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const masteredPercentage =
    totalTricks > 0 ? (masteredTricks / totalTricks) * 100 : 0;

  return (
    <>
      <div className="profile-sidebar">
        <Card className="profile-info-card" elevation={0}>
          <CardContent className="profile-info">
            <div className="avatar-container">
              <Avatar
                alt={userData.name}
                src={userData.profile_picture || "/default-avatar.png"}
                className="profile-avatar"
              />
            </div>
            <Typography variant="h5" className="profile-name">
              {userData.name}
            </Typography>
            <Typography variant="body1" className="profile-detail">
              <strong>
                {userData.first_name} {userData.last_name}
              </strong>
            </Typography>
            <div className="profile-details">
              <Typography variant="body1" className="profile-detail">
                <strong>{userData.email}</strong>
              </Typography>
              <div className="feed-description">
                <h2>Bio</h2>
                <p>{userData.description}</p>
              </div>
              <Typography variant="body1" className="profile-detail">
                <div style={{ display: "flex", alignItems: "center" }}>
                  <Star style={{ color: "yellow" }} />
                  <strong style={{ marginLeft: "8px" }}>Tricks Mastered</strong>
                </div>
                <div style={{ marginTop: "8px" }}>
                  <LinearProgress
                    variant="determinate"
                    value={masteredPercentage}
                    sx={{
                      height: 10,
                      borderRadius: 5,
                      backgroundColor: "#e0e0e0", // The color of the unfilled part of the bar
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: "#ee1d52", // The filled portion color
                      },
                    }}
                  />
                  <Typography
                    variant="body2"
                    color="textPrimary"
                    style={{ marginTop: "4px", color: "#ddd" }}
                  >
                    {masteredTricks} / {totalTricks} Tricks
                  </Typography>
                </div>
              </Typography>
              <div className="goals">
                <Goals
                  trickGoals={trickGoals}
                  trickGoalsLoading={trickGoalsLoading}
                />
              </div>
              {/* MyPosts component showing user posts */}
              <MyPosts userId={userData.id} />
            </div>
            <Divider className="profile-divider" />
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileCard;
