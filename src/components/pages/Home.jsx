import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaHands, FaArrowRight, FaUniversalAccess, FaYoutube, FaTwitter, FaFacebook, FaInstagram } from "react-icons/fa";
import signLanguageImage from '../../assets/sign-language.png';

const Home = () => {



  const navigate = useNavigate();
  
  // Refs for sections that will animate on scroll
  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const videoRef = useRef(null);
  const resourcesRef = useRef(null);
  const footerRef = useRef(null);

  // Function to handle scroll animations
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-fade-in');
          entry.target.classList.remove('opacity-0');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    
    // Observe all section refs
    [heroRef, featuresRef, videoRef, resourcesRef, footerRef].forEach(ref => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-col items-center justify-start min-h-screen pt-20 pb-8 bg-gradient-to-r from-blue-100 to-blue-300 text-gray-800 overflow-y-auto">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="text-center mb-10 opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4"
      >
        <h1 className="text-6xl font-extrabold mb-6 drop-shadow-lg flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">
          Welcome to SignBridge <FaHands className="text-blue-600 hover:text-blue-500 transition-colors duration-300 transform hover:scale-110" />
        </h1>
        <p className="text-lg text-gray-700 mb-8 max-w-2xl leading-relaxed mx-auto">
          Bridge the gap between sign language and text with our advanced translation tools, making communication seamless and inclusive.
        </p>
        <div className="flex flex-col items-center">
          <div className="overflow-hidden rounded-lg shadow-xl mb-6 relative hover:shadow-2xl transition-shadow duration-300">
            <img 
              src={signLanguageImage} 
              alt="Sign Language" 
              className="w-72 h-auto rounded-lg transform transition duration-700 hover:scale-110 hover:rotate-1" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <button
            onClick={() => navigate("/services")}
            className="bg-blue-600 text-white px-8 py-3.5 rounded-full text-lg shadow-lg flex items-center gap-2 transform transition-all duration-300 hover:scale-105 hover:bg-blue-700 hover:shadow-xl hover:shadow-blue-500/30 group"
          >
            Get Started <FaArrowRight className="group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section 
        ref={featuresRef}
        className="mb-16 text-center opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4"
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Our Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl group transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:rotate-1 cursor-pointer border border-blue-100">
            <FaUniversalAccess className="text-blue-600 text-4xl mb-4 mx-auto group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-xl font-semibold mb-3">Accessibility</h3>
            <p className="text-gray-600">Ensuring everyone has access to communication tools.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl group transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:rotate-1 cursor-pointer border border-blue-100">
            <FaHands className="text-blue-600 text-4xl mb-4 mx-auto group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-xl font-semibold mb-3">Translation Tools</h3>
            <p className="text-gray-600">Real-time translation between text and sign language.</p>
          </div>
          <div className="bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-lg hover:shadow-xl group transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:rotate-1 cursor-pointer border border-blue-100">
            <FaYoutube className="text-blue-600 text-4xl mb-4 mx-auto group-hover:text-blue-500 group-hover:scale-110 transition-all duration-300" />
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-gray-600">Join a community focused on inclusivity and support.</p>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section 
        ref={videoRef}
        className="mb-16 text-center opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4"
      >
        <h2 className="text-4xl font-bold mb-8 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Importance of Sign Language</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <div className="video-container relative group">
  <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/-2RZXoPWAsc?t=39start=4&autoplay=1&mute=1"
  title="Learn Basic Neplai Sign Language"
  className="rounded-xl shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-300/50 transition-all duration-300"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
</div>

<div className="video-container relative group">
  <div className="absolute inset-0 bg-blue-500/20 rounded-lg animate-pulse-slow opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
  <iframe
  width="560"
  height="315"
  src="https://www.youtube.com/embed/0FcwzMq4iWg?start=63&autoplay=1&mute=1"
  title="Learn ASL"
  className="rounded-xl shadow-xl group-hover:shadow-2xl group-hover:shadow-blue-300/50 transition-all duration-300"
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
  allowFullScreen
></iframe>
</div>
</div>
      </section>

      {/* Additional Resources Section */}
      <section 
        ref={resourcesRef}
        className="mt-10 text-center opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4"
      >
        <h2 className="text-4xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text">Learn More</h2>
        <p className="text-lg text-gray-700 mb-8">Discover more resources and information about sign language.</p>
        <div className="flex flex-wrap gap-6 justify-center">
          <a 
            href="https://www.signlanguage101.com/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/80 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-300/30 transition-all duration-300 hover:-translate-y-1 border border-blue-100 flex items-center gap-2"
          >
            <FaHands /> Sign Language 101
          </a>
          <a 
            href="https://www.nad.org/" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="bg-white/80 backdrop-blur-sm text-blue-600 px-6 py-3 rounded-xl shadow-md hover:shadow-xl hover:shadow-blue-300/30 transition-all duration-300 hover:-translate-y-1 border border-blue-100 flex items-center gap-2"
          >
            <FaUniversalAccess /> National Association of the Deaf
          </a>
        </div>
      </section>

      {/* Footer Section */}
      <footer 
        ref={footerRef}
        className="mt-16 text-gray-600 text-sm opacity-0 transform transition-all duration-1000 ease-out w-full max-w-6xl px-4 py-6 bg-white/50 backdrop-blur-sm rounded-t-3xl"
      >
        <div className="flex flex-col items-center">
          <div className="flex gap-4 mb-4">
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 hover:scale-110 transform">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 hover:scale-110 transform">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 hover:scale-110 transform">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="text-blue-500 hover:text-blue-700 transition-colors duration-300 hover:scale-110 transform">
              <FaYoutube size={20} />
            </a>
          </div>
          <p className="bg-gradient-to-r from-blue-600 to-blue-800 text-transparent bg-clip-text font-medium">&copy; 2025 SignBridge. All rights reserved.</p>
        </div>
      </footer>

      {/* CSS for custom animations */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 1s forwards;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes pulse-slow {
          0% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.5); }
          70% { box-shadow: 0 0 0 10px rgba(59, 130, 246, 0); }
          100% { box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Home;