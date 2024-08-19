import React, { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";
import "../styles/ProfilePage.css";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tricks, setTricks] = useState([]); // State for storing tricks
  const [tricksLoading, setTricksLoading] = useState(true); // Loading state for tricks
  const [tricksError, setTricksError] = useState(null); // Error state for tricks

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/users/me", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        setUserData(userData);
        console.log("User Data:", userData);

        // Fetch user-specific tricks after user data is fetched
        if (userData?.id) {
          fetchUserTricks(userData.id);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    const fetchUserTricks = async (userId) => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          `http://localhost:3000/api/tricks/user/${userId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch tricks");
        }

        const tricks = await response.json();
        setTricks(tricks);
      } catch (error) {
        setTricksError(error.message);
      } finally {
        setTricksLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-page">
      <div className="sidebar">
        {loading ? (
          <CircularProgress className="loading-spinner" />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Card className="profile-info-card">
            <CardContent>
              <Typography variant="h5" className="profile-name">
                {userData?.name}
              </Typography>
              <div className="profile-details">
                <Typography variant="body1" className="profile-detail">
                  <strong>Email:</strong> {userData?.email}
                </Typography>
                <Typography variant="body1" className="profile-detail">
                  <strong>First Name:</strong> {userData?.first_name}
                </Typography>
                <Typography variant="body1" className="profile-detail">
                  <strong>Last Name:</strong> {userData?.last_name}
                </Typography>
                <Typography variant="body1" className="profile-detail">
                  <strong>Tricks Mastered:</strong> {tricks.length}
                </Typography>
                {/* <Typography variant="body1" className="profile-detail">
                  <strong>Phone Number:</strong> {userData?.phone_number}
                </Typography>
                <Typography variant="body1" className="profile-detail">
                  <strong>Shipping Address:</strong>{" "}
                  {userData?.shipping_address}
                </Typography>
                <Typography variant="body1" className="profile-detail">
                  <strong>Billing Address:</strong> {userData?.billing_address}
                </Typography> */}
              </div>
            </CardContent>
          </Card>
        )}
        <Card className="side-info-card">
          <CardContent>
            <Typography variant="h6" className="side-info-title">
              Tips
            </Typography>
            <Typography variant="body2" className="side-info-text">
              Always keep your balance centered to improve your control on the
              board.
            </Typography>
            <Typography variant="body2" className="side-info-text">
              Practice your ollies daily to build up muscle memory.
            </Typography>
            <Typography variant="body2" className="side-info-text">
              Remember to warm up with basic tricks before attempting more
              complex ones.
            </Typography>

            <Typography variant="h6" className="side-info-title">
              Latest Updates
            </Typography>
            <Typography variant="body2" className="side-info-text">
              New tricks and tutorials added every week. Check out the latest
              additions in the Trick Progress Tracker.
            </Typography>
            <Typography variant="body2" className="side-info-text">
              Recovery exercises have been updated for better results. Make sure
              to track your progress.
            </Typography>
          </CardContent>
        </Card>
      </div>

      <div className="feed">
        {tricksLoading ? (
          <CircularProgress className="loading-spinner" />
        ) : tricksError ? (
          <Typography variant="body1" color="error">
            {tricksError}
          </Typography>
        ) : tricks.length > 0 ? (
          <>
            <Typography variant="h5" className="feed-heading">
              My Tricks
            </Typography>
            <Typography variant="body1" className="feed-description">
              Here you can add, delete, edit, and track your progress with
              various tricks
            </Typography>
            <div className="tricks-cont">
              {tricks.map((trick) => (
                <Card key={trick.trick_id} className="feed-card">
                  <CardContent>
                    <Typography variant="h6">{trick.name}</Typography>
                    <Typography variant="body2">
                      {trick.difficulty_level}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <Typography variant="body1">
            No tricks found for this user. Add new tricks to start tracking your
            progress.
          </Typography>
        )}
      </div>

      {/* New Placeholder Recoveries Section */}
      <div className="feed">
        <Typography variant="h5" className="feed-heading">
          Recoveries
        </Typography>
        <Typography variant="body1" className="feed-description">
          Here you can add, delete, edit, and track your recovery with various
          basic exercises
        </Typography>
        <div className="recoveries-cont">
          {/* Placeholder cards */}
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="feed-card">
              <CardContent>
                <Typography variant="h6">Recovery {index + 1}</Typography>
                {/* <Typography variant="body2">{index + 1}</Typography> */}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
