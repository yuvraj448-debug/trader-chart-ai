import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const imageFile = formData.get("image");
    const question = formData.get("question") || "";

    if (!imageFile) {
      return new Response(
        JSON.stringify({ analysis: "No image received." }),
        { status: 400 }
      );
    }

    const bytes = await imageFile.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const base64Image = buffer.toString("base64");

    const prompt = `
You are a professional institutional trader.

Analyze ANY trading chart screenshot (forex, crypto, stocks, indices).

Give:
1. Market structure
2. Liquidity zones
3. Possible trade idea (entry, SL, TP)
4. Risk & invalidation
5. Beginner-friendly explanation

User question:
"${question}"
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4.1",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: prompt },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 800,
    });

    return new Response(
      JSON.stringify({
        analysis: response.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ analysis: "AI error. Try again." }),
      { status: 500 }
    );
  }
}