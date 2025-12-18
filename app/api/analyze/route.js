import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const question = formData.get("question") || "";

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image uploaded" }),
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
You are an institutional forex trader.
Analyze the uploaded chart using:
- Market structure
- Liquidity (buy/sell side)
- Premium/discount
- Bias (bullish/bearish)
- Session timing
- Risk notes

${question}
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
      response.output_text || "No analysis returned.";

    return new Response(
      JSON.stringify({ result: output }),
      { status: 200 }
    );
  } catch (error) {
    console.error("AI ERROR:", error);
    return new Response(
      JSON.stringify({ error: "AI analysis failed" }),
      { status: 500 }
    );
  }
}