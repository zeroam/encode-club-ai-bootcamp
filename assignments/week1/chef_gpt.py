import os
import logging
from datetime import datetime
from openai import OpenAI

formatter = logging.Formatter("%(message)s")

now = datetime.now().strftime("%Y-%m-%d_%H-%M-%S")
file_handler = logging.FileHandler(f"chef_gpt_{now}.log")
file_handler.setFormatter(formatter)

# add file handler
logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)
logger.addHandler(file_handler)


def load_personality(name: str) -> str | None:
    dir_path = os.path.dirname(os.path.realpath(__file__))
    personality_path = os.path.join(dir_path, "personalities", f"{name}.txt")
    if not os.path.exists(personality_path):
        return None

    with open(personality_path, "r") as file:
        personality = file.read()
    return personality


def build_system_messages(name: str) -> list[dict]:
    personality = load_personality(name)
    instructions = (
        "You should only answer these three specific types of user inputs: "
        "1. Ingredient-based dish suggestions: Suggest only dish names without full recipes. "
        "2. Recipe requests for specific dishes: Provide a detailed recipe. "
        "3. Recipe critiques and improvement suggestions: Offer a constructive critique with suggested improvements. "
        "If message does not fall into one of these categories, you should decline message with politely."
    )
    return [
        {
            "role": "system",
            "content": f"{personality}",
        },
        {
            "role": "system",
            "content": f"{instructions}",
        },
    ]


def main():
    client = OpenAI()
    model = "gpt-4o-mini"

    logger.info("-" * 50)

    # Question 1: What ingredients do you have?
    messages = build_system_messages("nonna")

    question = "What ingredients do you have?:"
    logger.info(f"Question: {question}")

    user_input = input(f"{question}\n")
    logger.info(f"User input: {user_input}")
    messages.append(
        {
            "role": "user",
            "content": user_input,
        }
    )
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )

    system_output = response.choices[0].message.content or ""
    print(system_output)
    logger.info(f"System output(alex): {system_output}")

    # Question 2: Suggest me a detailed recipe and preparation steps for making {dish}
    messages = build_system_messages("zack")

    question = "Which dish would you like a recipe for?:"
    logger.info(f"Question: {question}")
    user_input = input(f"{question}\n")
    logger.info(f"User input: {user_input}")
    messages.append(
        {
            "role": "user",
            "content": user_input,
        }
    )
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )

    system_output = response.choices[0].message.content or ""
    logger.info(f"System output(nonna): {system_output}")
    print(system_output)

    # Question 3: Critique the recipe
    messages = build_system_messages("alex")

    is_proceed = input("Do you want to critique the recipe? (y/n): ")
    if is_proceed.lower() != "y":
        print("Goodbye!")
        return

    user_input = (
        f"Can you critique the recipe and suggest improvements?:\n{system_output}"
    )
    logger.info(f"User input: {user_input}")
    messages.append(
        {
            "role": "user",
            "content": user_input,
        }
    )
    response = client.chat.completions.create(
        model=model,
        messages=messages,
    )
    system_output = response.choices[0].message.content or ""
    logger.info(f"System output(zack): {system_output}")
    print(system_output)

    logger.info("-" * 50)


if __name__ == "__main__":
    main()
