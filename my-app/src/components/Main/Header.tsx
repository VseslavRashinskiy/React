import React from 'react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <Link to="/about">About Us</Link>
      <Link to="/form">Form</Link>
    </nav>
  );
};
