import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

// Utility function to check if input is a raw file URL
function isRawUrl(input: string): boolean {
  return /^https:\/\/raw\.githubusercontent\.com\/.+/.test(input);
}

// Fetch raw file content if a GitHub raw file URL is given
async function fetchFileContent(url: string): Promise<string> {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    console.error("Failed to fetch file from URL:", err);
    throw new Error("Could not fetch the file from the given URL.");
  }
}

// POST handler for code summarization
export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const body = await req.json();
    const input: string = body.code;

    if (!input) {
      return NextResponse.json({ error: "Code input is required." }, { status: 400 });
    }

    let codeContent = input;

    // Check if input is a GitHub raw file URL
    if (isRawUrl(input)) {
      codeContent = await fetchFileContent(input);
    }

    const genai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genai.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `You are a senior software engineer. Summarize the following code by explaining:
- What it does
- Its key components and structure
- Any notable logic, libraries, or patterns used

Be clear, concise, and provide the summary in **Markdown** format:\n\n${codeContent}`;

    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    return NextResponse.json({ summary: text });
  } catch (err) {
    console.error("Error generating summary:", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
