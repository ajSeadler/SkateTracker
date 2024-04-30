import React, { useEffect, useState } from "react";
import { Card, CardContent, CircularProgress, Typography } from "@mui/material";

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token); // Log the token
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
        console.log("User Data:", userData); // Log the user data
        setUserData(userData);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  console.log("UserData State:", userData); // Log the userData state


  return (
    <div className="profile-container">
      <div className="profile-content" style={{ padding: "0px" }}>
        <Card variant="outlined" style={{ backgroundColor: "#292929", margin: "auto", padding: "0px", width:'100%', }}>
          <CardContent>
            <Typography variant="h4" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
              Welcome, <span style={{ color: '#ffd166', fontWeight: 'bolder' }}>{userData?.name}!</span>
            </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfilePage;
