import assert from "node:assert/strict";
import test from "node:test";

test("renders wedding metadata and the selected default palette", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(html, /<title>James &amp; Samantha<\/title>/i);
  assert.match(html, /data-wedding-palette=["']atlantic-garden["']/i);
  assert.doesNotMatch(html, /Color Study/i);
  assert.match(html, />Archive</i);
  assert.match(html, /So How.d You Guys Meet\?/i);
  assert.match(html, /James was in grad school/i);
  assert.match(html, /Life in Cambridge Montage/i);
  assert.match(html, /donnelly-field-map\.svg/i);
  assert.match(html, /field-day-group-640\.webp/i);
  assert.doesNotMatch(html, /Our Story, In Pieces/i);
  assert.doesNotMatch(html, /A few moments, held onto/i);
});

test("renders wishlist and RSVP routes", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("routes", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const environment = {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  };
  const context = {
    waitUntil() {},
    passThroughOnException() {},
  };

  const rsvpResponse = await worker.fetch(
    new Request("http://localhost/rsvp", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  assert.equal(rsvpResponse.status, 200);
  const rsvpHtml = await rsvpResponse.text();
  assert.doesNotMatch(rsvpHtml, /Find your invitation below\./i);
  assert.doesNotMatch(rsvpHtml, /respond for your household/i);
  assert.match(rsvpHtml, /class=["']rsvpify-embed-host["']/i);
  assert.match(
    rsvpHtml,
    /<script[^>]+src=["']https:\/\/weddingdraft3\.rsvpify\.com\/embed["'][^>]*><\/script>/i,
  );
  assert.doesNotMatch(rsvpHtml, /Online RSVPs will open with invitations\./i);
  assert.doesNotMatch(rsvpHtml, /What to expect/i);
  assert.doesNotMatch(rsvpHtml, /http-equiv=["']refresh/i);

  const registryResponse = await worker.fetch(
    new Request("http://localhost/registry", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  assert.equal(registryResponse.status, 200);
  const wishlistHtml = await registryResponse.text();
  assert.match(wishlistHtml, /Opens with invitations/i);
  assert.match(wishlistHtml, /reserve an item and mark it ordered/i);
  assert.doesNotMatch(wishlistHtml, /Choose something you would love to give/i);
  assert.doesNotMatch(wishlistHtml, /Zola/i);
});
