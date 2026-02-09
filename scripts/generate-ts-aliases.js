import fs from "fs";
import path from "path";

const ROOT = path.resolve(process.cwd());
const TSCONFIG_PATH = path.join(ROOT, "tsconfig.json");

// Read tsconfig.json
const tsconfig = JSON.parse(fs.readFileSync(TSCONFIG_PATH, "utf-8"));

// Get all top-level folders (ignore files and node_modules, .next, dist, out)
const topFolders = fs.readdirSync(ROOT, { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name)
  .filter(name => !["node_modules", ".next", "dist", "out"].includes(name));

// Build paths object
const paths = {
  "@/*": ["./*"], // catch-all
};

topFolders.forEach(folder => {
  paths[`@/${folder}/*`] = [`${folder}/*`];
});

// Optional: add specific files
paths["@types"] = ["lib/supabase/types.ts"];

// Inject paths into tsconfig
tsconfig.compilerOptions = tsconfig.compilerOptions || {};
tsconfig.compilerOptions.paths = paths;

// Write back
fs.writeFileSync(TSCONFIG_PATH, JSON.stringify(tsconfig, null, 2));
console.log("✅ tsconfig.json paths updated:", Object.keys(paths));