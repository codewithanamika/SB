import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-blue-200 text-gray-800">
      {/* Hero Section */}

<section className="relative h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-400 to-blue-950 text-white p-10 overflow-hidden">
  {/* Floating background shapes */}
  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
    <div className="absolute w-64 h-64 bg-blue-300 rounded-full opacity-30 blur-3xl animate-pulse -top-10 -left-10"></div>
    <div className="absolute w-40 h-40 bg-blue-200 rounded-full opacity-20 blur-2xl animate-bounce -bottom-10 -right-10"></div>
  </div>

  {/* Main Title */}
  <motion.h1 
    initial={{ opacity: 0, y: -20 }} 
    animate={{ opacity: 1, y: 0 }} 
    transition={{ duration: 0.8 }}
    className="text-5xl font-extrabold drop-shadow-lg z-10"
  >
    Welcome to SignBridge
  </motion.h1>

  {/* Subtitle */}
  <motion.p 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    transition={{ delay: 0.4, duration: 1 }}
    className="mt-4 text-2xl max-w-3xl z-10"
  >
    “Breaking barriers, one sign at a time.”
  </motion.p>

  {/* Call to Action Button */}
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.8, duration: 0.6 }}
    className="mt-8 z-10"
  >
    <Link to="/translate">
      <button className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-full shadow-lg hover:bg-blue-100 transition duration-300">
        Get Started
      </button>
    </Link>
  </motion.div>

  {/* Scroll down arrow */}
  <motion.div 
    animate={{ y: [0, 10, 0] }}
    transition={{ repeat: Infinity, duration: 2 }}
    className="absolute bottom-4 z-10"
  >
    <span className="text-3xl">⬇️</span>
  </motion.div>
</section>


      {/* About Summary */}
      <section className="max-w-6xl mx-auto mt-16 px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-blue-800 mb-4">Who We Are</h2>
          <p className="text-lg text-gray-700">
            SignBridge is a communication platform designed to connect the hearing-impaired community with the world through advanced AI-driven sign language translation.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-10">
          {[
            { title: "Our Mission", text: "Empowering individuals by making communication seamless and inclusive for everyone—especially for those relying on sign language." },
            { title: "Our Vision", text: "A world where speech and sign exist in harmony, enabling real-time, barrier-free conversations across communities." },
          ].map((item, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, scale: 0.9 }} 
              whileInView={{ opacity: 1, scale: 1 }} 
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-2xl shadow-xl"
            >
              <h3 className="text-2xl font-semibold text-blue-800 mb-2">{item.title}</h3>
              <p className="text-gray-700">{item.text}</p>
            </motion.div>
          ))}
        </div>

        {/* Features */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">What Makes SignBridge Unique?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Live Text to Sign", desc: "Translate typed or spoken text to sign language animations instantly." },
              { title: "Sign to Text", desc: "Use live webcam to detect and convert signs to readable text." },
              { title: "Clean UI/UX", desc: "A modern, accessible interface for all users." },
              { title: "Fast & Lightweight", desc: "Smooth performance across all devices." },
              { title: "AI-Powered", desc: "Smart models continuously learn and improve accuracy." },
              { title: "Educational Impact", desc: "Useful for schools, communities, and accessibility training." },
            ].map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow"
              >
                <h4 className="text-xl font-semibold text-blue-800 mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold text-blue-800 text-center mb-8">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: "🗣", title: "Input Text/Speech", desc: "User types or speaks text." },
              { icon: "🤟", title: "Real-time Translation", desc: "System processes and animates the sign language." },
              { icon: "👁️", title: "User Reads/Views", desc: "See sign or read converted text instantly." },
            ].map((step, idx) => (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.5, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md"
              >
                <div className="text-4xl mb-2">{step.icon}</div>
                <h4 className="text-xl font-semibold text-blue-800">{step.title}</h4>
                <p className="text-gray-700 mt-2">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Future Plans */}
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0 }} 
          whileInView={{ opacity: 1 }} 
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">Looking Ahead</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We aim to support multiple sign languages (like ASL & NSL), include voice-to-sign features, and expand offline capabilities. With your support, we can achieve global accessibility.
          </p>
        </motion.div>

        {/* Testimonials */}
        <motion.div 
          className="mt-16 bg-white p-10 rounded-2xl shadow-md text-center"
          initial={{ opacity: 0, y: 40 }} 
          whileInView={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl font-bold text-blue-800 mb-4">What Users Say</h2>
          <p className="text-gray-700 italic">“Finally a tool that makes communication possible for everyone in my classroom. Kudos to SignBridge!”</p>
        </motion.div>
      </section>

      

    </div>
  );
};

export default About;