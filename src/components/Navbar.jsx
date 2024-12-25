
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-center">
        <Link to="/" className="text-white mx-4">Home</Link>
        <Link to="/dashboard" className="text-white mx-4">Dashboard</Link>
        <Link to="/create-event" className="text-white mx-4">Create Event</Link>
      </div>
    </nav>
  );
};

export default Navbar;
