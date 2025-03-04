import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaGoogle } from "react-icons/fa";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Handle the login process
  const handleLogin = () => {
    if (username && password) {
      alert("Login Successful! Redirecting to Translate page...");
      setTimeout(() => {
        navigate("/translate"); // Redirect to Translate page after successful login
      }, 500); // Short delay for a smooth transition
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-wide">Sign In</h2>
        <p className="text-lg text-gray-600 mb-6">Welcome back! Please enter your details.</p>

        {/* Username and Password Inputs */}
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Username or Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold mt-6"
        >
          Login
        </button>

        {/* Forgot Password link */}
        <div className="flex justify-between w-full text-base text-blue-600 mt-4">
          <button onClick={() => alert("Forgot password feature coming soon!")} className="hover:underline">
            Forgot Password?
          </button>
        </div>

        {/* Google Login Button */}
        <button
          onClick={() => alert("Google login feature coming soon!")}
          className="flex items-center justify-center gap-3 border border-gray-400 p-4 w-full rounded-xl shadow-md hover:bg-gray-100 transition text-lg font-semibold mt-4"
        >
          <FaGoogle className="text-red-500 text-2xl" /> Continue with Google
        </button>

        {/* Link to Sign Up page */}
        <p className="text-gray-600 mt-6 text-lg">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            className="text-blue-600 hover:underline cursor-pointer font-semibold"
          >
            Sign Up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
