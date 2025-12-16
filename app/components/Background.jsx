export default function Background() {
  return (
    <div
      className="
        fixed inset-0 
        -z-10 
        pointer-events-none
        overflow-hidden
      "
    >
      {/* Stars */}
      <div className="absolute inset-0 bg-[radial-gradient(white_1px,transparent_1px)] bg-[size:24px_24px] opacity-[0.15]" />

      {/* Animated Rings */}
      <div className="absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 animate-spin-slow">
        <div className="absolute inset-0 rounded-full border border-cyan-400/30 blur-sm" />
        <div className="absolute inset-10 rounded-full border border-cyan-400/20" />
        <div className="absolute inset-20 rounded-full border border-cyan-400/10" />
      </div>
    </div>
  );
}