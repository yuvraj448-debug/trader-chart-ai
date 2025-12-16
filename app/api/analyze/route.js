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

    const completion = await openai.chat.completions.create({
     model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `You are a professional trader. Analyze this chart clearly.
${question}`,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/png;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      analysis: completion.choices[0].message.content,
    });
  } catch (err) {
    console.error("AI FULL ERROR:", err);
    return NextResponse.json(
      { analysis: "AI error. Try again." },
      { status: 500 }
    );
  }
}