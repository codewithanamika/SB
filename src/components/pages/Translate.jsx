import { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { useNavigate } from "react-router-dom";

const Translate = () => {
  const navigate = useNavigate();
  const webcamRef = useRef(null);
  const recognitionRef = useRef(null);

  const [predictedLetter, setPredictedLetter] = useState("");
  const [inputText, setInputText] = useState("");
  const [isListening, setIsListening] = useState(false);

  const handleImageUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch("http://192.168.106.43:5000/upload", {
      method: "POST",
      body: formData,
    });

    const result = await response.json();
    if (result?.predictions?.letter) {
      setPredictedLetter(result.predictions.letter);
    } else {
      setPredictedLetter("No prediction found.");
    }
  } catch (err) {
    console.error("Error uploading file:", err);
    setPredictedLetter("Upload failed.");
  }
};


 
  const token = localStorage.getItem("token");
  if (!token) {
    navigate("/login");
  }

 
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech Recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US"; 
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onresult = (event) => {
      const voiceText = event.results[0][0].transcript;
      setInputText(voiceText);
      processTextWithGemini(voiceText);
      setIsListening(false);
    };

    recognition.onerror = (e) => {
      console.error("Speech recognition error:", e);
      setIsListening(false);
      alert("Voice recognition error.");
    };

    recognitionRef.current = recognition;
  }, []);


  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  
  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  };

  const processTextWithGemini = async (text) => {
    const key = import.meta.env.VITE_GEMINI_API_KEY;

    const prompt = `
You are a text-cleaning tool, not a chatbot.

Your ONLY job is to correct basic grammar, punctuation, and capitalization in the provided input text.

DO NOT respond to the message.
DO NOT add any greetings, replies, explanations, or questions.
DO NOT rephrase the input or change the meaning or emotion in any way.
DO NOT add or remove words.

Only return the cleaned version of the input — nothing more.

Input: "${text}"
    `;

    try {
      const response = await fetch(
        "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" + key,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
          }),
        }
      );

      const data = await response.json();
      const resultText = data.candidates?.[0]?.content?.parts?.[0]?.text || "No response.";
      setInputText(resultText.trim());
    } catch (error) {
      console.error("Gemini API Error:", error);
      setInputText("Error processing with Gemini.");
    }
  };

 
  const captureAndSendImage = async () => {
    if (!webcamRef.current) return;

    const screenshot = webcamRef.current.getScreenshot();
    if (!screenshot) {
      console.error("Could not capture screenshot");
      return;
    }

    const blob = await (await fetch(screenshot)).blob();
    const formData = new FormData();
    formData.append("image", blob, "capture.jpg");

    try {
      const response = await fetch("http://192.168.106.43:5000/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (result?.predictions?.letter) {
        setPredictedLetter(result.predictions.letter);
      } else {
        setPredictedLetter("No prediction found.");
      }
    } catch (err) {
      console.error("Error uploading image:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-200 to-blue-500 text-gray-800 p-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-6 tracking-wide">Sign Language Translator</h1>

      <div className="grid md:grid-cols-2 gap-10 w-full max-w-5xl">
        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Live Sign Language to Text</h2>
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-64 bg-gray-300 rounded-xl shadow-md"
          />
          <button
            onClick={captureAndSendImage}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-blue-700 transition text-lg font-semibold mt-6"
          >
            Capture & Translate
          </button>
          <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-4 w-full text-lg file:mr-4 file:py-2 file:px-4
                    file:rounded-xl file:border-0 file:text-sm
                    file:font-semibold file:bg-blue-50 file:text-blue-700
                    hover:file:bg-blue-100"
          />

          {predictedLetter && (
            <div className="mt-4 text-xl text-blue-700 font-semibold">
              Prediction: {predictedLetter}
            </div>
          )}
        </div>


        <div className="bg-white p-10 rounded-3xl shadow-2xl text-center">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Text to Sign Language</h2>

          <textarea
            className="w-full p-4 border border-gray-300 rounded-xl text-lg focus:ring-2 focus:ring-blue-500"
            rows="4"
            placeholder="Enter text here..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          ></textarea>

          <div className="flex gap-4 mt-6">
            <button
              onClick={startListening}
              className="bg-yellow-500 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-yellow-600 transition text-lg font-semibold"
            >
              🎤 {isListening ? "Listening..." : "Start Voice Input"}
            </button>

            <button
              onClick={stopListening}
              className="bg-red-500 text-white px-6 py-3 rounded-xl shadow-md w-full hover:bg-red-600 transition text-lg font-semibold"
            >
              🛑 Stop Recording
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Translate;
