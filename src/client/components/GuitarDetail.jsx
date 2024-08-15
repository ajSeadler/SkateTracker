import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import YouMayAlsoLike from "./YouMayAlsoLike";

const GuitarDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const navigate = useNavigate(); // Use useNavigate hook for programmatic navigation

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProduct();
  }, [productId]);

  return (
    <>
      <div className="product-detail-container">
        {product && (
          <>
            <div className="product-detail-image-container">
              <img
                className="product-image"
                src={product.image_url}
                alt={product.name}
              />
            </div>
            <div className="product-detail-card-container">
              <h1 className="product-name">{product.name}</h1>
              {product.rating && (
                <div className="product-detail-rating">
                  <Rating
                    name="product-rating"
                    value={parseFloat(product.rating)}
                    precision={0.5}
                    readOnly
                    emptyIcon={<StarBorderIcon style={{ color: "gold" }} />}
                    icon={<StarIcon style={{ color: "gold" }} />}
                  />
                </div>
              )}
              <p className="product-detail-description">
                {product.description}
              </p>
              <p className="product-detail-price">${product.price}</p>

              <button className="add-to-cart-button">Add to Cart</button>
              {/* Use navigate function for programmatic navigation */}
              <button
                className="add-to-cart-button"
                style={{
                  textDecoration: "none",
                  fontFamily: "sans-serif",
                  fontSize: ".9rem",
                  margin: "10px",
                }}
                onClick={() => navigate(-1)}
              >
                Back
              </button>
            </div>
          </>
        )}
      </div>
      <YouMayAlsoLike />
    </>
  );
};

export default GuitarDetail;
