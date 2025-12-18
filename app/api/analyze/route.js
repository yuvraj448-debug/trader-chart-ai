import OpenAI from "openai";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return new Response(
        JSON.stringify({ error: "Missing OPENAI_API_KEY" }),
        { status: 500 }
      );
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    // TEMP: text-only test (no image)
    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: "Reply only with: API WORKING",
    });

    return new Response(
      JSON.stringify({
        result: response.output_text,
      }),
      { status: 200 }
    );
  } catch (err) {
    console.error("OPENAI ERROR:", err);

    return new Response(
      JSON.stringify({
        error: err.message || "OpenAI failed",
      }),
      { status: 500 }
    );
  }
}