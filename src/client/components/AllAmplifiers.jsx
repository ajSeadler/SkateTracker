import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import ScrollTrigger from "react-scroll-trigger";

const ElectricGuitars = () => {
  const [electricGuitars, setElectricGuitars] = useState([]);
  const [animatedItems, setAnimatedItems] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState(null); // State to store the selected brand

  useEffect(() => {
    const fetchElectricGuitars = async () => {
      try {
        const response = await fetch("api/products/amplifiers");
        if (!response.ok) {
          throw new Error("Failed to fetch electric guitars");
        }
        const data = await response.json();
        const guitarsWithParsedPrice = data.map((guitar) => ({
          ...guitar,
          price: parseFloat(guitar.price),
        }));
        setElectricGuitars(guitarsWithParsedPrice);
      } catch (error) {
        console.error("Error fetching electric guitars:", error);
      }
    };

    fetchElectricGuitars();
  }, []);

  const handleScrollAnimation = (index) => {
    setAnimatedItems((prevState) => [...prevState, index]);
  };

  // Function to filter products by brand
  const filterProductsByBrand = (brand) => {
    setSelectedBrand(brand === selectedBrand ? null : brand);
  };

  // Extract unique brands from the products
  const brands = [
    "All Amplifiers",
    ...new Set(electricGuitars.map((product) => product.brand)),
  ];

  return (
    <div className="container">
      <h1 className="title">Amplifiers</h1>
      {/* Render brand links */}
      <div className="brand-links">
        {brands.map((brand) => (
          <button
            key={brand}
            className={`brand-button ${
              selectedBrand === brand ? "active" : ""
            }`} // Apply custom CSS classes
            onClick={() => filterProductsByBrand(brand)}
          >
            {brand}
          </button>
        ))}
      </div>
      <div className="product-list">
        {electricGuitars
          .filter(
            (product) =>
              !selectedBrand ||
              selectedBrand === "All Amplifiers" ||
              product.brand === selectedBrand
          ) // Apply brand filter
          .map((product, index) => (
            <ScrollTrigger
              key={product.product_id}
              onEnter={() => handleScrollAnimation(index)}
            >
              <div
                className={`product1 ${
                  animatedItems.includes(index) ? "animate" : ""
                }`}
              >
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
                  <p className="product-price">${product.price}</p>
                  <button className="add-to-cart-button">Add to Cart</button>
                </Link>
              </div>
            </ScrollTrigger>
          ))}
      </div>
    </div>
  );
};

export default ElectricGuitars;
