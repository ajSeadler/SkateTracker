import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)(({ scrolled }) => ({
  backgroundColor: scrolled ? '#000' : 'transparent',
  color: scrolled ? '#fff' : '#000',
  transition: 'background-color 0.3s ease, color 0.3s ease',
}));

const StyledTypography = styled(Typography)(({ theme }) => ({
  textDecoration: 'none',
  color: 'inherit',
  flexGrow: 1,
  fontWeight:'bolder'
}));



function NavigationBar() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrolled = scrollPosition > 0;

  const drawerContent = (
    <List>
      <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
        <ListItemText primary="Home" />
      </ListItem>
      <ListItem button component={Link} to="/guitars" onClick={handleDrawerToggle}>
        <ListItemText primary="Guitars" />
      </ListItem>
      <ListItem button component={Link} to="/amps" onClick={handleDrawerToggle}>
        <ListItemText primary="Amplifiers" />
      </ListItem>
      <ListItem button component={Link} to="/pedals-and-effects" onClick={handleDrawerToggle}>
        <ListItemText primary="Pedals and Effects" />
      </ListItem>
      <ListItem button component={Link} to="/accessories" onClick={handleDrawerToggle}>
        <ListItemText primary="Accessories" />
      </ListItem>
      {/* Add more links as needed */}
    </List>
  );

  return (
    <>
      <StyledAppBar position="fixed" scrolled={scrolled}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { md: 'none' } }} // Hide on medium and up
          >
            <MenuIcon />
          </IconButton>
          <StyledTypography variant="h6" component={Link} to="/">
            Music Shop
          </StyledTypography>
          <List sx={{ display: { xs: 'none', md: 'flex' } }}>
            <ListItem button component={Link} to="/guitars">
              <ListItemText primary="Guitars" />
            </ListItem>
            <ListItem button component={Link} to="/amps" >
        <ListItemText primary="Amplifiers" />
      </ListItem>
            <ListItem button component={Link} to="/pedals-and-effects">
              <ListItemText primary="Pedals and Effects" />
            </ListItem>
            <ListItem button component={Link} to="/accessories">
              <ListItemText primary="Accessories" />
            </ListItem>
            {/* Add more links as needed */}
          </List>
        </Toolbar>
      </StyledAppBar>
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        variant="temporary"
        sx={{
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
          display: { xs: 'block', md: 'none' }, // Show only on xs (extra-small) screens
        }}
      >
        {drawerContent}
      </Drawer>
    </>
  );
}

export default NavigationBar;
