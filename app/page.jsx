"use client";
import { useState, useEffect } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [result, setResult] = useState("");
  const [displayedText, setDisplayedText] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnalysis = async () => {
    if (!image) {
      alert("Please upload a chart screenshot");
      return;
    }

    setLoading(true);
    setResult("");
    setDisplayedText("");

    const formData = new FormData();
    formData.append("image", image);
    formData.append("question", question);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResult(data.analysis);
    } catch (err) {
      setResult("❌ AI error. Please try again.");
    }

    setLoading(false);
  };

  // Typing animation
  useEffect(() => {
    if (!result) return;

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText((prev) => prev + result.charAt(i));
      i++;
      if (i >= result.length) clearInterval(interval);
    }, 10);

    return () => clearInterval(interval);
  }, [result]);

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-3xl font-bold text-center">
          Trader Chart AI
        </h1>

        <div className="bg-[#0b0b0b] border border-[#1a1a1a] rounded-2xl p-5 space-y-4">
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full text-sm"
          />

          <input
            type="text"
            placeholder="Ask anything about this chart (optional)..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full bg-black border border-[#1a1a1a] rounded-xl px-4 py-2 text-sm outline-none"
          />

          <button
            onClick={submitAnalysis}
            disabled={loading}
            className="w-full bg-white text-black rounded-xl py-3 font-semibold hover:opacity-90 transition"
          >
            {loading ? "Analyzing..." : "Analyze Chart"}
          </button>
        </div>

        {displayedText && (
          <div className="analysis-box">
            {displayedText}
          </div>
        )}
      </div>
    </main>
  );
}