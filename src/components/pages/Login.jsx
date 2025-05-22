import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { showSuccess, showError } from "../../toastUtils";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle the login process
  const handleLogin = async(e) => {
    e.preventDefault()
    try {
      const response = await axios.post('https://signbridgebackend.onrender.com/api/users/auth/login', {
        email,
        password,
    })
    if (response.status === 200 || response.status === 201) {
      showSuccess("Login successful.Navigating to translate page");
      const token=response.data.token
      localStorage.setItem("token",token)
      navigate('/translate');
    } else {
      showError("Login failed. Please try again.");
    }
  }
  catch(error) {
    console.error(error);
  }
  
    
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-gray-100">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center border border-gray-200 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-6 tracking-wide">Sign In</h2>
        <p className="text-lg text-gray-700 mb-6">Access your account to continue</p>

        {/* Username and Password Inputs */}
        <div className="space-y-6">
          <input
            type="text"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg text-gray-900 placeholder-gray-500 focus:ring-4 focus:ring-blue-500 focus:border-blue-500 transition-all"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg w-full hover:bg-blue-700 transition-all duration-300 text-lg font-semibold mt-6"
        >
          Login
        </button>

        {/* Forgot Password link */}
        <div className="flex justify-between w-full text-base text-blue-700 mt-4">
          <button onClick={() => alert("Forgot password feature coming soon!")} className="hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Google Login Button */}
        <button
          onClick={() => alert("Google login feature coming soon!")}
          className="flex items-center justify-center gap-3 border border-gray-500 p-4 w-full rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300 text-lg font-semibold mt-6"
        >
          <FaGoogle className="text-red-500 text-2xl" /> Continue with Google
        </button>

        {/* Link to Sign Up page */}
        <p className="text-gray-700 mt-6 text-lg">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-700 hover:underline cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;