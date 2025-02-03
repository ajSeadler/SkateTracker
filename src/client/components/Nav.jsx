import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import "../styles/Nav.css";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [token, setToken] = useState(null);
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    setToken(savedToken);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setAnchorEl(null);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      position="sticky"
      sx={{
        backgroundColor: "#222",
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/" className="logo-link">
            Skate<span style={{ fontWeight: 100 }}>Media</span>
          </Link>
        </Typography>

        <Box sx={{ display: { xs: "none", sm: "flex" }, gap: 3 }}>
          <Button
            component={Link}
            to="/"
            color="inherit"
            variant={isActive("/") ? "contained" : "text"}
          >
            Home
          </Button>
          <Button
            component={Link}
            to="/trick-bank"
            color="inherit"
            variant={isActive("/trick-bank") ? "contained" : "text"}
          >
            Trick Bank
          </Button>
          <Button
            component={Link}
            to="/community"
            color="inherit"
            variant={isActive("/community") ? "contained" : "text"}
          >
            Media
          </Button>
          <Button
            component={Link}
            to="/me"
            color="inherit"
            variant={isActive("/me") ? "contained" : "text"}
          >
            Profile
          </Button>

          {token ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button component={Link} to="/login" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/signup" color="inherit">
                Sign Up
              </Button>
            </>
          )}
        </Box>

        {token && (
          <IconButton onClick={handleMenuOpen} color="inherit">
            <AccountCircle />
          </IconButton>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          sx={{ mt: "45px" }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        <Box sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton color="inherit" onClick={toggleMenu}>
            <span className="menu-icon">&#9776;</span>
          </IconButton>
        </Box>
      </Toolbar>

      {isMenuOpen && (
        <Box sx={{ display: { xs: "block", sm: "none" }, padding: 2 }}>
          <Button
            fullWidth
            component={Link}
            to="/"
            color="inherit"
            onClick={toggleMenu}
          >
            Home
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/trick-bank"
            color="inherit"
            onClick={toggleMenu}
          >
            Trick Bank
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/community"
            color="inherit"
            onClick={toggleMenu}
          >
            Media
          </Button>
          <Button
            fullWidth
            component={Link}
            to="/me"
            color="inherit"
            onClick={toggleMenu}
          >
            Profile
          </Button>

          {token ? (
            <Button fullWidth color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <>
              <Button
                fullWidth
                component={Link}
                to="/login"
                color="inherit"
                onClick={toggleMenu}
              >
                Login
              </Button>
              <Button
                fullWidth
                component={Link}
                to="/signup"
                color="inherit"
                onClick={toggleMenu}
              >
                Sign Up
              </Button>
            </>
          )}
        </Box>
      )}
    </AppBar>
  );
};

export default Nav;
