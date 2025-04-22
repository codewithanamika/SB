import React from "react";

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex flex-col justify-center items-center text-center bg-gradient-to-r from-blue-500 to-blue-700 text-white p-6">
        <h1 className="text-5xl font-extrabold">Bridging Communication Gaps</h1>
        <p className="mt-4 text-xl max-w-3xl">
          “Bridging the gap between speech and sign language—because communication should have no barriers.”
        </p>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-5xl bg-white shadow-lg rounded-lg p-10 mt-10 mb-10">
        {/* Mission & Vision */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Mission & Vision</h2>
          <p className="text-lg text-gray-700 mb-4">
            <strong>Mission:</strong> SignBridge is dedicated to empowering hearing-impaired individuals by providing seamless communication through live sign-to-text and text-to-sign translation.
          </p>
          <p className="text-lg text-gray-700">
            <strong>Vision:</strong> We envision a world where everyone, regardless of their hearing ability, can communicate effortlessly.
          </p>
        </div>

        {/* Key Features Section */}
        <div className="bg-blue-100 p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🔄 Live Text to Sign Translation</h3>
              <p className="text-gray-700">Instant conversion of text into sign language animations.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🖐 Sign Language to Text</h3>
              <p className="text-gray-700">Detects and translates sign language gestures into readable text.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">⚡ User-Friendly Interface</h3>
              <p className="text-gray-700">Designed with accessibility in mind for ease of use.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🚀 Lightweight & Fast</h3>
              <p className="text-gray-700">Optimized for performance with minimal resource usage.</p>
            </div>
          </div>
        </div>

        {/* How It Works Section */}
        <div className="mt-10">
          <h2 className="text-3xl font-bold text-blue-700 text-center mb-6">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-700">🗣 Speak or Type</h3>
              <p className="text-gray-700">Users can input text or speech to be translated.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-700">🤟 SignBridge Converts</h3>
              <p className="text-gray-700">The app generates corresponding sign language animations.</p>
            </div>
            <div className="p-6 bg-gray-100 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold text-blue-700">👀 Read or View</h3>
              <p className="text-gray-700">Users can read text or view sign animations in real time.</p>
            </div>
          </div>
        </div>

        {/* Why SignBridge Section */}
        <div className="mt-10 p-8 bg-blue-100 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center text-blue-700 mb-6">Why SignBridge?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🌍 Accessibility & Inclusivity</h3>
              <p className="text-gray-700">Improving interactions for hearing-impaired individuals.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🤝 Bridging Communication Gaps</h3>
              <p className="text-gray-700">Making conversations smoother between signers & non-signers.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">📚 Educational & Social Impact</h3>
              <p className="text-gray-700">Useful in education, workplaces & everyday life.</p>
            </div>
            <div className="p-4 bg-white rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-blue-700">🤖 AI-Powered Translations</h3>
              <p className="text-gray-700">Continuously learning and improving sign detection.</p>
            </div>
          </div>
        </div>

        {/* Future Plans Section */}
        <div className="mt-10 text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">Our Future Goals</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            We are continuously working to expand our sign language library, integrate AI-powered features, and support more languages. Join us in making communication accessible for all!
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-10 bg-gray-100 p-8 rounded-lg shadow-md text-center">
          <h2 className="text-3xl font-bold text-blue-700 mb-4">What People Are Saying</h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            "SignBridge has transformed the way I communicate with my friends and family. It's a game changer!" – User Feedback
          </p>
        </div>
      </div>

      {/* Footer */}
      
    </div>
  );
};

export default About;
