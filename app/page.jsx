const submitAnalysis = async () => {
  setLoading(true);

  setTimeout(() => {
    setAnalysis(`
📊 AI Chart Analysis (Demo Mode)

• Market Structure: Bullish
• Liquidity: Resting below recent low
• Bias: Wait for pullback to premium
• Risk: Avoid chasing breakout

⚠️ Live AI will be enabled shortly.
    `);
    setLoading(false);
  }, 1500);
};