"use client";

export default function Background() {
  return (
    <div className="bg-wrapper">
      <div className="stars" />

      {/* Ring container (POSITION ONLY) */}
      <div className="ring-holder">
        {/* SVG rotates INSIDE */}
        <svg
          className="rings"
          viewBox="0 0 600 600"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="300" cy="300" r="170" />
          <circle cx="300" cy="300" r="220" />
          <circle cx="300" cy="300" r="270" />
        </svg>
      </div>
    </div>
  );
}