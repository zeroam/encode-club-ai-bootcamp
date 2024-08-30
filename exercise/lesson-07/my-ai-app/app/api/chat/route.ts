import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

// Create an OpenAI API client (that's edge friendly!)
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
    const { messages } = await req.json();

    // Ask OpenAI for a streaming chat completion given the prompt
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        messages: [
            {
                role: "system",
                content: 'You are a professional chef. You provide detailed cooking instructions, tips, and advice on selecting the best ingredients.',
            },
            ...messages,
        ],
    });

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);
    // Respond with the stream
    return new StreamingTextResponse(stream);
}