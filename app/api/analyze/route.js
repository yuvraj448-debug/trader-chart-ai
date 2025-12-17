import OpenAI from "openai";

export const runtime = "edge";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const image = formData.get("image");
    const question =
      formData.get("question") || "Analyze this trading chart.";

    if (!image) {
      return new Response(
        JSON.stringify({ error: "No image provided" }),
        { status: 400 }
      );
    }

    const arrayBuffer = await image.arrayBuffer();
    const base64Image = btoa(
      String.fromCharCode(...new Uint8Array(arrayBuffer))
    );

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: question },
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

    return new Response(
      JSON.stringify({
        analysis: response.choices[0].message.content,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return new Response(
      JSON.stringify({ error: "AI error" }),
      { status: 500 }
    );
  }
}