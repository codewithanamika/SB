import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from 'axios'

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });

  // Handle input changes and update state
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      console.log(formData);
  
      const response = await axios.post(
        'https://signbridgebackend.onrender.com/api/auth/signup',
        formData, // ✅ send as raw JS object
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      if (response.status === 200 || response.status === 201) {
        alert("Signup successful! Redirecting to login...");
        navigate('/login');
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
  
      // Optional: Display error message from backend
      if (error.response?.data?.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred during signup. Please check the console for details.");
      }
    }
  };
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-wide">Create an Account</h2>
        <p className="text-lg text-gray-600 mb-6">Join SignBridge today!</p>

        {/* Form fields for name, email, and password */}
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Sign Up Button */}
        <button
          onClick={handleSignup}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold mt-6"
        >
          Sign Up
        </button>

        {/* Link to the Login page under Services */}
        <p className="text-gray-600 mt-6 text-lg">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline cursor-pointer font-semibold"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
