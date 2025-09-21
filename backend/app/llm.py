import os
import requests

# Load Gemini API key from environment
GEMINI_API_KEY = os.getenv("AIzaSyB4ywb8Odgxg2CY7TJD9qvmI_MayPfy7oQ")  # Make sure your .env has it

BASE_URL = "https://generativelanguage.googleapis.com/v1beta2/models/text-bison-001:generate"

def send_message_to_llm(messages, model="text-bison-001"):
    """
    Sends messages to Gemini API and returns the generated response.
    messages: list of {"role": "user"/"system", "content": "..."}
    """
    # Construct prompt text by concatenating messages
    prompt_text = ""
    for msg in messages:
        if msg["role"] == "system":
            prompt_text += f"[System]: {msg['content']}\n"
        else:
            prompt_text += f"[User]: {msg['content']}\n"

    payload = {
        "prompt": prompt_text,
        "temperature": 0.7,
        "maxOutputTokens": 1024
    }

    headers = {
        "Authorization": f"Bearer {GEMINI_API_KEY}",
        "Content-Type": "application/json"
    }

    response = requests.post(BASE_URL, json=payload, headers=headers)

    if response.status_code == 200:
        data = response.json()
        # Gemini response text is usually in data['candidates'][0]['content']
        return {"response": data.get("candidates", [{}])[0].get("content", "")}
    else:
        return {"error": response.text}
