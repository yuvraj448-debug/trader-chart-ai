export default function Background() {
  return (
    <div className="ai-bg">
      <div className="stars" />

      <svg
        className="ai-core"
        viewBox="0 0 400 400"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="6" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <circle
          cx="200"
          cy="200"
          r="120"
          className="ring ring1"
          filter="url(#glow)"
        />
        <circle
          cx="200"
          cy="200"
          r="150"
          className="ring ring2"
          filter="url(#glow)"
        />
        <circle
          cx="200"
          cy="200"
          r="180"
          className="ring ring3"
          filter="url(#glow)"
        />
      </svg>
    </div>
  );
}