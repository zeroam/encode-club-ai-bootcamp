import requests
import json

url = "http://127.0.0.1:5000/v1/completions"

headers = {"Content-Type": "application/json"}

while True:
    user_message = input("> ")
    body = {"prompt": user_message}
    response = requests.post(url, headers=headers, json=body, verify=False)
    message_response = json.loads(response.content.decode("utf-8"))
    assistant_message = message_response["choices"][0]["text"]
    print(user_message + assistant_message)
    print("\n")
