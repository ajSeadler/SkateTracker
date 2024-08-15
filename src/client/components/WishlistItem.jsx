import React from "react";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${formattedDate} at ${formattedTime}`;
};

const WishlistItem = ({ item }) => {
  return (
    <Link to={`/products/${item.product_id}`} style={{ textDecoration: 'none' }}>
      <div className="product">
        <img className="product-image" src={item.image_url} alt={item.name} />
        <div className="product-details" style={{ flex: "1" }}>
          <Typography
            variant="h6"
            className="product-name"
            style={{ color: "#000", marginBottom: "8px" }}
          >
            {item.name}
          </Typography>
          <Typography
            variant="body1"
            className="product-price"
            style={{ color: "#000", marginBottom: "8px" }}
          >
            Price: {item.price}
          </Typography>
          <Typography
            variant="body1"
            className="product-price"
            style={{ color: "#000", marginBottom: "8px" }}
          >
            Stock: {item.stock_quantity}
          </Typography>
          <Typography
            variant="body1"
            className="product-price"
            style={{ color: "#000", marginBottom: "8px" }}
          >
            Added on {formatDate(item.created_at)}
          </Typography>
        </div>
      </div>
    </Link>
  );
};

export default WishlistItem;
