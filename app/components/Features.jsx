export default function Features() {
  return (
    <section className="relative z-10 mt-40 px-6 py-24 text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Why Traders Use Trader Chart AI
        </h2>

        <p className="text-center text-gray-400 mb-16 max-w-2xl mx-auto">
          Built for serious traders who want clarity, precision, and confidence
          before entering a trade.
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Smart Chart Reading
            </h3>
            <p className="text-gray-400">
              AI detects trend, structure, liquidity sweeps, and key levels from
              your chart screenshots.
            </p>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Follow-Up Questions
            </h3>
            <p className="text-gray-400">
              Ask deeper questions about entries, bias, stop loss and targets
              without reuploading charts.
            </p>
          </div>

          <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
            <h3 className="text-xl font-semibold mb-2">
              Built for Traders
            </h3>
            <p className="text-gray-400">
              No generic AI talk. Responses are focused on trading logic and
              decision-making.
            </p>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div className="mt-24">
          <h3 className="text-2xl font-bold text-center mb-10">
            What Traders Say
          </h3>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 mb-2">
                “This AI explains charts better than most YouTube gurus.”
              </p>
              <span className="text-sm text-gray-500">
                — Forex Trader
              </span>
            </div>

            <div className="bg-black/60 border border-white/10 rounded-2xl p-6">
              <p className="text-gray-300 mb-2">
                “Perfect for quick confirmation before London & NY sessions.”
              </p>
              <span className="text-sm text-gray-500">
                — Gold Trader
              </span>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-24 text-center">
          <h3 className="text-2xl font-bold mb-4">
            Ready to Read the Market Smarter?
          </h3>
          <p className="text-gray-400 mb-6">
            Upload a chart and let AI break it down in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}