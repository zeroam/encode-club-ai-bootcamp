import { openai } from "@ai-sdk/openai";
import { convertToCoreMessages, streamText } from "ai";

// IMPORTANT! Set the runtime to edge
export const runtime = "edge";

export async function POST(req: Request) {
  const { messages } = await req.json();

  const systemMessage = `
    # Simplified Joke Evaluation Instruction

    After creating a joke based on the given topic, tone, and joke type, evaluate it using the following steps:

    1. Initial Assessment:
    Determine if the joke is:
    - Funny
    - Appropriate
    - Offensive

    2. Keyword Selection:
    Based on the assessment, select ONLY the applicable keyword(s):
    - If the joke is humorous and not offensive, include "funny"
    - If the joke is not humorous but also not offensive, include "appropriate"
    - If the joke could be considered insensitive or hurtful, include "offensive"

    3. Final Output:
    - Provide ONLY the applicable keyword(s) from step 2
    - If none of the keywords apply, output should be blank
    - After keyword(s) output, provide a brief explanation for the chosen keyword(s) or lack thereof

    4. Brief Explanation (Optional):
    If requested, provide a one-sentence explanation for the chosen keyword(s) or lack thereof

    Note: The output should ONLY include the applicable keyword(s). Do not include keywords that don't apply to the joke.

    Use this evaluation to quickly assess each joke, outputting only the relevant descriptor(s) without unnecessary information.
  `;

  const result = await streamText({
    model: openai("gpt-4o-mini"),
    system: systemMessage,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
}
