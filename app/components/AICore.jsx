"use client";

import { useState } from "react";

export default function AICore() {
  const [file, setFile] = useState(null);
  const [question, setQuestion] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  async function handleAnalyze() {
    if (!file) {
      setError("Please upload a chart image.");
      return;
    }

    setLoading(true);
    setError("");
    setResult("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      formData.append("question", question);

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("AI failed to analyze");
      }

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      setError("AI error. Try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative z-10 max-w-md w-full mx-auto p-6 rounded-2xl bg-black/60 backdrop-blur border border-white/10">
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-3 w-full text-sm"
      />

      <input
        type="text"
        placeholder="Ask anything about this chart (optional)..."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        className="mb-4 w-full px-3 py-2 rounded bg-black/70 border border-white/10 text-white text-sm"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading}
        className="w-full py-3 rounded-xl bg-white text-black font-semibold disabled:opacity-60"
      >
        {loading ? "Analyzing..." : "Analyze Chart"}
      </button>

      {error && (
        <p className="mt-4 text-red-400 text-sm">{error}</p>
      )}

      {result && (
        <div className="mt-6 text-sm text-white whitespace-pre-wrap">
          {result}
        </div>
      )}
    </div>
  );
}