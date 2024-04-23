// NavigationBar.js
import React from 'react';
import { Link } from 'react-router-dom';

function NavigationBar() {
  return (
    <nav>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/line-chart">Line Chart</Link></li>
        <li><Link to="/bar-chart">Bar Chart</Link></li>
        {/* Add more links as needed */}
      </ul>
    </nav>
  );
}

export default NavigationBar;
