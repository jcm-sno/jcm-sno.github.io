import assert from "node:assert/strict";
import { access, readFile, readdir } from "node:fs/promises";
import path from "node:path";

// Keep the GitHub Pages artifact aligned with the guest-facing routes.

const exportRoot = path.resolve(process.argv[2] ?? "dist/client");

async function walk(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const target = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(target)));
    if (entry.isFile()) files.push(target);
  }

  return files;
}

function localTarget(sourceFile, reference) {
  if (
    !reference ||
    reference.startsWith("#") ||
    reference.startsWith("//") ||
    /^[a-z][a-z\d+.-]*:/i.test(reference)
  ) {
    return null;
  }

  const cleanReference = decodeURIComponent(reference.split(/[?#]/, 1)[0]);
  let target = cleanReference.startsWith("/")
    ? path.join(exportRoot, cleanReference.slice(1))
    : path.resolve(path.dirname(sourceFile), cleanReference);

  if (cleanReference.endsWith("/")) target = path.join(target, "index.html");
  if (!path.extname(target)) target = path.join(target, "index.html");

  const relative = path.relative(exportRoot, target);
  assert(!relative.startsWith(".."), `${reference} escapes the export root`);
  return target;
}

const files = await walk(exportRoot);
const htmlFiles = files.filter((file) => file.endsWith(".html"));
const styleFiles = files.filter((file) => file.endsWith(".css"));

assert(htmlFiles.length >= 5, "Expected the home, logistics, registry, RSVP, and 404 pages");
await access(path.join(exportRoot, ".nojekyll"));

for (const file of htmlFiles) {
  const contents = await readFile(file, "utf8");
  for (const match of contents.matchAll(/\b(?:href|src)=["']([^"']+)["']/gi)) {
    const target = localTarget(file, match[1]);
    if (target) await access(target);
  }
}

for (const file of styleFiles) {
  const contents = await readFile(file, "utf8");
  for (const match of contents.matchAll(/url\((?:["']?)([^)'\"]+)(?:["']?)\)/gi)) {
    const target = localTarget(file, match[1]);
    if (target) await access(target);
  }
}

const home = await readFile(path.join(exportRoot, "index.html"), "utf8");
const logistics = await readFile(
  path.join(exportRoot, "logistics/index.html"),
  "utf8",
);
const rsvp = await readFile(path.join(exportRoot, "rsvp/index.html"), "utf8");
const registry = await readFile(
  path.join(exportRoot, "registry/index.html"),
  "utf8",
);

assert.match(home, /coffee shop stalker/i);
assert.match(home, /href=["']\/rsvp\//i);
assert.match(home, /href=["']\/registry\//i);
assert.match(logistics, /Approximate nightly total after tax/i);
assert.doesNotMatch(logistics, /estimated tax/i);
assert.match(rsvp, /Online RSVPs will open with invitations\./i);
assert.doesNotMatch(rsvp, /Find Your Invitation/i);
assert.doesNotMatch(rsvp, /What to expect/i);
assert.doesNotMatch(rsvp, /http-equiv=["']refresh/i);
assert.match(registry, /Opens with invitations/i);
assert.match(registry, /reserve an item and mark it ordered/i);
assert.doesNotMatch(registry, /Zola/i);

console.log(`Verified ${htmlFiles.length} exported HTML pages and their local assets.`);
