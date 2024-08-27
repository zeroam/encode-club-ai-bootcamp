import os
from openai import OpenAI

client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
content = """
When did the current war between Russia and Ukraine started?
"""
messages = [
    {
        "role": "user",
        "content": content,
    }
]

print(f"Prompt:\n{messages[0]['content']}")

# models = ["gpt-4o-mini", "gpt-3.5-turbo", "gpt-4o"]
models = ["gpt-4o-mini"]


# Stream the response
for model in models:
    print(f"\n---\nGenerating chat complete with {model} model")
    stream = client.chat.completions.create(
        model=model,
        messages=messages,
        stream=True,
    )
    for chunk in stream:
        print(chunk.choices[0].delta.content or "", end="")

# Get the response
response = client.chat.completions.create(
    model=models[0],
    messages=messages,
)
print(f"\n\nResponse:\n{response.choices[0].message.content}")
