import React from "react";
import { useNavigate } from "react-router-dom";
import { FaHands, FaArrowRight, FaUniversalAccess } from "react-icons/fa";
import signLanguageImage from '../../assets/sign-language.png';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 pb-8 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800 overflow-y-auto">
      {/* Hero Section */}
      <section className="text-center mb-10">
        <h1 className="text-6xl font-extrabold mb-4 drop-shadow-lg flex items-center justify-center gap-2">
          Welcome to SignBridge <FaHands className="text-blue-600" />
        </h1>
        <p className="text-lg text-gray-700 mb-6 max-w-2xl leading-relaxed mx-auto">
          Bridge the gap between sign language and text with our advanced translation tools, making communication seamless and inclusive.
        </p>
        <div className="flex flex-col items-center">
          <img src={signLanguageImage} alt="Sign Language" className="w-64 h-auto mb-4 rounded-lg shadow-lg mx-auto" />
          <button
            onClick={() => navigate("/services")}
            className="bg-blue-600 text-white px-8 py-3 rounded-full text-lg shadow-md flex items-center gap-2 transform transition hover:scale-105 hover:bg-blue-700"
          >
            Get Started <FaArrowRight />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-6">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
            <p className="text-gray-600">Ensuring everyone has access to communication tools.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Translation Tools</h3>
            <p className="text-gray-600">Real-time translation between text and sign language.</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">Community Support</h3>
            <p className="text-gray-600">Join a community focused on inclusivity and support.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="mb-10 text-center">
        <h2 className="text-4xl font-bold mb-6">Importance of Sign Language</h2>
        <div className="flex flex-col md:flex-row justify-center items-center space-x-4">
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/2Ilm7uETRyE"
            title="YouTube video about Sign Language"
            className="mb-4 rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/w-WrP0KlCws"
            title="Another YouTube video about Sign Language"
            className="mb-4 rounded-lg shadow-lg"
            allowFullScreen
          ></iframe>
        </div>
      </section>

      {/* Additional Resources Section */}
      <section className="mt-10 text-center">
        <h2 className="text-4xl font-bold mb-6">Learn More</h2>
        <p className="text-lg text-gray-700 mb-4">Discover more resources and information about sign language.</p>
        <div className="flex space-x-4 justify-center">
          <a href="https://www.signlanguage101.com/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            Sign Language 101
          </a>
          <a href="https://www.nad.org/" target="_blank" rel="noopener noreferrer" className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-700 transition">
            National Association of the Deaf
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="mt-10 text-gray-600 text-sm">
        <p>&copy; 2025 SignBridge. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;
