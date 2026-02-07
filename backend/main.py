from fastapi import FastAPI
from pydantic import BaseModel
import json, os
import openai

app = FastAPI()

# Load OpenAI key from Render secrets
openai.api_key = os.getenv("OPENAI_API_KEY")

with open("repo_data.json", "r", encoding="utf-8") as f:
    repo_data = json.load(f)

class Query(BaseModel):
    query: str

@app.get("/repo")
async def get_repo():
    return repo_data

@app.post("/ask")
async def ask(query: Query):
    # For simplicity, just send whole repo content (or top N files)
    prompt = f"Repo contents: {json.dumps(repo_data)[:3000]}\n\nQuestion: {query.query}"
    response = openai.ChatCompletion.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return {"answer": response.choices[0].message.content}
