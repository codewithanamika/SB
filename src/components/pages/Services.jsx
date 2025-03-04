import React, { useState } from "react";
import Login from "./Login"; // Import the Login component
import serviceImage from '../../assets/hero-image.png'; // Import an image for the services page

const Services = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (status) => {
    setIsLoggedIn(status);
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 pb-8 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800">
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">Sign Language Translation Services</h1>
          <p className="text-lg text-gray-700 mb-6 max-w-2xl leading-relaxed mx-auto">
            We offer various services aimed at bridging the gap between sign language and text. Here are some of the features we provide.
          </p>
          <img src={serviceImage} alt="Service" className="w-64 h-auto mb-6 rounded-lg shadow-lg mx-auto" />
          
          {/* Translation Features */}
          <h2 className="text-3xl font-semibold mb-4">Translation Features</h2>
          <p className="text-lg text-gray-600 mb-4">Explore our various translation features:</p>
          <ul className="list-disc list-inside mb-4">
            <li>Real-time text-to-sign language translation</li>
            <li>Customized sign language resources</li>
            <li>Community engagement events</li>
          </ul>
          <button
            onClick={() => alert("More features coming soon!")}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition"
          >
            Explore More Features
          </button>
        </div>
      )}
    </div>
  );
};

export default Services;
