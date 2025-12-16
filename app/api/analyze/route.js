import OpenAI from "openai";

export const runtime = "nodejs"; // IMPORTANT

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  console.log("🔹 API HIT");

  try {
    const body = await req.json();
    console.log("🔹 BODY RECEIVED");

    const { image, question } = body;

    if (!image || !question) {
      console.log("❌ Missing image or question");
      return Response.json(
        { error: "Missing image or question" },
        { status: 400 }
      );
    }

    console.log("🔹 Calling OpenAI");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: question },
            { type: "input_image", image_url: image },
          ],
        },
      ],
    });

    const text =
      response.output_text ||
      "AI could not generate analysis.";

    console.log("✅ AI RESPONSE OK");

    return Response.json({ result: text });
  } catch (err) {
    console.error("❌ API ERROR", err);
    return Response.json(
      { error: "Internal AI error" },
      { status: 500 }
    );
  }
}