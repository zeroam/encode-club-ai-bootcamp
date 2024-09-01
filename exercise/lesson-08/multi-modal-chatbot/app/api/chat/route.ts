import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(req: Request) {
    const { messages } = await req.json();

    const result = await streamText({
        model: openai("gpt-4o"),
        messages: convertToCoreMessages(messages),
    });

    return result.toDataStreamResponse();
}
