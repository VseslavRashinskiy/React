import React from 'react';
import { NavLink, Link } from 'react-router-dom';

export const Header = () => {
  return (
    <nav className="navigation">
      <Link to="/">Home</Link>
      <NavLink to="/about">About Us</NavLink>
      <NavLink to="/form">Form</NavLink>
      <NavLink to="/inner/" className={({ isActive }) => (isActive ? 'active' : 'inactive')}>
        Card
      </NavLink>
    </nav>
  );
};
