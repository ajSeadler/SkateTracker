import React from "react";
import { Card, CardContent, Typography, CircularProgress } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const ShoppingCart = ({ loading, error }) => {
  return (
    <Card
      variant="outlined"
      style={{
        backgroundColor: "#292929",
        padding: "20px",
        borderRadius: 10,
        marginTop: "20px",
      }}
    >
      <CardContent style={{ display: "flex", alignItems: "center" }}>
        <ShoppingCartIcon style={{ color: "#fff", marginRight: "10px" }} />
        <Typography
          variant="h6"
          gutterBottom
          style={{ color: "#fff", fontWeight: "bold" }}
        >
          Shopping Cart
        </Typography>
      </CardContent>
      <CardContent>
        {loading ? (
          <CircularProgress style={{ color: "#fff" }} />
        ) : error ? (
          <Typography variant="body1" color="error">
            {error}
          </Typography>
        ) : (
          <Typography
            variant="body1"
            style={{ color: "#fff", fontWeight: "bold" }}
          >
            Your shopping cart is currently empty.
          </Typography>
        )}
        {/* You can add shopping cart items here */}
      </CardContent>
    </Card>
  );
};

export default ShoppingCart;
