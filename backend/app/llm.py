import os
import requests
from dotenv import load_dotenv

load_dotenv()

# Load Gemini API key from environment
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyB4ywb8Odgxg2CY7TJD9qvmI_MayPfy7oQ")

def send_message_to_llm(messages, model="text-bison-001"):
    """
    Sends messages to a mock LLM API and returns a generated response.
    For demo purposes, this returns a simple response.
    Replace with actual Gemini API integration.
    """
    try:
        # Mock response for demo - replace with actual API call
        user_message = ""
        for msg in messages:
            if msg["role"] == "user":
                user_message = msg["content"]
                break
        
        # Simple mock response
        mock_responses = [
            f"I understand you're asking about: {user_message}. This is a helpful response from the AI assistant.",
            f"Thank you for your question about {user_message}. Here's what I can help you with...",
            f"Based on your message '{user_message}', I can provide you with detailed information and assistance.",
            "I'm here to help! Let me provide you with a comprehensive response to your query.",
            "That's an interesting question! Let me break this down for you step by step."
        ]
        
        import random
        response = random.choice(mock_responses)
        
        return {"response": response}
        
    except Exception as e:
        return {"response": f"I apologize, but I encountered an error: {str(e)}. Please try again."}