export default function Background() {
  return (
    <>
      <div className="stars" />

      {/* LIVE RINGS */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 0,
          pointerEvents: "none",
        }}
      >
        <div
          style={{
            width: 600,
            height: 600,
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.3)",
            position: "absolute",
          }}
        />
        <div
          style={{
            width: 400,
            height: 400,
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.2)",
            position: "absolute",
          }}
        />
        <div
          style={{
            width: 200,
            height: 200,
            borderRadius: "50%",
            border: "1px solid rgba(0,255,255,0.15)",
            position: "absolute",
          }}
        />
      </div>
    </>
  );
}