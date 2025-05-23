import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const isLoggedIn = !!localStorage.getItem("token");

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const links = [
    { to: '/about', label: 'About' },
    { to: '/services', label: 'Services' },
    { to: '/contact', label: 'Contact' },
    { to: '/translate', label: 'Translate' },
    { to: '/resources', label: 'Resources' },
    { to: '/chat', label: 'Chatbot' },
  ];

  return (
    <>
      <nav className="bg-blue-600 fixed top-0 w-full shadow-lg z-50">
        <div className="container mx-auto flex justify-between items-center px-6 py-0">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <img src="/src/assets/signbridge.png" alt="SignBridge Logo" className="h-32 w-40" />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-6 items-center">
            {links.map(({ to, label }) => (
              <li key={to}>
                <Link to={to} className="text-white text-lg hover:text-blue-300 transition duration-300">
                  {label}
                </Link>
              </li>
            ))}

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
                <Link
                  to="/signup"
                  className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-100 transition duration-300"
                >
                  Signup
                </Link>
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={handleToggle} aria-label="Toggle menu">
              {isOpen ? <X className="text-white" size={24} /> : <Menu className="text-white" size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="bg-blue-600 md:hidden">
            <ul className="flex flex-col items-center space-y-4 py-4">
              {links.map(({ to, label }) => (
                <li key={to}>
                  <Link
                    to={to}
                    onClick={handleToggle}
                    className="text-white text-lg hover:text-blue-300 transition duration-300"
                  >
                    {label}
                  </Link>
                </li>
              ))}

              {isLoggedIn ? (
                <li>
                  <button
                    onClick={() => { handleLogout(); handleToggle(); }}
                    className="bg-red-600 text-white px-5 py-2 rounded-full font-semibold shadow-md hover:bg-red-700 transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <li>
                  <Link
                    to="/signup"
                    onClick={handleToggle}
                    className="bg-white text-blue-600 px-5 py-2 rounded-full font-semibold shadow-md hover:bg-blue-100 transition duration-300"
                  >
                    Signup
                  </Link>
                </li>
              )}
            </ul>
          </div>
        )}
      </nav>
      {/* Spacer for fixed nav */}
      <div className="pt-20"></div>
    </>
  );
};

export default Navbar;
