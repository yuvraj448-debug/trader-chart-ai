export default function AICore() {
  return (
    <div className="ai-core-wrapper">
      <svg
        className="ai-core"
        viewBox="0 0 500 500"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="glow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00f6ff" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>
        </defs>

        {/* Outer rotating rings */}
        <g className="ring ring-1">
          <circle cx="250" cy="250" r="190" />
        </g>
        <g className="ring ring-2">
          <circle cx="250" cy="250" r="160" />
        </g>
        <g className="ring ring-3">
          <circle cx="250" cy="250" r="130" />
        </g>

        {/* Flow lines */}
        <path d="M120 250 C200 100, 300 100, 380 250" className="flow" />
        <path d="M120 250 C200 400, 300 400, 380 250" className="flow" />
        <path d="M250 120 C100 200, 100 300, 250 380" className="flow" />
        <path d="M250 120 C400 200, 400 300, 250 380" className="flow" />
      </svg>
    </div>
  );
}