"use client";

import { useState } from "react";

export default function AICore() {
  const [imageBase64, setImageBase64] = useState(null);
  const [analysis, setAnalysis] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [analyzedOnce, setAnalyzedOnce] = useState(false);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setAnalysis("");
    setAnalyzedOnce(false);

    const reader = new FileReader();
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const analyzeChart = async () => {
    if (!imageBase64 || loading || analyzedOnce) return;

    setLoading(true);
    setAnalysis("");

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64,
          question:
            "You are a professional institutional trader. Analyze this chart deeply. Explain trend, structure, liquidity, bias, and possible scenarios.",
        }),
      });

      const data = await res.json();

      if (!data.result) {
        setAnalysis("No analysis returned. Try again.");
      } else {
        setAnalysis(data.result);
        setAnalyzedOnce(true);
      }
    } catch (err) {
      setAnalysis("AI error. Please try again.");
    }

    setLoading(false);
  };

  const askFollowUp = async () => {
    if (!followUp.trim() || !imageBase64 || loading) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          image: imageBase64,
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

      <button
        onClick={analyzeChart}
        disabled={loading || analyzedOnce}
        className="w-full mt-4 bg-white text-black py-2 rounded disabled:opacity-50"
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
        <>
          <input
            type="text"
            placeholder="Ask a follow-up about this chart..."
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
            className="w-full mt-4 p-2 rounded bg-black border border-gray-700 text-white"
          />

          <button
            onClick={askFollowUp}
            className="w-full mt-3 bg-white text-black py-2 rounded"
          >
            Ask Follow-up
          </button>
        </>
      )}
    </div>
  );
}