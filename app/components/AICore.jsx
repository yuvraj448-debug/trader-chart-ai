const analyzeChart = async () => {
  if (!imageBase64 || loading) return;

  setLoading(true);
  setAnalysis("");

  try {
    const controller = new AbortController();
    setTimeout(() => controller.abort(), 60000); // 60s timeout

    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image: imageBase64,
        question:
          "Analyze this trading chart like a professional institutional trader.",
      }),
      signal: controller.signal,
    });

    if (!res.ok) {
      const err = await res.text();
      setAnalysis("Server error: " + err);
      setLoading(false);
      return;
    }

    const data = await res.json();

    if (!data.result) {
      setAnalysis("No analysis returned from AI.");
    } else {
      setAnalysis(data.result);
    }
  } catch (err) {
    setAnalysis(
      err.name === "AbortError"
        ? "AI request timed out. Try again."
        : "Network or AI error."
    );
  }

  setLoading(false);
};