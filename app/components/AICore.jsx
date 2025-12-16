"use client";

import { useState } from "react";

export default function AICore() {
  const [imageBase64, setImageBase64] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeChart = async () => {
    if (!imageBase64) {
      alert("Please upload a chart image first");
      return;
    }

    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64,
          question:
            "Analyze this trading chart like a professional trader. Explain bias, structure, liquidity, and possible scenarios.",
        }),
      });

      const data = await res.json();
      setAnalysis(data.result || "No response from AI");
    } catch (err) {
      setAnalysis("AI error. Please try again.");
    }

    setLoading(false);
  };

  const askFollowUp = async () => {
    if (!followUp.trim()) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64, // IMPORTANT: SAME IMAGE AGAIN
          question: followUp,
        }),
      });

      const data = await res.json();
      setAnalysis(data.result || "No response from AI");
      setFollowUp("");
    } catch (err) {
      setAnalysis("AI error. Please try again.");
    }

    setLoading(false);
  };

  return (
    <div className="relative z-10 max-w-xl mx-auto p-4">
      <input type="file" onChange={handleImageUpload} />

      <input
        type="text"
        placeholder="Ask anything about this chart (optional)..."
        value={followUp}
        onChange={(e) => setFollowUp(e.target.value)}
        className="w-full mt-3 p-2 rounded bg-black border border-gray-700 text-white"
      />

      <button
        onClick={analyzeChart}
        className="w-full mt-3 bg-white text-black py-2 rounded"
      >
        Analyze Chart
      </button>

      {loading && (
        <p className="text-center text-gray-400 mt-4 animate-pulse">
          Analyzing chart…
        </p>
      )}

      {analysis && (
        <div className="mt-4 p-4 bg-black border border-gray-800 rounded text-sm text-gray-200 whitespace-pre-line">
          {analysis}
        </div>
      )}

      {analysis && (
        <button
          onClick={askFollowUp}
          className="w-full mt-3 bg-white text-black py-2 rounded"
        >
          Ask Follow-up
        </button>
      )}
    </div>
  );
}