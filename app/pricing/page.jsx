"use client";

export default function PricingPage() {
  return (
    <main className="min-h-screen bg-black text-white px-4 pt-24 pb-24 flex flex-col items-center">
      
      {/* HEADER */}
      <div className="text-center max-w-2xl mb-16">
        <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm bg-blue-500/10 text-blue-400">
          💎 Simple & Transparent Pricing
        </span>
        <h1 className="text-4xl md:text-5xl font-bold">
          Choose Your <span className="text-blue-400">Trading Edge</span>
        </h1>
        <p className="text-gray-400 mt-4">
          Start free. Upgrade only when you’re ready.
        </p>
      </div>

      {/* PRICING GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">

        {/* FREE */}
        <PriceCard
          title="Free Trial"
          price="₹0"
          duration="2 Chart Analyses"
          features={[
            "Upload any chart",
            "AI-powered analysis",
            "Basic insights",
            "No credit card required",
          ]}
          button="Start Free"
        />

        {/* 1 DAY */}
        <PriceCard
          title="1 Day Access"
          price="₹99"
          duration="24 Hours"
          highlight
          features={[
            "Unlimited chart uploads",
            "Full AI analysis",
            "Follow-up questions",
            "Priority processing",
          ]}
          button="Upgrade (Soon)"
        />

        {/* 7 DAYS */}
        <PriceCard
          title="7 Days Pro"
          price="₹499"
          duration="7 Days"
          features={[
            "Unlimited charts",
            "Advanced insights",
            "Faster responses",
            "Best for active traders",
          ]}
          button="Upgrade (Soon)"
        />

        {/* 1 MONTH */}
        <PriceCard
          title="Monthly Pro"
          price="₹999"
          duration="30 Days"
          features={[
            "Unlimited access",
            "Full smart-money analysis",
            "All future updates",
            "Best value",
          ]}
          button="Upgrade (Soon)"
        />

        {/* LIFETIME */}
        <PriceCard
          title="Lifetime Access"
          price="₹2999"
          duration="One-time payment"
          features={[
            "Unlimited forever",
            "All future features",
            "No subscriptions",
            "Early access perks",
          ]}
          button="Get Lifetime (Soon)"
        />
      </div>

      {/* FOOTER NOTE */}
      <p className="text-gray-500 text-sm mt-16 max-w-xl text-center">
        Payments & upgrades will be enabled soon.  
        Pricing shown is for early adopters only.
      </p>
    </main>
  );
}

/* 🔲 PRICE CARD COMPONENT */
function PriceCard({ title, price, duration, features, button, highlight }) {
  return (
    <div
      className={`relative rounded-2xl p-8 bg-neutral-900/80 backdrop-blur border
      ${highlight ? "border-blue-500 shadow-blue-500/20 shadow-2xl scale-105" : "border-neutral-800"}`}
    >
      {highlight && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-500 text-black text-xs font-semibold px-3 py-1 rounded-full">
          MOST POPULAR
        </span>
      )}

      <h3 className="text-xl font-semibold mb-2 text-center">{title}</h3>
      <p className="text-4xl font-bold text-center mb-1">{price}</p>
      <p className="text-gray-400 text-sm text-center mb-6">{duration}</p>

      <ul className="space-y-3 mb-6">
        {features.map((f, i) => (
          <li key={i} className="text-gray-300 text-sm flex gap-2">
            ✅ {f}
          </li>
        ))}
      </ul>

      <button
        disabled
        className="w-full py-3 rounded-xl bg-white/10 text-white cursor-not-allowed"
      >
        {button}
      </button>
    </div>
  );
}