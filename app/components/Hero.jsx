export default function Hero() {
  return (
    <section style={{ paddingTop: 120, textAlign: "center" }}>
      <h1 style={{ fontSize: 36, fontWeight: "bold" }}>
        Trader Chart AI
      </h1>

      <p style={{ color: "#aaa", marginTop: 12 }}>
        Upload any chart screenshot. Let AI read the market like a pro.
      </p>

      <div style={{ marginTop: 24 }}>
        <button
          style={{
            padding: "14px 24px",
            background: "white",
            color: "black",
            borderRadius: 12,
            fontWeight: 600,
          }}
        >
          Analyze Chart
        </button>
      </div>
    </section>
  );
}