import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const question = formData.get("question") || "";

    if (!imageFile) {
      return NextResponse.json(
        { analysis: "❌ No image uploaded." },
        { status: 400 }
      );
    }

    // Convert image to base64
    const bytes = await imageFile.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: `
You are a professional institutional trader and smart money analyst.

Analyze ANY trading chart screenshot (forex, crypto, stocks, indices).
Give a premium, clean, confident analysis with emojis.

STRICT FORMAT:

📊 **Market Bias**
- Direction + reasoning

💧 **Liquidity Zones**
- Buy-side liquidity
- Sell-side liquidity
- Stop hunts / inducements

📈 **Key Support & Resistance**
- Major support levels
- Major resistance levels

🎯 **Trade Scenarios**
1️⃣ Bullish scenario
2️⃣ Bearish scenario
3️⃣ Range / consolidation scenario

🛑 **Risk Management**
- Invalidation level
- Risk notes

🧠 **Smart Money Insight**
- One institutional-level insight

Answer the user's question clearly if provided.

User Question:
"${question}"
              `,
            },
            {
              type: "input_image",
              image_url: `data:image/png;base64,${base64Image}`,
            },
          ],
        },
      ],
    });

    const output =
      response.output_text || "⚠️ No analysis returned by AI.";

    return NextResponse.json({ analysis: output });
  } catch (error) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      { analysis: "❌ AI error. Please try again." },
      { status: 500 }
    );
  }
}