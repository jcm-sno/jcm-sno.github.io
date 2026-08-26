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
  assert.match(html, /data-wedding-palette=["']coastal-bright["']/i);
});

test("renders native registry and RSVP routes", async () => {
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
  assert.match(rsvpHtml, /Online RSVPs will open with invitations\./i);
  assert.doesNotMatch(rsvpHtml, /Find Your Invitation/i);
  assert.doesNotMatch(rsvpHtml, /What to expect/i);
  assert.doesNotMatch(rsvpHtml, /http-equiv=["']refresh/i);

  const registryResponse = await worker.fetch(
    new Request("http://localhost/registry", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  assert.equal(registryResponse.status, 200);
  assert.match(await registryResponse.text(), /Registry Connection Prepared/i);
});
