export default function Background() {
  return (
    <div className="ai-bg">
      {/* STARS */}
      <div className="stars" />

      {/* AI CORE */}
      <svg
        className="ai-bg-svg"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <radialGradient id="coreGlow">
            <stop offset="0%" stopColor="#4cc9f0" stopOpacity="1" />
            <stop offset="100%" stopColor="#4cc9f0" stopOpacity="0" />
          </radialGradient>
        </defs>

        <circle cx="300" cy="300" r="230" className="ring r1" />
        <circle cx="300" cy="300" r="190" className="ring r2" />
        <circle cx="300" cy="300" r="150" className="ring r3" />

        <path
          d="M300 70 C420 180 420 420 300 530"
          className="flow"
        />
        <path
          d="M70 300 C180 420 420 420 530 300"
          className="flow"
        />
      </svg>
    </div>
  );
}