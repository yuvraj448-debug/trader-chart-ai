"use client";

import { useState, useEffect } from "react";

/* 🔄 Loading texts */
const loadingTexts = [
  "📊 Reading market structure...",
  "💧 Tracking liquidity pools...",
  "🧠 Analyzing smart money...",
  "⏳ Waiting for confirmation...",
];

export default function Home() {
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
      <h1 className="text-4xl font-bold text-center z-10">
        Trader Chart AI
      </h1>
      <p className="text-gray-400 text-center max-w-md mt-2 mb-12 z-10">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      {/* 📊 STATS CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full max-w-4xl mb-14 z-10">
        <StatCard title="Countries" value="150+" />
        <StatCard title="Users" value="60K+" />
        <StatCard title="Win Rate" value="59%" />
        <StatCard title="Avg RR" value="1 : 1.69" />
      </div>

      {/* UPLOAD BOX */}
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

      {/* ERROR */}
      {error && <div className="mt-6 text-yellow-400 z-10">{error}</div>}

      {/* AI RESPONSE */}
      {displayedText && (
        <div className="mt-12 w-full max-w-3xl bg-neutral-900/80 backdrop-blur rounded-2xl p-6 animate-fade-in z-10">
          <h2 className="text-xl font-semibold mb-4">📊 AI Chart Analysis</h2>

          <div className="text-gray-200 leading-relaxed whitespace-pre-wrap">
            {displayedText}
          </div>

          {/* FOLLOW UP */}
          <div className="mt-6 border-t border-neutral-700 pt-4">
            <h3 className="text-lg mb-2">💬 Ask a follow-up</h3>

            <input
              type="text"
              placeholder="Example: Where is the best entry?"
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="w-full mb-3 px-4 py-2 rounded-lg bg-black border border-neutral-700"
            />

            <button
              onClick={handleFollowUp}
              disabled={loading}
              className="bg-white text-black px-5 py-2 rounded-lg font-medium hover:opacity-90 transition"
            >
              {loading ? "🧠 Thinking..." : "Ask AI"}
            </button>
          </div>
        </div>
      )}

      {/* 🎨 STYLES */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ⭐ STARS */
        .stars,
        .stars2,
        .stars3 {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
          background-repeat: repeat;
        }

        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #fff 50%, transparent 51%);
          background-size: 300px 300px;
          opacity: 0.4;
          animation: moveStars 120s linear infinite;
        }

        .stars2 {
          background-image: radial-gradient(1.5px 1.5px at 100px 200px, #fff 50%, transparent 51%);
          background-size: 400px 400px;
          opacity: 0.25;
          animation: moveStars 180s linear infinite;
        }

        .stars3 {
          background-image: radial-gradient(1px 1px at 300px 400px, #fff 50%, transparent 51%);
          background-size: 500px 500px;
          opacity: 0.2;
          animation: moveStars 240s linear infinite;
        }

        @keyframes moveStars {
          from { transform: translateY(0); }
          to { transform: translateY(-50%); }
        }
      `}</style>
    </main>
  );
}

/* 🔢 STAT CARD */
function StatCard({ title, value }) {
  return (
    <div className="bg-neutral-900/80 backdrop-blur rounded-xl p-4 text-center shadow">
      <p className="text-gray-400 text-sm">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}