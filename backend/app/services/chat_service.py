import os
from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

api_key = os.getenv("OPENAI_API_KEY")

if not api_key:
    raise ValueError("OPENAI_API_KEY not found in .env file")

client = OpenAI(api_key=api_key)


def answer_question(question: str, context: str) -> str:
    if not context or not context.strip():
        return "No document context available."

    prompt = f"""
You are an intelligent document assistant.

Rules:
1. Answer only from the given document context.
2. If the answer is not clearly present, say: "The answer is not clearly available in the document."
3. Keep the answer concise, clear, and relevant.
4. If the user asks for a summary, provide a meaningful summary of the full content.
5. Do not invent information.

Document Context:
{context}

User Question:
{question}
"""

    try:
        response = client.responses.create(
            model="gpt-4o-mini",
            instructions="Answer accurately using only the provided document context.",
            input=prompt,
        )

        answer = response.output_text.strip()

        if not answer:
            return "No answer was generated."

        return answer

    except Exception as e:
        return f"AI chat error: {str(e)}"