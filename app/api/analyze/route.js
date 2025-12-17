import OpenAI from "openai";

export const runtime = "nodejs"; // IMPORTANT

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const question =
      formData.get("question") || "Analyze this trading chart.";

    if (!image) {
      return Response.json(
        { error: "No image provided" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            { type: "input_text", text: question },
            {
              type: "input_image",
              image_base64: base64Image,
            },
          ],
        },
      ],
    });

    const output =
      response.output_text ||
      "No analysis returned.";

    return Response.json({ analysis: output });

  } catch (err) {
    console.error("AI ERROR:", err);

    // Prevent infinite loops
    return Response.json(
      {
        error:
          err?.message ||
          "AI request failed. Try again later.",
      },
      { status: 500 }
    );
  }
}