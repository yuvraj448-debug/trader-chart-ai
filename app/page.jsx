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

  /* 🔁 Rotate loading text */
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
    }, 12);
    return () => clearInterval(interval);
  }, [analysis]);

  /* 🧠 ANALYZE */
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

  /* 💬 FOLLOW UP */
  const handleFollowUp = async () => {
    if (!followUp.trim() || !analysis) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);

      formData.append(
        "question",
        `Previous analysis:\n${analysis}\n\nFollow-up question:\n${followUp}`
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
      setError("⚠️ Follow-up failed (rate limit or API busy).");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 pt-24 relative overflow-hidden">
      {/* ⭐ STARS */}
      <div className="stars" />
      <div className="stars2" />
      <div className="stars3" />

      {/* HERO */}
      <h1 className="text-4xl font-bold mb-2 text-center z-10">
        Trader Chart AI
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-md z-10">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

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
          className="w-full mb-4 px-4 py-2 rounded-lg bg-black border border-neutral-700 text-white"
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
      {error && (
        <div className="mt-6 text-yellow-400 z-10">{error}</div>
      )}

      {/* AI RESPONSE */}
      {displayedText && (
        <div className="mt-10 w-full max-w-2xl bg-neutral-900/80 backdrop-blur rounded-2xl p-6 animate-fade-in z-10">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📊 AI Chart Analysis
          </h2>

          <div className="text-gray-200 leading-relaxed text-base whitespace-pre-wrap">
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
              className="w-full mb-3 px-4 py-2 rounded-lg bg-black border border-neutral-700 text-white"
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
          animation: fadeIn 0.5s ease-out;
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* ⭐ STAR BACKGROUND */
        .stars,
        .stars2,
        .stars3 {
          position: fixed;
          inset: 0;
          background-repeat: repeat;
          pointer-events: none;
          z-index: 0;
        }

        .stars {
          background-image: radial-gradient(2px 2px at 20px 30px, #fff 50%, transparent 51%);
          background-size: 600px 600px;
          animation: moveStars 120s linear infinite;
          opacity: 0.35;
        }

        .stars2 {
          background-image: radial-gradient(1.5px 1.5px at 200px 150px, #fff 50%, transparent 51%);
          background-size: 800px 800px;
          animation: moveStars 180s linear infinite;
          opacity: 0.25;
        }

        .stars3 {
          background-image: radial-gradient(1px 1px at 400px 300px, #fff 50%, transparent 51%);
          background-size: 1000px 1000px;
          animation: moveStars 240s linear infinite;
          opacity: 0.2;
        }

        @keyframes moveStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-50%);
          }
        }
      `}</style>
    </main>
  );
}