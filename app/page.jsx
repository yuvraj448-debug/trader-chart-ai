"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* 🔄 Loading texts */
const loadingTexts = [
  "📊 Reading market structure...",
  "💧 Tracking liquidity pools...",
  "🧠 Analyzing smart money...",
  "⏳ Waiting for confirmation...",
];

export default function Home() {
  const router = useRouter();

  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [loadingText, setLoadingText] = useState(loadingTexts[0]);

  /* 🔁 Loading text rotation */
  useEffect(() => {
    if (!loading) return;
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % loadingTexts.length;
      setLoadingText(loadingTexts[i]);
    }, 900);
    return () => clearInterval(interval);
  }, [loading]);

  /* ✨ Typing animation */
  useEffect(() => {
    if (!analysis) return;
    let i = 0;
    setDisplayedText("");
    const interval = setInterval(() => {
      i++;
      setDisplayedText(analysis.slice(0, i));
      if (i >= analysis.length) clearInterval(interval);
    }, 10);
    return () => clearInterval(interval);
  }, [analysis]);

  /* 🧠 MAIN ANALYSIS */
  const handleAnalyze = async () => {
    if (!image) {
      setError("⚠️ Please upload a chart image first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");
    setDisplayedText("");

    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "question",
        question || "Analyze this trading chart like a professional trader."
      );

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setAnalysis(data.result || "No analysis returned.");
    } catch {
      setError("⚠️ AI analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* 💬 FOLLOW-UP */
  const handleFollowUp = async () => {
    if (!followUp.trim() || !analysis) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);

      formData.append(
        "question",
        `Previous analysis:\n${analysis}\n\nUser follow-up:\n${followUp}`
      );

      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error();

      const data = await res.json();
      setAnalysis((prev) => prev + "\n\n" + data.result);
      setFollowUp("");
    } catch {
      setError("⚠️ Follow-up failed (rate limit / API busy).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white overflow-hidden px-4 pt-24 flex flex-col items-center">

      {/* ⭐ STAR BACKGROUND */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      {/* HERO */}
      <div className="text-center max-w-3xl z-10">
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
          ⚡ AI-Powered Chart Analysis
        </span>
        <h1 className="text-4xl md:text-5xl font-bold">
          Trader Chart AI <span className="text-blue-400">Made Simple</span>
        </h1>
        <p className="text-gray-400 mt-4">
          Upload any candlestick chart from Forex, Crypto, Commodities or Stocks
          and get instant AI-powered insights.
        </p>
      </div>

      {/* 📊 STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mt-14 mb-20 z-10">
        <StatCard title="Countries" value="150+" />
        <StatCard title="Users" value="60K+" />
        <StatCard title="Win Rate" value="59%" />
        <StatCard title="Avg RR" value="1 : 1.69" />
      </div>

      {/* UPLOAD */}
      <div className="w-full max-w-md bg-neutral-900/80 backdrop-blur rounded-2xl p-6 shadow-lg z-10">
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
          className="w-full mb-4 px-4 py-2 rounded-lg bg-black border border-neutral-700"
        />

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="w-full bg-white text-black font-semibold py-3 rounded-xl hover:opacity-90 transition"
        >
          {loading ? loadingText : "Analyze Chart"}
        </button>
      </div>

      {error && <div className="mt-6 text-yellow-400 z-10">{error}</div>}

      {/* CTA */}
      <div className="mt-24 mb-20 max-w-3xl text-center bg-neutral-900/80 backdrop-blur rounded-2xl p-10 z-10">
        <h2 className="text-3xl font-bold mb-3">
          Ready to Transform Your Trading?
        </h2>
        <p className="text-gray-400 mb-6">
          Join thousands of traders using AI to make smarter decisions.
        </p>
        <button
          onClick={() => router.push("/pricing")}
          className="bg-blue-500 hover:bg-blue-600 px-8 py-3 rounded-xl font-semibold"
        >
          Start Free Trial
        </button>
      </div>

      {/* STYLES */}
      <style jsx>{`
        html { scroll-behavior: smooth; }

        .stars,.stars2,.stars3 {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .stars { background: radial-gradient(2px 2px at 20px 30px,#fff 50%,transparent 51%); opacity:.4; animation: move 120s linear infinite; }
        .stars2 { background: radial-gradient(1.5px 1.5px at 100px 200px,#fff 50%,transparent 51%); opacity:.25; animation: move 180s linear infinite; }
        .stars3 { background: radial-gradient(1px 1px at 300px 400px,#fff 50%,transparent 51%); opacity:.2; animation: move 240s linear infinite; }

        @keyframes move { to { transform: translateY(-50%); } }
      `}</style>
    </main>
  );
}

/* COMPONENTS */
function StatCard({ title, value }) {
  return (
    <div className="bg-neutral-900/80 rounded-xl p-4 text-center">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}