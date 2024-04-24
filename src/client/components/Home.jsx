import React, { useState, useEffect } from 'react';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Sorting products by price in descending order
        const sortedProducts = data.sort((a, b) => b.price - a.price);
        // Taking the top 5 most expensive guitars
        const top5ExpensiveGuitars = sortedProducts.slice(0, 6);
        setProducts(top5ExpensiveGuitars);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="home">
      {/* <div className="hero-section">
        <img
          className="hero-background"
          src="https://www.rollingstone.com/wp-content/uploads/2024/04/Phish-Sphere-1-Fury.jpg?w=1600&h=900&crop=1"
          alt="Hero Background"
        />
      </div> */}
      <div className="container">
        <h2 className='sub-title'>Our Top Picks</h2>
        <div className="product-list">
          {products.map(product => (
            <div key={product.name} className="product">
              <img className="product-image" src={product.image_url} alt={product.name} />
              <h2 className="product-name">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">${product.price}</p>
              <button className="add-to-cart-button">Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
