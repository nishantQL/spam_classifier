"use client";

import { useState } from "react";

export default function Home() {
  const [text, setText] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) return;

    setLoading(true);
    setResult("");

    try {
      const res = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.prediction);
    } catch (error) {
      setResult("Error connecting to backend");
    }

    setLoading(false);
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-900 to-black text-white px-4">
      <div className="w-full max-w-md bg-slate-800/60 backdrop-blur-md rounded-2xl shadow-2xl p-8 border border-slate-700">
        
        <h1 className="text-3xl font-bold text-center mb-6">
          Spam Classifier
        </h1>

        <textarea
          placeholder="Enter your message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="w-full h-28 p-3 rounded-lg bg-slate-900 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-2 rounded-lg font-semibold bg-blue-600 hover:bg-blue-700 transition duration-200 disabled:opacity-50"
        >
          {loading ? "Checking..." : "Check Spam"}
        </button>

        {result && (
          <div
            className={`mt-6 text-center py-2 rounded-lg font-bold ${
              result === "Spam"
                ? "bg-red-600"
                : "bg-green-600"
            }`}
          >
            {result}
          </div>
        )}
      </div>
    </main>
  );
}