"use client";

import { useState } from "react";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Pricing from "./components/Pricing";
import Dashboard from "./components/Dashboard";

export default function Home() {
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔹 DEMO AI (TEMPORARY – NO API)
  const submitAnalysis = () => {
    setLoading(true);

    setTimeout(() => {
      setAnalysis(`
📊 AI Chart Analysis (Demo Mode)

• Market Structure: Bullish (higher highs & higher lows)
• Liquidity: Sell-side liquidity resting below recent swing low
• Bias: Look for pullback into premium zone before continuation
• Session Context: Best confirmation during London / NY overlap
• Risk Note: Avoid FOMO entries near highs

⚠️ Live AI analysis will be enabled soon.
      `);

      setLoading(false);
    }, 1500);
  };

  return (
    <>
      {/* HERO SECTION */}
      <Hero />

      {/* ANALYZE CARD */}
      <section className="relative z-10 mt-12 flex justify-center px-4">
        <div className="w-full max-w-xl rounded-2xl border border-white/10 bg-black/60 p-4 backdrop-blur">
          <button
            onClick={submitAnalysis}
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 text-black font-semibold"
          >
            {loading ? "Analyzing..." : "Analyze Chart"}
          </button>
        </div>
      </section>

      {/* ANALYSIS OUTPUT */}
      {analysis && (
        <section className="relative z-10 mt-6 flex justify-center px-4">
          <div className="w-full max-w-xl whitespace-pre-wrap rounded-2xl border border-white/10 bg-black/70 p-4 text-white">
            {analysis}
          </div>
        </section>
      )}

      {/* WHY / FEATURES */}
      <Features />

      {/* PRICING */}
      <Pricing />

      {/* DASHBOARD PREVIEW */}
      <Dashboard />
    </>
  );
}