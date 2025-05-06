import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPass, setShowConfirmPass] = useState(false);

  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "email") {
      if (!/^[a-z]/.test(value)) {
        setEmailError("Email should start with a lowercase letter.");
      } else {
        setEmailError("");
      }
    }

    if (name === "password") {
      setShowConfirm(value.length > 0);
      const strongPasswordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
      if (!strongPasswordRegex.test(value)) {
        setPasswordError(
          "Password must be 8+ characters with uppercase, lowercase, number & symbol."
        );
      } else {
        setPasswordError("");
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (emailError || passwordError) {
      alert("Please fix all errors before submitting.");
      return;
    }

    if (formData.password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.post(
        "https://signbridgebackend.onrender.com/api/auth/signup",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (response.status === 200 || response.status === 201) {
        alert("Signup successful! Redirecting to login...");
        navigate("/login");
      } else {
        alert("Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      if (error.response?.data?.message) {
        alert("Error: " + error.response.data.message);
      } else {
        alert("An error occurred during signup.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
        <h2 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-wide">
          Create an Account
        </h2>
        <p className="text-lg text-gray-600 mb-6">Join SignBridge today!</p>

        <div className="space-y-4 text-left">
          <label className="block text-lg font-medium">
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
          />

          <label className="block text-lg font-medium">
            Email <span className="text-red-500">*</span>
          </label>
          <div>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500"
            />
            {emailError && (
              <p className="text-red-500 text-sm mt-1">{emailError}</p>
            )}
          </div>

          <label className="block text-lg font-medium">
            Password <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500 pr-12"
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-4 text-blue-600 cursor-pointer"
            >
              {showPassword ? "Hide" : "Show"}
            </span>
            {passwordError && (
              <p className="text-red-500 text-sm mt-1">{passwordError}</p>
            )}
          </div>

          {showConfirm && (
            <>
              <label className="block text-lg font-medium">Re-enter Password</label>
              <div className="relative">
                <input
                  type={showConfirmPass ? "text" : "password"}
                  placeholder="Re-enter Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 p-4 rounded-xl w-full text-lg focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <span
                  onClick={() => setShowConfirmPass(!showConfirmPass)}
                  className="absolute right-4 top-4 text-blue-600 cursor-pointer"
                >
                  {showConfirmPass ? "Hide" : "Show"}
                </span>
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleSignup}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold mt-6"
        >
          Sign Up
        </button>

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
