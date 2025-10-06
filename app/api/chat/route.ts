import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { messages, verses } = await req.json();

    const systemPrompt = `You are a knowledgeable assistant specializing in the Rigveda, one of the oldest sacred texts of Hinduism. 
You have access to verses from the Rigveda and can answer questions about them.

Context - Available Rigveda verses:
${verses
  .slice(0, 5)
  .map(
    (v: any) =>
      `Mandala ${v.mandala}, Sukta ${v.sukta}: ${v.text.substring(0, 200)}...`
  )
  .join("\n\n")}

Guidelines:
- Provide accurate, respectful information about the Rigveda
- Cite mandala and sukta numbers when referencing specific verses
- Explain concepts clearly for both beginners and scholars
- If you don't know something, admit it rather than speculating
- Be culturally sensitive and respectful of Hindu traditions`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "system", content: systemPrompt }, ...messages],
      temperature: 0.7,
      max_tokens: 800,
    });

    return NextResponse.json({
      message: completion.choices[0].message.content,
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to process chat" },
      { status: 500 }
    );
  }
}
