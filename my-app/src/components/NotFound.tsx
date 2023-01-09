import { Link } from 'react-router-dom';
import React from 'react';

const NotFound = () => {
  return (
    <div>
      404 Page not found. Go <Link to="/">Home</Link>
    </div>
  );
};

export default NotFound;
