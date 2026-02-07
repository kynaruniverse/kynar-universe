import os, json

root_dir = "."  # repo root
allowed_ext = [".ts", ".tsx", ".js", ".json", ".html", ".md"]

repo_data = {}

for subdir, dirs, files in os.walk(root_dir):
    for file in files:
        if any(file.endswith(ext) for ext in allowed_ext):
            path = os.path.join(subdir, file)
            with open(path, "r", encoding="utf-8", errors="ignore") as f:
                repo_data[path] = f.read()

with open("repo_data.json", "w", encoding="utf-8") as f:
    json.dump(repo_data, f)
