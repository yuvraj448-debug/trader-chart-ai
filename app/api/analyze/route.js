import OpenAI from "openai";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const question =
      formData.get("question") || "Analyze this trading chart like a professional trader.";

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400 }
      );
    }

    // Convert image → base64 (Node compatible)
    const buffer = Buffer.from(await image.arrayBuffer());
    const base64Image = buffer.toString("base64");

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

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
              image_base64: base64Image,
            },
          ],
        },
      ],
    });

    const analysis =
      response.output_text ||
      "No analysis returned. Try again with a clearer chart.";

    return new Response(
      JSON.stringify({ analysis }),
      { status: 200 }
    );
  } catch (error) {
    console.error("AI ANALYZE ERROR:", error);
    return new Response(
      JSON.stringify({ error: "AI analysis failed. Try again." }),
      { status: 500 }
    );
  }
}