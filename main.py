from fastapi import FastAPI, UploadFile, File
from fastapi.responses import JSONResponse
import json, math, os, requests

DATA_FILE = "repo_data.json"
API_KEY = os.getenv("OPENAI_KEY")  # your OpenAI key
API_URL = "https://api.openai.com/v1"

app = FastAPI()

# ---- Utilities ----
def cosine_similarity(a, b):
    dot = sum(x*y for x,y in zip(a,b))
    norm_a = math.sqrt(sum(x*x for x in a))
    norm_b = math.sqrt(sum(y*y for y in b))
    return dot / (norm_a * norm_b) if norm_a and norm_b else 0

def openai_embedding(text):
    resp = requests.post(f"{API_URL}/embeddings",
                         headers={"Authorization": f"Bearer {API_KEY}"},
                         json={"model":"text-embedding-3-small","input": text})
    return resp.json()["data"][0]["embedding"]

def openai_chat(prompt):
    resp = requests.post(f"{API_URL}/chat/completions",
                         headers={"Authorization": f"Bearer {API_KEY}"},
                         json={"model":"gpt-4o-mini","messages":[{"role":"user","content": prompt}]})
    return resp.json()["choices"][0]["message"]["content"]

# ---- Load repo_data ----
if os.path.exists(DATA_FILE):
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        repo_data = json.load(f)
else:
    repo_data = {}

# ---- Query endpoint ----
@app.post("/ask")
async def ask(query: dict):
    user_q = query.get("query")
    if not user_q:
        return JSONResponse({"status":"error","message":"No query provided"}, status_code=400)

    # Compute embeddings for repo files
    for fname, data in repo_data.items():
        if data["embedding"] is None:
            data["embedding"] = openai_embedding(data["text"])

    # Save embeddings
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(repo_data, f, indent=2)

    # Find top 3 files
    q_emb = openai_embedding(user_q)
    scores = [(cosine_similarity(q_emb, data["embedding"]), fname) for fname, data in repo_data.items()]
    scores.sort(reverse=True)
    top_files = [repo_data[f]["text"] for _, f in scores[:3]]

    # Build prompt
    prompt_text = "Answer based on these files:\n"
    for i, t in enumerate(top_files):
        prompt_text += f"\n[File {i+1}]:\n{t}\n"
    prompt_text += f"\nQuestion: {user_q}"

    answer = openai_chat(prompt_text)
    return JSONResponse({"status":"success","answer":answer})