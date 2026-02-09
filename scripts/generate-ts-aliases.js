import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const TSCONFIG_PATH = path.join(ROOT, "tsconfig.json");

// Read tsconfig.json safely
let tsconfig;
try {
  const tsconfigRaw = fs.readFileSync(TSCONFIG_PATH, "utf-8");
  tsconfig = JSON.parse(tsconfigRaw);
} catch (err) {
  console.error("❌ Failed to read or parse tsconfig.json:", err);
  process.exit(1);
}

// Get all top-level folders (ignore files and ignored directories)
const ignoredFolders = ["node_modules", ".next", "dist", "out"];
const topFolders = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory() && !ignoredFolders.includes(dirent.name))
  .map(dirent => dirent.name);

// Build paths object
const paths = {
  "@/*": ["./*"] // catch-all
};

// Map top-level folders
topFolders.forEach(folder => {
  paths[`@/${folder}/*`] = [`${folder}/*`];
});

// Add specific types file
paths["@types"] = ["lib/supabase/types.ts"];

// Inject paths into tsconfig
tsconfig.compilerOptions = tsconfig.compilerOptions || {};
tsconfig.compilerOptions.paths = paths;

// Write back safely
try {
  fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2) + "\n", "utf-8");
  console.log("✅ tsconfig.json paths updated:", Object.keys(paths));
} catch (err) {
  console.error("❌ Failed to write tsconfig.json:", err);
  process.exit(1);
}