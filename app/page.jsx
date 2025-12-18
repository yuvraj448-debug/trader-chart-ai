"use client";

import { useState } from "react";

export default function HomePage() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    if (!file) {
      setAnalysis("⚠️ Please upload a chart image first.");
      return;
    }

    try {
      setLoading(true);
      setAnalysis("");

      const formData = new FormData();
      formData.append("image", file);
      formData.append("question", question);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Request failed");
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
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 pt-24">
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        Trader Chart AI
      </h1>

      <p className="text-gray-400 text-center max-w-md mb-8">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      {/* UPLOAD BOX */}
      <div className="w-full max-w-md rounded-xl border border-white/10 p-4 space-y-4">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files[0])}
          className="w-full text-sm"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="w-full bg-black border border-white/10 rounded-lg px-3 py-2 text-sm outline-none"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-white text-black rounded-xl py-3 font-semibold disabled:opacity-60"
        >
          {loading ? "Analyzing..." : "Analyze Chart"}
        </button>
      </div>

      {/* RESULT */}
      {analysis && (
        <div className="mt-6 w-full max-w-md rounded-xl border border-white/10 p-4">
          <pre className="whitespace-pre-wrap text-sm text-gray-200">
            {analysis}
          </pre>
        </div>
      )}
    </main>
  );
}