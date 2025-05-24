import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { jwtDecode } from "jwt-decode";
import { showSuccess, showError } from '../../toastUtils';
const Chatbot = () => {
  const api_key = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(api_key);
  const navigate = useNavigate()

  const [userInput, setUserInput] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [signData, setSignData] = useState(null);
  const [review, setReview] = useState({
    label: '',
    signtype: 'ASL',
    status: '',
  });
  const token = localStorage.getItem("token")
  if (token) {
    const decoded = jwtDecode(token);
    
  }
  else {
    navigate('/login')
  }

  const handleSend = async () => {
    setLoading(true);
    setError('');
    setResult(null);
    setSignData(null);

    try {
      const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

      const prompt = `
You are a helpful assistant that extracts a word or a letter from a user's question related to American Sign Language (ASL).

🧠 TASK:
From the user's natural language question, identify **either** a single letter (A-Z) or a full word they are asking to see in ASL.

📦 RESPONSE FORMAT:
Return only a strict JSON object like this:
{
  "label": "<extracted_letter_or_word>",
  "type": "letter" | "word"
}

📌 RULES:
- If the user asks for a **letter** (e.g., "How to sign letter A in ASL?"), return:
  { "label": "A", "type": "letter" }

- If the user asks for a **word** (e.g., "Show me how to sign summer in ASL"), return:
  { "label": "summer", "type": "word" }

- Do **not** return any explanation or additional text — ONLY the JSON response.

✅ EXAMPLES:
"How is letter B signed in ASL?"  
→ { "label": "B", "type": "letter" }

"Show me the ASL sign for peace"  
→ { "label": "peace", "type": "word" }

"What does the letter X look like in sign language?"  
→ { "label": "X", "type": "letter" }

"ASL sign for happy"  
→ { "label": "happy", "type": "word" }

Now, based on the following input, respond with the correct JSON:
"${userInput}"
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
      setReview({
        label,
        signtype: 'ASL',
        status: data?.error === 'Sign not found' ? 'sign not available' : 'available',
      });      

      console.log('Sign Data:', data);
    } catch (e) {
      console.error('Fetching sign data failed:', e);
      setError('Could not fetch ASL sign data.');
    }
  };

    const submitReview = async () => {
      console.log(review)
      console.log(jwtDecode(token).id)
      try {
        const response = await fetch("https://signbridgebackend.onrender.com/api/reviews", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            postedBy: jwtDecode(token).id,
            label: review.label,
            signtype: review.signtype,
            status: review.status,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("✅ Review submitted successfully:", data);
          showSuccess("Review submitted succesfully")
        } else {
          console.error("❌ Error submitting review:", data.message || data);
          setError("Failed to submit review.");
          showError("Failed to submit review");
        }
      } catch (err) {
        console.error("❌ Network or server error:", err);
        setError("An error occurred while submitting the review.");
      }
    };

  
  return (
    <div className="flex items-center mt-10 justify-center min-h-screen bg-gradient-to-tr from-blue-100 via-blue-200 to-blue-300 px-4">
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




        {signData?.error === 'Sign not found' && (
          <div className="mt-6 text-center bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
            <p className="text-lg font-semibold">Oops! We couldn’t find a sign for:</p>
            <p className="text-xl font-bold mt-1 mb-2 text-blue-700">{result?.label}</p>
            <p className="text-base">This sign is not in our database yet.</p>
            <p className="text-base italic mt-1">We’ll work on adding it in a future update. Thank you for your curiosity!</p>
            <p className="text-base italic mt-1">Please leave a reviw about the unavailable word so that we can add it in future</p>
          </div>
        )}


        {signData && !signData.error && (
          <div className="mt-6 text-center">
            <p className="mb-4 text-lg md:text-xl text-gray-700 font-medium text-center">
              {result?.type === 'word' ? (
                <>
                  Here is a video reference on how you would say{' '}
                  <span className="font-bold text-blue-700">"{signData.label.toUpperCase()}"</span>
                </>
              ) : (
                <>
                  Here is an image reference on how you would say{' '}
                  <span className="font-bold text-blue-700">"{signData.label.toUpperCase()}"</span>
                </>
              )}
            </p>



            {result?.type === "letter" ? (
              <img
                src={`data:image/png;base64,${signData.image}`}
                alt={`ASL sign for ${signData.label}`}
                className="mx-auto max-h-64 rounded-lg shadow-md border border-gray-300 object-contain"
              />
            ) : (
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg shadow-md border border-gray-300">
                <iframe
                  src={signData.image}
                  title={`ASL sign for ${signData.label}`}
                  allowFullScreen
                  className="absolute top-0 left-0 w-full h-full"
                ></iframe>
              </div>
            )}
          </div>
        )}



        {error && (
          <div className="mt-6 text-red-600 text-base text-center">
            {error}
          </div>
        )}
        {result && (
          <div className="mt-8 border-t pt-6">
            <h3 className="text-xl font-semibold text-blue-700 mb-4 text-center">
              Submit a Review 📝
            </h3>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                submitReview();
              }}
            >
              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Label</label>
                <input
                  type="text"
                  value={review.label}
                  disabled
                  className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Sign Type</label>
                <input
                  type="text"
                  value="ASL"
                  disabled
                  className="w-full border border-gray-300 p-2 rounded-md bg-gray-100 text-gray-600"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                <input
                  type="text"
                  placeholder={
                    signData?.error === 'Sign not found'
                      ? 'sign not available'
                      : 'Leave your review'
                  }
                  value={review.status}
                  onChange={(e) =>
                    setReview((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full border border-gray-300 p-2 rounded-md"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white p-3 rounded-md text-lg font-semibold hover:bg-green-700 transition"
              >
                Submit Review
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default Chatbot;
