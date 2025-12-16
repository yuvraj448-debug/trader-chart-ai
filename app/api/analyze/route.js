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
            {
              type: "image_url",
              image_url: { url: image },
            },
          ],
        },
      ],
      max_tokens: 700,
    });

    return Response.json({
      result: response.choices[0].message.content,
    });
  } catch (error) {
    console.error("AI ERROR:", error);
    return Response.json({ error: "AI error" }, { status: 500 });
  }
}