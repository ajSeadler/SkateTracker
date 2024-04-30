import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ChatWithUsForm from "./ChatWithUsForm";

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        // Sorting products by price in descending order
        const sortedProducts = data.sort((a, b) => b.price - a.price);
        // Taking the top 5 most expensive guitars
        const top5ExpensiveGuitars = sortedProducts.slice(0, 6);
        setProducts(top5ExpensiveGuitars);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      <div className="hero-section">
        <img
          className="hero-background"
          src="https://www.gratefulweb.com/sites/default/files/images/articles/unnamed%28103%29_37.jpg"
          alt="Hero Background"
        />
        
      </div>
      <div className="container">
        <h2 className="sub-title">Our Top Picks</h2>
        <div className="product-list">
          {products.map((product) => (
            <div key={product.name} className="product">
              <Link
                to={`/products/${product.product_id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <img
                  className="product-image"
                  src={product.image_url}
                  alt={product.name}
                />
                <p className="product-name">{product.name}</p>
                {product.rating && (
                  <div>
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
                {/* <p className="product-description">{product.description}</p> */}
                <p className="product-price">${product.price}</p>
                <button className="add-to-cart-button">Add to Cart</button>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <ChatWithUsForm />
    </div>
  );
};

export default Home;
