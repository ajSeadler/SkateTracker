// components/ProfileCard.js
import React from "react";
import { Card, CardContent, Typography, Avatar, Divider } from "@mui/material";
import Goals from "./Goals";
import "../styles/ProfilePage.css";

const ProfileCard = ({
  userData,
  tricks,
  recoveries,
  trickGoals,
  trickGoalsLoading,
}) => {
  if (!userData) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  return (
    <>
      <div className="profile-sidebar">
        <Card className="profile-info-card" elevation={0}>
          <CardContent>
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
                {userData.first_name} {userData.last_name}{" "}
              </strong>
            </Typography>
            <div className="profile-details">
              <Typography variant="body1" className="profile-detail">
                <strong> {userData.email} </strong>
              </Typography>

              <Typography variant="body1" className="profile-detail">
                <strong>Tricks Mastered:</strong>{" "}
                {tricks && tricks.length > 0 ? tricks.length : 0}
              </Typography>
              <Typography variant="body1" className="profile-detail">
                <strong>Recoveries Tracked:</strong>{" "}
                {recoveries && recoveries.length > 0 ? recoveries.length : 0}
              </Typography>
            </div>
            <Divider className="profile-divider" />
            <div className="goals">
              <Goals
                trickGoals={trickGoals}
                trickGoalsLoading={trickGoalsLoading}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ProfileCard;
