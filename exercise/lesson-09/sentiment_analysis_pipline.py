from transformers import pipeline
import torch

# Check if a GPU is available and set the device accordingly
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print(f"Using device: {device}")

classifier = pipeline("sentiment-analysis", device=device)

text = "I love coding in python!"

result = classifier(text)[0]

print(f"Label: {result['label']}, with score: {round(result['score'], 4)}")
