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
    const previous = formData.get("previous") || "";

    if (!image) {
      return NextResponse.json(
        { analysis: "No image provided." },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
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
Analyze price action, structure, liquidity, momentum & intent.

Previous analysis:
${previous}

User question:
${question || "Give full market analysis"}
`,
            },
            {
              type: "input_image",
              image_base64: base64Image,
            },
          ],
        },
      ],
    });

    const output =
      response.output?.[0]?.content?.[0]?.text ||
      "No analysis generated. Try again.";

    return NextResponse.json({ analysis: output });
  } catch (err) {
    console.error("AI ERROR:", err);
    return NextResponse.json(
      { analysis: "AI error. Try again." },
      { status: 500 }
    );
  }
}