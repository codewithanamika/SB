import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/"); // Redirect after logout
  };

  return (
    <>
      <nav className="bg-blue-600 fixed top-0 w-full shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-0">
          {/* Logo and Brand Name */}
          <div className="flex items-center space-x-3">
            <img src="/src/assets/signbridge.png" alt="SignBridge Logo" className="h-32 w-40" />
            <Link to="/" className="text-white text-2xl font-bold hover:text-blue-300 transition duration-300">
              SignBridge
            </Link>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 items-center">
            <li><Link to="/about" className="text-white text-lg hover:text-blue-300">About</Link></li>
            <li><Link to="/services" className="text-white text-lg hover:text-blue-300">Services</Link></li>
            <li><Link to="/contact" className="text-white text-lg hover:text-blue-300">Contact</Link></li>
            <li><Link to="/translate" className="text-white text-lg hover:text-blue-300">Translate</Link></li>
            <li><Link to="/resources" className="text-white text-lg hover:text-blue-300">Resources</Link></li>
            <li><Link to="/chat" className="text-white text-lg hover:text-blue-300">Chatbot</Link></li>


            {isLoggedIn ? (
              <li>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-700 transition duration-300"
                >
                  Logout
                </button>
              </li>
            ) : (
              <li>
                <Link to="/signup" className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-100 transition duration-300">
                  Signup
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
