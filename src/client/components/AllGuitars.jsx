import React, { useState, useEffect } from 'react';
import Login from './Login';
import { Rating } from '@mui/material'; // Import Rating component
import StarIcon from '@mui/icons-material/Star'; // Import StarIcon from MUI icons
import StarBorderIcon from '@mui/icons-material/StarBorder'; // Import StarBorderIcon from MUI icons

const AllGuitars = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Guitars</h1>
      <div className="product-list">
        {products.map(product => (
          <div key={product.product_id} className="product">
            <img className="product-image" src={product.image_url} alt={product.name} />
            <h2 className="product-name">{product.name}</h2>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price}</p>
            {/* Conditionally render Rating component only if there is a rating */}
            {product.rating && (
              <div>
                <Rating
                  name="product-rating"
                  value={product.rating}
                  precision={0.5}
                  readOnly
                  emptyIcon={<StarBorderIcon style={{ color: 'gold' }} />} // Set empty star color
                  icon={<StarIcon style={{ color: 'gold' }} />} // Set filled star color
                />
                {/* Log the rating */}
                {console.log('Rating:', product.rating)}
              </div>
            )}
            <button className="add-to-cart-button">Add to Cart</button>
          </div>
        ))}
      </div>
      <Login />
    </div>
  );
};

export default AllGuitars;
