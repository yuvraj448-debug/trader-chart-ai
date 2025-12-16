import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const { image, question } = await req.json();

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: question },
            { type: "image_url", image_url: { url: image } },
          ],
        },
      ],
      temperature: 0.4,
      max_tokens: 900,
    });

    const result =
      response?.choices?.[0]?.message?.content ||
      "AI could not analyze this chart.";

    return Response.json({ result });
  } catch (err) {
    console.error(err);
    return Response.json({ error: "AI error" }, { status: 500 });
  }
}