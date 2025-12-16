"use client";

export default function Background() {
  return (
    <div className="bg-root">
      <div className="bg-stars" />

      <div className="bg-rings">
        <svg viewBox="0 0 500 500">
          <circle cx="250" cy="250" r="180" />
          <circle cx="250" cy="250" r="220" />
          <circle cx="250" cy="250" r="260" />
        </svg>
      </div>
    </div>
  );
}