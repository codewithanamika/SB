import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";
import axios from "axios";
import { showSuccess, showError } from "../../toastUtils";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({}); // For validation errors
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        newErrors.email = "Invalid email format.";
      }
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const response = await axios.post('https://signbridgebackend.onrender.com/api/users/auth/login', {
        email,
        password,
      });

      if (response.status === 200 || response.status === 201) {
        showSuccess("Login successful. Navigating to translate page.");
        const token = response.data.token;
        localStorage.setItem("token", token);
        navigate('/translate');
      } else {
        showError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 via-blue-700 to-blue-900 text-gray-100">
      <div className="bg-white p-12 rounded-3xl shadow-2xl w-full max-w-lg text-center border border-gray-200 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-5xl font-extrabold text-blue-800 mb-6 tracking-wide">Sign In</h2>
        <p className="text-lg text-gray-700 mb-6">Access your account to continue</p>

        <form className="space-y-6" onSubmit={handleLogin} noValidate>
      
          <div className="text-left">
            <label className="text-gray-800 font-medium text-lg">
              Email <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`mt-1 border p-4 rounded-xl w-full text-lg text-gray-900 placeholder-gray-500 transition-all focus:ring-4 focus:outline-none ${
                errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="you@example.com"
            />
            {errors.email && <p className="text-red-600 mt-1 text-sm">{errors.email}</p>}
          </div>

      
          <div className="text-left">
            <label className="text-gray-800 font-medium text-lg">
              Password <span className="text-red-600">*</span>
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`mt-1 border p-4 rounded-xl w-full text-lg text-gray-900 placeholder-gray-500 transition-all focus:ring-4 focus:outline-none ${
                errors.password ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
              }`}
              placeholder="Your password"
            />
            {errors.password && <p className="text-red-600 mt-1 text-sm">{errors.password}</p>}
          </div>

  
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-blue-600 text-white px-6 py-3 rounded-xl shadow-lg w-full text-lg font-semibold transition-all duration-300 ${
              isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isSubmitting ? 'Logging in...' : 'Login'}
          </button>
        </form>

      
        <div className="flex justify-between w-full text-base text-blue-700 mt-4">
          <button onClick={() => alert("Forgot password feature coming soon!")} className="hover:underline">
            Forgot Password?
          </button>
        </div>

       
        <button
          onClick={() => alert("Google login feature coming soon!")}
          className="flex items-center justify-center gap-3 border border-gray-500 p-4 w-full rounded-xl shadow-md hover:bg-gray-100 transition-all duration-300 text-lg font-semibold mt-6"
        >
          <FaGoogle className="text-red-500 text-2xl" /> Continue with Google
        </button>

    
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
