"use client";

export default function Features() {
  const features = [
    {
      title: "Upload Any Chart Screenshot",
      desc: "Forex, Crypto, Indices, or Stocks. No symbols, no timeframes.",
    },
    {
      title: "AI Reads Market Structure",
      desc: "Trend, bias, liquidity zones, and momentum explained clearly.",
    },
    {
      title: "Beginner Friendly",
      desc: "No indicators. No strategies. Just price action clarity.",
    },
    {
      title: "Institutional Style Analysis",
      desc: "Smart money concepts in simple language.",
    },
    {
      title: "Fast & Private",
      desc: "Instant analysis. No chart is stored.",
    },
    {
      title: "Ask Follow-up Questions",
      desc: "Chat with AI on the same chart for deeper insight.",
    },
  ];

  return (
    <section className="relative z-10 w-full mt-32 border-t border-white/10 pt-20">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-4">
          Why Trader Chart AI?
        </h2>

        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-16">
          Built for traders who want clarity, not complexity.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((item, idx) => (
            <div
              key={idx}
              className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-6"
            >
              <h3 className="text-lg font-semibold mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-gray-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}