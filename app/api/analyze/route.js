import OpenAI from "openai";

export const runtime = "nodejs";

const openai = new OpenAI({
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
    const base64 = buffer.toString("base64");

    const response = await openai.responses.create({
      model: "gpt-4.1-mini",
      input: [
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: question,
            },
            {
              type: "input_image",
              image_url: {
                url: `data:image/png;base64,${base64}`,
              },
            },
          ],
        },
      ],
    });

    const output =
      response.output_text ||
      "No analysis returned.";

    return Response.json({
      analysis: output,
    });
  } catch (error) {
    console.error("AI ERROR:", error);

    return Response.json(
      {
        error:
          error?.message ||
          "AI failed. Try again later.",
      },
      { status: 500 }
    );
  }
}