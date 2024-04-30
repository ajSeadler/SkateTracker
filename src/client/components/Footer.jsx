import React from 'react';
import { styled } from '@mui/system';

const FooterContainer = styled('footer')({
  backgroundColor: '#f8f8f8',
  padding: '40px 0',
  borderTop: '1px solid #ddd',
});

const FooterContent = styled('div')({
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  flexWrap: 'wrap',
});

const FooterSection = styled('div')({
  flex: '0 0 25%',
  minWidth: '250px',
  margin: '0 10px',
});

const FooterHeader = styled('h3')({
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  marginBottom: '20px',
});

const FooterLink = styled('a')({
  display: 'block',
  fontFamily:'sans-serif',
  color: '#333',
  textDecoration: 'none',
  marginBottom: '10px',
  fontSize: '14px',
  transition: 'color 0.3s ease',
  '&:hover': {
    color: '#000',
  },
});

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <FooterHeader>Customer Service</FooterHeader>
          <FooterLink href="#">Contact Us</FooterLink>
          <FooterLink href="#">Order Status</FooterLink>
          <FooterLink href="#">Returns</FooterLink>
          <FooterLink href="#">Shipping</FooterLink>
          <FooterLink href="#">FAQ</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterHeader>Shop</FooterHeader>
          <FooterLink href="/electric-guitars">Guitars</FooterLink>
          <FooterLink href="#">Bass</FooterLink>
          <FooterLink href="#">Drums</FooterLink>
          <FooterLink href="#">Keyboards</FooterLink>
          <FooterLink href="#">Microphones</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterHeader>About Us</FooterHeader>
          <FooterLink href="#">Our Story</FooterLink>
          <FooterLink href="#">Careers</FooterLink>
          <FooterLink href="#">Privacy Policy</FooterLink>
          <FooterLink href="#">Terms of Use</FooterLink>
        </FooterSection>
        <FooterSection>
          <FooterHeader>Connect With Us</FooterHeader>
          <FooterLink href="#">Facebook</FooterLink>
          <FooterLink href="#">Twitter</FooterLink>
          <FooterLink href="#">Instagram</FooterLink>
          <FooterLink href="#">YouTube</FooterLink>
        </FooterSection>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;
