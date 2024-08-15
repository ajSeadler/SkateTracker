import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, Typography, Button } from "@mui/material";

const GuitarIcons = () => {
  return (
    <div className="guitar-icons-container">
      <Card className="guitar-card">
        <Link to="/electric-guitars" className="guitar-link">
          <img src="/electric-guitar-svgrepo-com.svg" alt="Electric Guitar" className="guitar-icon" />
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Electric Guitars
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Explore our wide selection of electric guitars from top brands. Whether you're a beginner or a seasoned guitarist, find the perfect instrument to rock your world!
            </Typography>
            <Button variant="contained" component={Link} to="/electric-guitars" color="primary">
              Shop Electric Guitars
            </Button>
          </CardContent>
        </Link>
      </Card>
      <Card className="guitar-card">
        <Link to="/acoustic-guitars" className="guitar-link">
          <img src="/acoustic-guitar-guitar-svgrepo-com.svg" alt="Acoustic Guitar" className="guitar-icon" />
          <CardContent>
            <Typography variant="h5" component="h2" gutterBottom>
              Acoustic Guitars
            </Typography>
            <Typography variant="body1" color="textSecondary" gutterBottom>
              Discover our collection of acoustic guitars, crafted for rich sound and superior playability. Find the acoustic guitar that resonates with your soul!
            </Typography>
            <Button variant="contained" component={Link} to="/acoustic-guitars" color="primary">
              Shop Acoustic Guitars
            </Button>
          </CardContent>
        </Link>
      </Card>
    </div>
  );
};

export default GuitarIcons;
