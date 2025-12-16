"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnalysis = async () => {
    if (!image) {
      alert("Upload a chart screenshot first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("question", question);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAnalysis(data.analysis);
    setLoading(false);
  };

  return (
    <main className="relative z-10 flex flex-col items-center px-4 pt-20 text-white">
      {/* HERO */}
      <h1 className="text-3xl font-bold mb-2">Trader Chart AI</h1>
      <p className="text-gray-400 mb-6 text-center">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      <div className="w-full max-w-xl bg-black/60 border border-white/10 rounded-2xl p-4 backdrop-blur">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="mb-3 w-full"
        />

        <input
          type="text"
          placeholder="Ask anything about this chart (optional)..."
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          className="mb-3 w-full rounded-lg bg-black px-3 py-2 text-white outline-none border border-white/10"
        />

        <button
          onClick={submitAnalysis}
          className="w-full rounded-xl bg-white py-3 text-black font-semibold"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Chart"}
        </button>
      </div>

      {analysis && (
        <div className="mt-6 w-full max-w-xl bg-black/70 border border-white/10 rounded-2xl p-4 whitespace-pre-wrap">
          {analysis}
        </div>
      )}

      {/* 🔥 FEATURES — GUARANTEED VISIBLE */}
      <div className="mt-32 w-full max-w-5xl">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold">Why Trader Chart AI?</h2>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-xl font-semibold mb-2">AI Market Reading</h3>
            <p className="text-gray-400">
              Institutional-style chart analysis in seconds.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-xl font-semibold mb-2">Price Action Focus</h3>
            <p className="text-gray-400">
              Structure, liquidity, bias — no indicators.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/60 p-6">
            <h3 className="text-xl font-semibold mb-2">Trader Friendly</h3>
            <p className="text-gray-400">
              Built for scalpers, day traders, and swing traders.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}