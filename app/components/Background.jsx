export default function Background() {
  return (
    <div className="ai-bg">
      <div className="stars"></div>

      <svg
        className="ai-core"
        viewBox="0 0 600 600"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="300" cy="300" r="220" className="ring r1" />
        <circle cx="300" cy="300" r="180" className="ring r2" />
        <circle cx="300" cy="300" r="140" className="ring r3" />

        <path
          d="M300 80 C430 180 430 420 300 520"
          className="flow"
        />
        <path
          d="M80 300 C180 430 420 430 520 300"
          className="flow"
        />
      </svg>
    </div>
  );
}