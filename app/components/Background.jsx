export default function Background() {
  return (
    <div className="ai-bg">
      <svg
        viewBox="0 0 800 800"
        className="ai-bg-svg"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#4cc9f0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0b132b" stopOpacity="0.05" />
          </radialGradient>
        </defs>

        {/* Rotating rings */}
        <circle cx="400" cy="400" r="260" className="ring r1" />
        <circle cx="400" cy="400" r="210" className="ring r2" />
        <circle cx="400" cy="400" r="160" className="ring r3" />

        {/* Flow lines */}
        <path
          d="M150 400 C300 150, 500 150, 650 400"
          className="flow"
        />
        <path
          d="M150 400 C300 650, 500 650, 650 400"
          className="flow"
        />
      </svg>
    </div>
  );
}