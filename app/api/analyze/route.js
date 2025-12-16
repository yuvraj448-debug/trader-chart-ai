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
        { analysis: "No image uploaded." },
        { status: 400 }
      );
    }

    // Convert image → base64
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
You are a professional institutional trader.

Analyze ANY trading chart screenshot (forex, crypto, stocks, indices).

Give:
• Market bias
• Liquidity zones
• Key support & resistance
• Possible scenarios
• Entry / SL / TP ideas
• Risk management

User question: ${question || "No extra question"}
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
      response.output_text || "No analysis returned.";

    return NextResponse.json({ analysis: output });

  } catch (error) {
    console.error("AI ERROR:", error);
    return NextResponse.json(
      { analysis: "AI error. Try again." },
      { status: 500 }
    );
  }
}