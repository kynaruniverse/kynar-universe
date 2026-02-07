import os
import json

OUTPUT_FILE = "repo_data.json"
INCLUDE_EXT = (".ts", ".tsx", ".js", ".json", ".html", ".css")

repo_data = {}

for root, dirs, files in os.walk("."):
    # Skip hidden folders like .git
    if ".git" in root:
        continue
    for f in files:
        if f.endswith(INCLUDE_EXT):
            path = os.path.join(root, f)
            try:
                with open(path, "r", encoding="utf-8") as file:
                    repo_data[path] = {"text": file.read(), "embedding": None}
            except:
                pass

# Save JSON
with open(OUTPUT_FILE, "w", encoding="utf-8") as out:
    json.dump(repo_data, out, ensure_ascii=False, indent=2)

print(f"{len(repo_data)} files exported to {OUTPUT_FILE}")