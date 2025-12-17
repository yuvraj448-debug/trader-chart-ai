export default function Pricing() {
  return (
    <section style={{ maxWidth: 900, margin: "120px auto" }}>
      <h2 style={{ fontSize: 28, textAlign: "center" }}>
        Pricing
      </h2>

      <div style={{ display: "grid", gap: 20, marginTop: 40 }}>
        <div style={{ border: "1px solid #222", padding: 20 }}>Free</div>
        <div style={{ border: "1px solid white", padding: 20 }}>Pro</div>
        <div style={{ border: "1px solid #222", padding: 20 }}>Institutional</div>
      </div>
    </section>
  );
}