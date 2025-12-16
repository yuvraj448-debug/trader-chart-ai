"use client";

import { useState } from "react";

export default function Home() {
  const [image, setImage] = useState(null);
  const [question, setQuestion] = useState("");
  const [followUp, setFollowUp] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [loading, setLoading] = useState(false);

  const submitAnalysis = async (isFollowUp = false) => {
    if (!image) {
      alert("Upload a chart screenshot first");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append(
      "question",
      isFollowUp ? followUp : question
    );
    formData.append("previous", analysis);

    const res = await fetch("/api/analyze", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setAnalysis(isFollowUp ? analysis + "\n\n" + data.analysis : data.analysis);
    setFollowUp("");
    setLoading(false);
  };

  return (
    <main className="relative z-10 flex min-h-screen flex-col items-center justify-start px-4 pt-20 text-white">
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
          onClick={() => submitAnalysis(false)}
          className="w-full rounded-xl bg-white py-3 text-black font-semibold"
          disabled={loading}
        >
          {loading ? "Analyzing..." : "Analyze Chart"}
        </button>
      </div>

      {analysis && (
        <div className="mt-6 w-full max-w-xl bg-black/70 border border-white/10 rounded-2xl p-4 whitespace-pre-wrap">
          {analysis}

          <div className="mt-4 border-t border-white/10 pt-4">
            <input
              type="text"
              placeholder="Ask a follow-up about this chart..."
              value={followUp}
              onChange={(e) => setFollowUp(e.target.value)}
              className="mb-2 w-full rounded-lg bg-black px-3 py-2 text-white outline-none border border-white/10"
            />

            <button
              onClick={() => submitAnalysis(true)}
              className="w-full rounded-xl bg-white py-2 text-black font-semibold"
              disabled={loading}
            >
              {loading ? "Thinking..." : "Ask Follow-up"}
            </button>
          </div>
        </div>
      )}
    </main>
  );
}