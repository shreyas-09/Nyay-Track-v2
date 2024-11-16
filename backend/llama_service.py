import requests
from config import CHATGROQ_API_KEY

def invoke_llama(prompt: str) -> str:
    """
    Calls the LLaMA model with the provided prompt.
    """
    response = requests.post(
        "https://api.chatgroq.com/llama",
        json={"prompt": prompt, "max_tokens": 500},
        headers={"Authorization": f"Bearer {CHATGROQ_API_KEY}"}
    )

    if response.status_code == 200:
        return response.json().get("output", "No response from LLaMA")
    else:
        raise Exception(f"Error from LLaMA API: {response.status_code} - {response.text}")
