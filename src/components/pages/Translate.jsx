import React, { useState, useRef, useEffect } from "react";
import Webcam from "react-webcam";

const Translate = () => {
  const [textInput, setTextInput] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const webcamRef = useRef(null);

  // Function to handle text input translation to sign language video
  const handleTextTranslate = () => {
    if (textInput) {
      setTranslatedText(`Generating sign language video for: ${textInput}`);
      // Here, you can integrate an API or logic to fetch and display relevant sign language videos
    }
  };

  // Function to handle sign language video translation to text
  const handleVideoTranslate = () => {
    // Placeholder logic for processing webcam input to text
    alert("Processing sign language from live video...");
    setTranslatedText("Translated text from sign language will appear here.");
    // Here, you can integrate a model/API to process the live video and extract text
  };

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