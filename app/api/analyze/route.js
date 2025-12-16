import { NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const question = formData.get("question") || "";

    if (!image) {
      return NextResponse.json(
        { analysis: "No image provided." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const base64Image = Buffer.from(bytes).toString("base64");

    console.log("🟢 Image received, size:", base64Image.length);

    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "system",
          content:
            "You are a professional institutional trader. Analyze the chart image deeply. Explain market structure, liquidity, bias, scenarios, and risk."
        },
        {
          role: "user",
          content: [
            { type: "text", text: question || "Analyze this chart." },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 700,
    });

    const output =
      response.choices?.[0]?.message?.content ||
      "No analysis generated.";

    console.log("✅ AI RESPONSE OK");

    return NextResponse.json({ analysis: output });
  } catch (err) {
    console.error("🔴 FULL AI ERROR:", err);
    return NextResponse.json(
      { analysis: "AI error. Try again." },
      { status: 500 }
    );
  }
}