import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Translate = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const validateEmail = (email) => {
    return /^[a-z][a-zA-Z0-9._%+-]*@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
  };

  const validatePassword = (password) => {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    let valid = true;

    if (!validateEmail(email)) {
      setEmailError("Email must start with a lowercase letter and be valid.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (!validatePassword(password)) {
      setPasswordError("Password must be 8+ chars and include uppercase, lowercase, number & symbol.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (valid) {
      localStorage.setItem("token", "mockToken"); // Replace with real login logic later
      setIsLoggedIn(true);
    }
  };

  const handleTextTranslate = () => {
    if (textInput) {
      setTranslatedText(`Generating sign language video for: ${textInput}`);
    }
  };

  const handleVideoTranslate = () => {
    alert("Processing sign language from live video...");
    setTranslatedText("Translated text from sign language will appear here.");
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800">
        <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-lg text-center">
          <h2 className="text-4xl font-extrabold text-blue-700 mb-4 tracking-wide">Login</h2>
          <p className="text-lg text-gray-600 mb-6">Welcome back to SignBridge!</p>

          <form onSubmit={handleLogin} className="space-y-4 text-left">
            <label className="block font-semibold text-lg text-gray-700">
              Email <span className="text-red-500">*</span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 w-full p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
                placeholder="yourname@example.com"
                required
              />
              {emailError && <p className="text-red-500 text-sm mt-1">{emailError}</p>}
            </label>

            <label className="block font-semibold text-lg text-gray-700">
              Password <span className="text-red-500">*</span>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-5 text-sm text-blue-600 cursor-pointer"
                >
                  {showPassword ? "Hide" : "Show"}
                </span>
              </div>
              {passwordError && <p className="text-red-500 text-sm mt-1">{passwordError}</p>}
            </label>

            <button
              type="submit"
              className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800 p-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-wide">Sign Language Translator</h1>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        {/* Live Sign Language Video to Text */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Live Sign Language to Text</h2>
          <Webcam ref={webcamRef} className="w-full h-64 bg-gray-300 rounded-xl shadow-md" />
          <button
            onClick={handleVideoTranslate}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold mt-6"
          >
            Translate Sign Language
          </button>
        </div>

        {/* Text Input to Sign Language Video */}
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Text to Sign Language</h2>
          <textarea
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter text here..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
          ></textarea>
          <button
            onClick={handleTextTranslate}
            className="bg-green-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-green-700 transition text-lg font-semibold mt-6"
          >
            Convert to Sign Language
          </button>
          <p className="mt-4 text-gray-700 text-lg font-medium">{translatedText}</p>
        </div>
      </div>
    </div>
  );
};

export default Translate;
