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
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-content" style={{ padding: "0px" }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Card variant="outlined" style={{ backgroundColor: "#292929", margin: "auto", padding: "20px", maxWidth: "75vw" }}>
            <CardContent>
              <Typography variant="h4" gutterBottom style={{ color: '#fff', fontWeight: 'bold' }}>
                Welcome, <span style={{ color: '#ffd166', fontWeight: 'bolder' }}>{userData?.name}!</span>
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>Email:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.email}</Typography>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>First Name:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.first_name}</Typography>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>Last Name:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.last_name}</Typography>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>Phone Number:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.phone_number}</Typography>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>Shipping Address:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.shipping_address}</Typography>
                </div>
                <div style={{ display: 'flex', marginBottom: '16px' }}>
                  <Typography variant="body1" style={{ color: '#fff', fontWeight: 'bold', marginRight: '8px' }}>Billing Address:</Typography>
                  <Typography variant="body1" style={{ color: '#ffd166' }}>{userData?.billing_address}</Typography>
                </div>
              </div>
              {/* Add more fields here if needed */}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
