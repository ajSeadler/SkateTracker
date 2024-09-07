import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Avatar, Divider, LinearProgress } from "@mui/material";
import { Star } from "@mui/icons-material";
import Goals from "./Goals";
import "../styles/ProfilePage.css";


const ProfileCard = ({
  userData,
  tricks,
  recoveries,
  trickGoals,
  trickGoalsLoading,
}) => {
  const [totalTricks, setTotalTricks] = useState(0);

  useEffect(() => {
    // Fetch total number of tricks from the API
    const fetchTotalTricks = async () => {
      try {
        const response = await fetch('/api/tricks');
        const tricksData = await response.json();
        setTotalTricks(tricksData.length);
      } catch (error) {
        console.error('Error fetching total tricks:', error);
      }
    };

    fetchTotalTricks();
  }, []);

  if (!userData) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  const masteredPercentage = totalTricks > 0 ? (userData.points / totalTricks) * 100 : 0;

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
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Star style={{color:'yellow'}} />
                  <strong style={{ marginLeft: '8px' }}>Tricks Mastered</strong>
                </div>
                <div style={{ marginTop: '8px' }}>
                <LinearProgress
    variant="determinate"
    value={masteredPercentage}
    sx={{
      height: 10,
      borderRadius: 5,
      backgroundColor: '#e0e0e0', // The color of the unfilled part of the bar
      '& .MuiLinearProgress-bar': {
        backgroundColor: 'green', // The filled portion color (green)
      },
    }}
  />
                  <Typography variant="body2" color="textPrimary" style={{ marginTop: '4px', color: '#fff' }}>
                    {userData.points} / {totalTricks} Tricks
                  </Typography>
                </div>
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
