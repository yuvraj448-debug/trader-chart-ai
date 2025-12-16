export default function Features() {
  return (
    <section className="relative z-10 mt-24 w-full max-w-5xl px-4 text-white">
      <h2 className="text-3xl font-bold text-center mb-10">
        Why Trader Chart AI?
      </h2>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-2">AI Market Reading</h3>
          <p className="text-gray-400">
            Upload any chart and get institutional-style analysis instantly.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-2">Follow-up Questions</h3>
          <p className="text-gray-400">
            Ask deeper questions and refine bias like a pro trader.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-black/60 p-6 backdrop-blur">
          <h3 className="text-xl font-semibold mb-2">Price Action Focused</h3>
          <p className="text-gray-400">
            No indicators. Just pure structure, liquidity, and intent.
          </p>
        </div>
      </div>
    </section>
  );
}