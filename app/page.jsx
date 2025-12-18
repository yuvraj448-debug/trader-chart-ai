"use client";

import { useState, useEffect } from "react";

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

  const handleFollowUp = async () => {
    if (!followUp.trim()) return;

    setLoading(true);
    setError("");

    try {
      const formData = new FormData();
      if (image) formData.append("image", image);

      formData.append(
        "question",
        `Previous analysis:\n${analysis}\n\nUser question:\n${followUp}`
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
      setError("⚠️ Follow-up failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen bg-black text-white flex flex-col items-center px-4 pt-24 overflow-hidden">
      {/* ⭐ STARS BACKGROUND */}
      <div className="stars"></div>
      <div className="stars2"></div>
      <div className="stars3"></div>

      {/* CONTENT */}
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1 className="text-4xl font-bold mb-2 text-center">
          Trader Chart AI
        </h1>
        <p className="text-gray-400 mb-10 text-center max-w-md">
          Upload any chart screenshot. Let AI read the market like a pro.
        </p>

        <div className="w-full max-w-md bg-neutral-900/90 backdrop-blur rounded-2xl p-6 shadow-lg">
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

        {error && (
          <div className="mt-6 text-yellow-400">{error}</div>
        )}

        {displayedText && (
          <div className="mt-10 w-full max-w-2xl bg-neutral-900/90 backdrop-blur rounded-2xl p-6 animate-fade-in">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              📊 AI Chart Analysis
            </h2>

            <div className="text-gray-200 leading-relaxed text-base whitespace-pre-wrap">
              {displayedText}
            </div>

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
      </div>

      {/* ✨ STYLES */}
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

        .stars,
        .stars2,
        .stars3 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-repeat: repeat;
          background-size: contain;
          z-index: 0;
          pointer-events: none;
        }

        .stars {
          background-image: radial-gradient(1px 1px at 20px 30px, white, transparent);
          animation: moveStars 50s linear infinite;
          opacity: 0.3;
        }

        .stars2 {
          background-image: radial-gradient(1px 1px at 50px 80px, white, transparent);
          animation: moveStars 100s linear infinite;
          opacity: 0.2;
        }

        .stars3 {
          background-image: radial-gradient(1px 1px at 90px 120px, white, transparent);
          animation: moveStars 150s linear infinite;
          opacity: 0.15;
        }

        @keyframes moveStars {
          from {
            transform: translateY(0);
          }
          to {
            transform: translateY(-2000px);
          }
        }
      `}</style>
    </main>
  );
}