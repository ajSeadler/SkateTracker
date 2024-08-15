import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/system';

const StyledYouMayAlsoLike = styled('div')({
  textAlign: 'center',
  fontWeight:"100",
  marginTop: '50px',
  marginBottom:'20px'
});

const StyledProductContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  gap: '20px',
});

const StyledProductLink = styled(Link)({
  textDecoration: 'none',
  color: '#333',
  transition: 'transform 0.3s ease',
  '&:hover': {
    transform: 'scale(1.05)',
  },
});

const StyledProductImage = styled('img')({
  width: '150px',
  borderRadius: '8px',
});

const StyledProductName = styled('p')({
  fontWeight: 'bold',
  fontSize: '1rem',
  marginTop: '10px',
});

const StyledProductPrice = styled('p')({
  fontSize: '0.9rem',
  color: '#666',
});

const YouMayAlsoLike = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        // Selecting three random products
        const randomProducts = shuffle(data).slice(0, 3);
        setProducts(randomProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Function to shuffle array
  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;

    // While there remain elements to shuffle...
    while (currentIndex !== 0) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  return (
    <StyledYouMayAlsoLike>
      <h2 style={{fontWeight:'100', margin:'15px'}}>You May Also Like</h2>
      <StyledProductContainer>
        {products.map(product => (
          <StyledProductLink to={`/products/${product.product_id}`} key={product.product_id}>
            <StyledProductImage src={product.image_url} alt={product.name} />
            <StyledProductName>{product.name}</StyledProductName>
            <StyledProductPrice>${product.price}</StyledProductPrice>
          </StyledProductLink>
        ))}
      </StyledProductContainer>
    </StyledYouMayAlsoLike>
  );
};

export default YouMayAlsoLike;
