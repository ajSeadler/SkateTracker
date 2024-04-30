import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Rating } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import ScrollTrigger from 'react-scroll-trigger';

const AllGuitars = () => {
  const [products, setProducts] = useState([]);
  const [animatedItems, setAnimatedItems] = useState([]);

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

  const handleScrollAnimation = index => {
    setAnimatedItems(prevState => [...prevState, index]);
  };

  return (
    <div className="container">
      <h1 className="title">All Guitars</h1>
      <div className="product-list">
        {products.map((product, index) => (
          <ScrollTrigger key={product.product_id} onEnter={() => handleScrollAnimation(index)}>
            <div className={`product ${animatedItems.includes(index) ? 'animate' : ''}`}>
              <Link to={`/products/${product.product_id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <img className="product-image" src={product.image_url} alt={product.name} />
                <p className="product-name">{product.name}</p>
                {product.rating && (
                  <div>
                    <Rating
                      name="product-rating"
                      value={product.rating}
                      precision={0.5}
                      readOnly
                      emptyIcon={<StarBorderIcon style={{ color: 'gold' }} />}
                      icon={<StarIcon style={{ color: 'gold' }} />}
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

export default AllGuitars;
