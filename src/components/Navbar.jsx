import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './css/Navbar.css';
import nav1 from '../Images/nav1.png'
const Navbar = () => {
  return (
    <header className="header">
      <div className="navbar-left">
        <img src= {nav1} alt="Logo" className="logo" />
        <h1>Review&RATE</h1>
      </div>
      <div className="navbar-right">
        <div className="navbar-search">
          <input type="text" placeholder="Search..." />
          <FaSearch className="search-icon" />
        </div>
        <button className="signup-button">SignUp</button>
        <button className="login-button">Login</button>
      </div>
    </header>
  );
};

export default Navbar;