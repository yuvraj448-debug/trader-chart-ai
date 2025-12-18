"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAnalyze = async () => {
    if (!image) {
      setError("⚠️ Please upload a chart image first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnalysis("");

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

      if (!res.ok) {
        throw new Error("AI request failed");
      }

      const data = await res.json();
      setAnalysis(data.result);
    } catch (err) {
      setError("⚠️ AI analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleFollowUp = async () => {
    if (!followUp || !analysis) return;

    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: JSON.stringify({
          question: `Previous analysis:\n${analysis}\n\nFollow-up question:\n${followUp}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setAnalysis((prev) => prev + "\n\n" + data.result);
      setFollowUp("");
    } catch {
      setError("⚠️ Follow-up failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-black text-white flex flex-col items-center px-4 pt-24">
      {/* HERO */}
      <h1 className="text-4xl font-bold mb-2 text-center">
        Trader Chart AI
      </h1>
      <p className="text-gray-400 mb-10 text-center max-w-md">
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      {/* UPLOAD BOX */}
      <div className="w-full max-w-md bg-neutral-900 rounded-2xl p-6 shadow-lg">
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
          {loading ? "Analyzing..." : "Analyze Chart"}
        </button>
      </div>

      {/* ERROR */}
      {error && (
        <div className="mt-6 text-yellow-400">{error}</div>
      )}

      {/* AI RESPONSE */}
      {analysis && (
        <div className="mt-10 w-full max-w-2xl bg-neutral-900 rounded-2xl p-6 animate-fade-in">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            📊 AI Chart Analysis
          </h2>

          <div className="text-gray-200 whitespace-pre-line leading-relaxed text-base">
            {analysis}
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
              {loading ? "Thinking..." : "Ask AI"}
            </button>
          </div>
        </div>
      )}

      {/* SIMPLE FADE ANIMATION */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.6s ease-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
}