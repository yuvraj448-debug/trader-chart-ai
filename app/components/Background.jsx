export default function Background() {
  return (
    <div className="ai-bg">
      <div className="stars" />

      <svg
        className="ai-core"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g>
          <circle
            cx="200"
            cy="200"
            r="120"
            stroke="#4cc9f0"
            strokeWidth="1.4"
            fill="none"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="50s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="200"
            cy="200"
            r="150"
            stroke="#4cc9f0"
            strokeWidth="1.2"
            fill="none"
            opacity="0.7"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="360 200 200"
              to="0 200 200"
              dur="80s"
              repeatCount="indefinite"
            />
          </circle>

          <circle
            cx="200"
            cy="200"
            r="180"
            stroke="#4cc9f0"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
            filter="url(#glow)"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 200 200"
              to="360 200 200"
              dur="110s"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
    </div>
  );
}