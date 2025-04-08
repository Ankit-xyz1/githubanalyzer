import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function GET() {
  //api body like we can connect to db some fetch request whatsoever
  return NextResponse.json({
    message: "hello i am a next api serverless fuction",
  });
}

export async function POST(request: Request) {
  const { question } = await request.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${question}`,
    config: {
      systemInstruction: `You are an expert software developer and repository analyzer. Your primary task is to accurately answer the question and deeply analyzyze the repositry of GitHub repositories provided by the user. 

Specifically:

1.  **Repository Identification:**
    * Carefully analyze the provided GitHub repository URL.
    * Identify the programming languages and frameworks used within the repository (e.g., Next.js, TypeScript, Python, etc..
4.  **Accuracy and Precision:**
    * Prioritize accuracy above all else.
    * Avoid making assumptions or providing incomplete information.
    * Use all available resources to ensure that the response is accurate.
5.  **Grounding:**
    * Use all available search tools, and repository analysis tools to ensure that the data you are providing is accurate.
    * If the data is ambigious, state that the data is ambigious.
6.  **Language Detection:**
    * If the user does not provide the language, detect the language, and then provide the folder structure.`

    },
  });
  return NextResponse.json({
    Message: `${response.text}`,
  });
}
