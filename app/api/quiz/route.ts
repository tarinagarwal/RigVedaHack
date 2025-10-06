import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  try {
    const { verses, count = 5, difficulty = "medium" } = await req.json();

    const prompt = `Generate ${count} multiple-choice quiz questions about the Rigveda based on these verses:

${verses
  .map(
    (v: any, i: number) =>
      `${i + 1}. Mandala ${v.mandala}, Sukta ${v.sukta}:\n${v.text.substring(
        0,
        300
      )}`
  )
  .join("\n\n")}

Difficulty: ${difficulty}

Create questions that test:
- Knowledge of mandala and sukta numbers
- Understanding of verse content
- Recognition of specific verses
- General Rigveda knowledge

Return ONLY a valid JSON array with this exact structure:
[
  {
    "question": "Question text here",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Brief explanation of the correct answer",
    "mandala": 1,
    "sukta": 1
  }
]

Make sure:
- correctAnswer is the index (0-3) of the correct option
- Questions are clear and unambiguous
- Options are plausible but only one is correct
- Explanations are educational and concise`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a quiz generator for Rigveda education. Return only valid JSON array, no markdown formatting, no code blocks.",
        },
        { role: "user", content: prompt },
      ],
      temperature: 0.8,
      max_tokens: 2000,
    });

    let content = completion.choices[0].message.content || "[]";

    // Remove markdown code blocks if present
    content = content
      .replace(/```json\n?/g, "")
      .replace(/```\n?/g, "")
      .trim();

    const questions = JSON.parse(content);

    return NextResponse.json({ questions });
  } catch (error: any) {
    console.error("Quiz API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate quiz" },
      { status: 500 }
    );
  }
}
