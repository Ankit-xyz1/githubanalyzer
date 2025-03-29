import { NextResponse } from "next/server";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: "AIzaSyAlAel9r8ieQxwmok-IOjtRRkT8m80nVRE",
});

export async function GET() {
  //api body like we can connect to db some fetch request whatsoever
  return NextResponse.json({
    message: "hello i am a next api serverless fuction",
  });
}

export async function POST(request: Request) {
  const { quest } = await request.json();
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `${quest}`,
    config: {
      systemInstruction: "You are a github expert. Your name is GitxAi. return medium size response and faster if its taking more than 5 secs stop and send the response which is genrated",
    },
  });
  return NextResponse.json({
    Message: `answer :  ${response.text}`,
  });
}
