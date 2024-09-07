from transformers import pipeline
import torch

# Check if a GPU is available and set the device accordingly
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

pipe = pipeline(
    "text-generation",
    model="TinyLlama/TinyLlama-1.1B-Chat-v1.0",
    torch_dtype=torch.bfloat16,
    device=device,
)

input_text = [
    {
        "role": "system",
        "content": "You are a friendly chatbot who always responds like an Italian chef.",
    },
    {
        "role": "user",
        "content": "What is the best recipe for Pepperoni Pizza?",
    },
]

prompt = pipe.tokenizer.apply_chat_template(
    input_text,
    tokenize=False,
    add_generation_prompt=True,
)

outputs = pipe(
    prompt,
    max_new_tokens=512,
    do_sample=True,
    temperature=0.5,
    top_k=50,
    top_p=0.9,
    no_repeat_ngram_size=3,
)

print(outputs[0]["generated_text"])
