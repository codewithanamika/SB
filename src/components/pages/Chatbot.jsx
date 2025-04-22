import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const Chatbot = () => {
  const api_key = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(api_key);

  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signData, setSignData] = useState(null);

  const handleSend = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setSignData(null);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
You are a helpful assistant that extracts characters to display American Sign Language (ASL).

TASK:
From a user's question, extract a single English alphabet character (A-Z) they want to see in ASL.

RESPONSE FORMAT:
Return a JSON object in this format:
{
  "label": "A",
  "dataset": "ASL"
}

RULES:
- Only extract a single character A-Z if mentioned in the question.
- Always return "ASL" as the dataset.
- Only return the JSON response, no explanation.

EXAMPLES:
"How do you sign letter A in ASL?"
→ { "label": "A", "dataset": "ASL" }

"Show ASL sign for letter B"
→ { "label": "B", "dataset": "ASL" }

Now, process this: "${userInput}"
`;

      const result = await model.generateContent(prompt);
      let responseText = result.response.text().trim();
      responseText = responseText.replace(/```json|```/g, '').trim();

      try {
        const json = JSON.parse(responseText);
        setResult(json);
        getSign(json.label);
      } catch (e) {
        console.error("Parse Error:", responseText);
        setError('Could not parse Gemini response.');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong. Check your API key and network.');
    }

    setLoading(false);
  };

  const getSign = async (label) => {
    try {
      const response = await fetch(`https://signbridgebackend.onrender.com/api/signs/${label}`);
      const data = await response.json();
      setSignData(data);
      console.log('Sign Data:', data);
    } catch (e) {
      console.error('Fetching sign data failed:', e);
      setError('Could not fetch ASL sign data.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 px-4">
      <div className="w-full max-w-3xl bg-white p-8 rounded-2xl shadow-xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-700 mb-6">
          ASL Letter Decoder 🔡🤖
        </h2>

        <input
          type="text"
          className="w-full p-3 text-lg border border-gray-300 rounded-md mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="e.g. How is letter A signed in ASL?"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
        />

        <button
          onClick={handleSend}
          disabled={loading || !userInput.trim()}
          className="w-full bg-blue-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-blue-700 transition disabled:opacity-50"
        >
          {loading ? 'Thinking...' : 'Get ASL Label 🔍'}
        </button>

        {result && (
          <div className="mt-6 bg-blue-50 p-5 rounded-lg border border-blue-200 text-lg">
            <p><strong>Label (Character):</strong> {result.label}</p>
            <p><strong>Dataset:</strong> {result.dataset}</p>
          </div>
        )}

        {signData?.image && (
          <div className="mt-6 text-center">
            <p className="mb-2 text-gray-600 text-base">
              ASL sign for <strong className="text-blue-700">{signData.label.toUpperCase()}</strong>:
            </p>
            <img
              src={`data:image/png;base64,${signData.image}`}
              alt={`ASL sign for ${signData.label}`}
              className="mx-auto max-h-64 rounded-lg shadow-md border border-gray-300 object-contain"
            />
          </div>
        )}

        {error && (
          <div className="mt-6 text-red-600 text-base text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default Chatbot;
