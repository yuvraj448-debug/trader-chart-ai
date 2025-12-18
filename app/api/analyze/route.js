import OpenAI from "openai";

export const runtime = "nodejs";

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

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: `
You are an institutional forex trader.
Analyze the chart using:
- Market structure
- Liquidity
- Bias
- Premium / Discount
- Session context
- Risk notes

${question}
              `,
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
      max_tokens: 500,
    });

    return new Response(
      JSON.stringify({
        result: completion.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("AI ERROR:", err);
    return new Response(
      JSON.stringify({ error: "AI failed" }),
      { status: 500 }
    );
  }
}