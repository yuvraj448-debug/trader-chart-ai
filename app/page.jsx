"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnalysis = async () => {
    if (!image) {
      alert("Please upload a chart image first.");
      return;
    }

    try {
      setLoading(true);
      setAnalysis("");

      const formData = new FormData();
      formData.append("image", image);
      formData.append("question", question || "Analyze this trading chart.");

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("AI request failed");
      }

      const data = await res.json();
      setAnalysis(data.result);
    } catch (err) {
      setAnalysis("⚠️ AI analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-start px-4 pt-24 text-white bg-black">
      {/* HERO */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        Trader Chart AI
      </h1>
      <p className="text-gray-400 mb-8 text-center max-w-md">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      {/* ANALYZE CARD */}
      <div className="w-full max-w-xl bg-black/70 border border-white/10 rounded-2xl p-5 backdrop-blur">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-4 w-full text-sm"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-4 w-full rounded-lg bg-black px-3 py-2 text-white outline-none border border-white/10"
        />

        <button
          onClick={submitAnalysis}
          disabled={loading}
          className="w-full rounded-xl bg-white py-3 text-black font-semibold hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Analyzing..." : "Analyze Chart"}
        </button>
      </div>

      {/* RESULT */}
      {analysis && (
        <div className="mt-6 w-full max-w-xl bg-black/70 border border-white/10 rounded-2xl p-5 whitespace-pre-wrap">
          {analysis}
        </div>
      )}
    </main>
  );
}