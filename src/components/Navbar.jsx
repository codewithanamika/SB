import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <nav className="bg-blue-600 fixed top-0 w-full shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-0">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <img src="/src/assets/signbridge.png" alt="SignBridge Logo" className="h-30 w-auto" /> 
            <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300 transition duration-300">
              SignBridge
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6">
            <li>
              <Link to="/about" className="text-white text-lg hover:text-blue-300 transition duration-300">About</Link>
            </li>
            <li>
              <Link to="/services" className="text-white text-lg hover:text-blue-300 transition duration-300">Services</Link>
            </li>
            <li>
              <Link to="/contact" className="text-white text-lg hover:text-blue-300 transition duration-300">Contact</Link>
            </li>
            <li>
              <Link to="/translate" className="text-white text-lg hover:text-blue-300 transition duration-300">Translate</Link>
            </li>
            <li>
              <Link to="/signup" className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-100 transition duration-300">
                Signup
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      {/* Prevent content from being hidden behind navbar */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
