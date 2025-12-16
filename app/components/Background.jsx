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
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Ring 1 */}
        <circle
          cx="200"
          cy="200"
          r="120"
          fill="none"
          stroke="#4cc9f0"
          strokeWidth="1.5"
          filter="url(#glow)"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="40s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Ring 2 */}
        <circle
          cx="200"
          cy="200"
          r="150"
          fill="none"
          stroke="#4cc9f0"
          strokeWidth="1.5"
          filter="url(#glow)"
          opacity="0.8"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="360 200 200"
            to="0 200 200"
            dur="65s"
            repeatCount="indefinite"
          />
        </circle>

        {/* Ring 3 */}
        <circle
          cx="200"
          cy="200"
          r="180"
          fill="none"
          stroke="#4cc9f0"
          strokeWidth="1.2"
          filter="url(#glow)"
          opacity="0.6"
        >
          <animateTransform
            attributeName="transform"
            type="rotate"
            from="0 200 200"
            to="360 200 200"
            dur="90s"
            repeatCount="indefinite"
          />
        </circle>
      </svg>
    </div>
  );
}