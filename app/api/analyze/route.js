import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const symbol = formData.get("symbol");
    const timeframe = formData.get("timeframe");
    const session = formData.get("session");
    const question = formData.get("question") || "";

    if (!image) {
      return NextResponse.json({ error: "No image uploaded" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const response = await client.chat.completions.create({
      model: "gpt-4.1-mini",
      messages: [
        {
          role: "system",
          content: `
You are a professional institutional trader.
Analyze the trading chart deeply using Smart Money Concepts.

Rules:
- NEVER say you can't see the image
- Be confident and specific
- Use professional trader language
- Give clear bias, liquidity, entries, SL & TP
- Assume chart is ${symbol} ${timeframe} during ${session} session

Format response clearly with headings.
`,
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: question
                ? `User question: ${question}`
                : "Analyze this chart and provide full trading analysis.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:${image.type};base64,${buffer.toString(
                  "base64"
                )}`,
              },
            },
          ],
        },
      ],
      max_tokens: 900,
    });

    return NextResponse.json({
      analysis: response.choices[0].message.content,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "AI analysis failed" },
      { status: 500 }
    );
  }
}