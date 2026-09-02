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
  for (const match of contents.matchAll(/\bsrcset=["']([^"']+)["']/gi)) {
    for (const candidate of match[1].split(",")) {
      const reference = candidate.trim().split(/\s+/, 1)[0];
      const target = localTarget(file, reference);
      if (target) await access(target);
    }
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
const donnellyMap = await readFile(
  path.join(exportRoot, "donnelly-field-map.svg"),
  "utf8",
);
assert.match(home, /coffee shop stalker/i);
assert.match(home, /href=["']\/rsvp\//i);
assert.match(home, /href=["']\/registry\//i);
assert.match(home, />Archive</i);
assert.match(home, /So How.d You Guys Meet\?/i);
assert.match(home, /James was in grad school/i);
assert.match(home, /Life in Cambridge Montage/i);
assert.match(home, /donnelly-field-map\.svg/i);
assert.match(home, /field-day-group-640\.webp/i);
assert.match(home, /long-distance-harbor-1280\.webp/i);
assert.match(home, /engagement-walk-1280\.webp/i);
assert.match(home, /about-banner\.webp/i);
assert.match(home, /data-wedding-palette=["']atlantic-garden["']/i);
assert.doesNotMatch(home, /Color Study/i);
assert.doesNotMatch(home, /Our Story, In Pieces/i);
assert.doesNotMatch(home, /A few moments, held onto/i);
assert.doesNotMatch(home, /A little bit of our story/i);
assert.doesNotMatch(home, /Welcome to our corner of the wedding weekend/i);
assert.match(logistics, /Approximate nightly total after tax/i);
assert.match(
  logistics,
  /href=["']https:\/\/www\.hyatt\.com\/events\/en-US\/group-booking\/DABZD\/G-OAMO["']/i,
);
assert.doesNotMatch(logistics, /Hotel block update/i);
assert.doesNotMatch(logistics, /Booking link pending/i);
assert.doesNotMatch(logistics, /Come meet us by the ocean/i);
assert.doesNotMatch(logistics, /Everything we know so far about the schedule/i);
assert.doesNotMatch(logistics, /estimated tax/i);
assert.doesNotMatch(rsvp, /Find your invitation below\./i);
assert.doesNotMatch(rsvp, /Enter the name on your invitation/i);
assert.match(rsvp, /class=["']rsvpify-embed-host["']/i);
assert.match(
  rsvp,
  /<script[^>]+src=["']https:\/\/weddingdraft3\.rsvpify\.com\/embed["'][^>]*><\/script>/i,
  "Expected the RSVP page HTML to contain RSVPify's exact parser-loaded embed script",
);
assert.doesNotMatch(
  rsvp,
  /https:\/\/jcm-sno\.rsvpify\.com\/embed/i,
  "The RSVP page still references the retired RSVPify event",
);
assert.match(
  rsvp,
  /href=["']https:\/\/weddingdraft3\.rsvpify\.com["']/i,
);
assert.doesNotMatch(rsvp, /Online RSVPs will open with invitations\./i);
assert.doesNotMatch(rsvp, /What to expect/i);
assert.doesNotMatch(rsvp, /http-equiv=["']refresh/i);
assert.match(registry, /We have no expectation of receiving a gift/i);
assert.match(registry, /please mark it as covered below/i);
assert.match(registry, /free to shop wherever you like/i);
assert.match(registry, /Opens with invitations/i);
assert.doesNotMatch(registry, /Choose something you would love to give/i);
assert.doesNotMatch(registry, /Zola/i);
assert.match(donnellyMap, /^<\?xml[^>]*>\s*<svg\b/i);
assert.doesNotMatch(donnellyMap, /truncated|tokens|…/i);

console.log(`Verified ${htmlFiles.length} exported HTML pages and their local assets.`);
