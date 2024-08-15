import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { IconButton, InputBase } from '@mui/material';
import { Search, Person, ShoppingCart, ExitToApp } from '@mui/icons-material';

function NavigationBar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
      <nav className="navbar" style={{ backgroundColor: 'black', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div className="nav-container" style={{ display: 'flex', alignItems: 'center' }}>
          {/* Logo */}
          <div className="brand">
            <Link to="/" ><img src="/guitar-xxl.png" alt="Music Shop" className="logo-image" style={{ width: '60px', marginBottom: '10px', marginRight: '20px', margin:'10px' }} /></Link>
          </div>
          {/* Menu */}
          <div className="menu">
            <ul className="menu-list" style={{ textAlign: 'center', margin: '0', padding: '0' }}>
              <li className="menu-item">
                <Link to="/electric-guitars" className="menu-link">Guitars</Link>
                <div className="dropdown">
                  <Link to="/electric-guitars" className="dropdown-link">Electric Guitars</Link>
                  <Link to="/acoustic-guitars" className="dropdown-link">Acoustic Guitars</Link>
                  <Link to="/bass-guitars" className="dropdown-link">Bass Guitars</Link>
                </div>
              </li>
              <li className="menu-item">
                <Link to="/amps" className="menu-link">Amplifiers</Link>
              </li>
              <li className="menu-item">
                <Link to="/pedals-and-effects" className="menu-link">Pedals</Link>
              </li>
              <li className="menu-item">
                <Link to="/accessories" className="menu-link">Accessories</Link>
              </li>
            </ul>
          </div>
        </div>
        {/* Search Bar, Login/Profile Icon, and Shopping Cart Icon */}
        <div style={{ display: 'flex', alignItems: 'center', marginRight: '20px' }}>
          <InputBase
            placeholder="Search…"
            style={{ marginRight: '0px', color: '#000', backgroundColor:'#fff', borderRadius:'20px', padding:'7px' }}
            inputProps={{ 'aria-label': 'search' }}
          />
          {/* Conditionally render login icon, profile icon, or logout button */}
          {token ? (
            <>
              <Link to='/me'>
                <IconButton color="inherit">
                  <Person style={{ color: '#fff' }} />
                </IconButton>
              </Link>
              <IconButton color="inherit" onClick={handleLogout}>
                <ExitToApp />
              </IconButton>
            </>
          ) : (
            <Link to='/login'>
              <IconButton color="inherit">
                <Person style={{ color: '#fff' }} />
              </IconButton>
            </Link>
          )}
          <IconButton color="inherit">
            <ShoppingCart />
          </IconButton>
        </div>
        {/* Mobile Toggle Button */}
        <button className="menu-toggle" onClick={handleDrawerToggle} style={{ display: 'none' }}>
          <i className="fas fa-bars"></i>
        </button>
      </nav>
      {mobileOpen && (
        <div className="mobile-menu">
          <ul className="mobile-menu-list">
            <li className="menu-item">
              <Link to="/guitars" className="menu-link">Guitars</Link>
              <div className="dropdown">
                <Link to="/electric-guitars" className="dropdown-link">Electric Guitars</Link>
                <Link to="/acoustic-guitars" className="dropdown-link">Acoustic Guitars</Link>
                <Link to="/bass-guitars" className="dropdown-link">Bass Guitars</Link>
              </div>
            </li>
            <li className="menu-item">
              <Link to="/amps" className="menu-link">Amplifiers</Link>
            </li>
            <li className="menu-item">
              <Link to="/pedals-and-effects" className="menu-link">Pedals</Link>
            </li>
            <li className="menu-item">
              <Link to="/accessories" className="menu-link">Accessories</Link>
            </li>
          </ul>
        </div>
      )}
    </>
  );
}

export default NavigationBar;
