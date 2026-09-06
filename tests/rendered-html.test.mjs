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
  assert.match(html, /So How.d You Meet\?/i);
  assert.match(html, /James and I first met in September 2024/i);
  assert.match(html, /The X-ray broke the ice/i);
  assert.match(html, /James was in grad school/i);
  assert.match(html, /Life in Cambridge Montage/i);
  assert.match(html, /donnelly-field-map\.svg/i);
  assert.match(html, /field-day-group-640\.webp/i);
  assert.match(html, /long-distance-harbor-1280\.webp/i);
  assert.match(html, /engagement-walk-1280\.webp/i);
  assert.match(html, /about-banner-1536\.webp/i);
  assert.match(html, /about-banner-2048\.webp/i);
  assert.doesNotMatch(html, /coffee shop stalker/i);
  assert.match(html, /rel=["']preload["'][^>]+as=["']image["']/i);
  assert.match(html, /decoding=["']sync["']/i);
  assert.equal(
    (html.match(/loading=["']eager["']/gi) ?? []).length,
    1,
    "Only the above-the-fold banner should load eagerly",
  );
  assert.ok(
    (html.match(/loading=["']lazy["']/gi) ?? []).length >= 10,
    "Story imagery should be deferred until it approaches the viewport",
  );
  assert.doesNotMatch(html, /Our Story, In Pieces/i);
  assert.doesNotMatch(html, /A few moments, held onto/i);
});

test("renders logistics, wishlist, and RSVP routes", async () => {
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
  assert.match(rsvpHtml, /href=["']https:\/\/weddingdraft3\.rsvpify\.com["']/i);
  assert.doesNotMatch(rsvpHtml, /Online RSVPs will open with invitations\./i);
  assert.doesNotMatch(rsvpHtml, /What to expect/i);
  assert.doesNotMatch(rsvpHtml, /http-equiv=["']refresh/i);

  const logisticsResponse = await worker.fetch(
    new Request("http://localhost/logistics", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  assert.equal(logisticsResponse.status, 200);
  const logisticsHtml = await logisticsResponse.text();
  assert.match(
    logisticsHtml,
    /https:\/\/www\.hyatt\.com\/events\/en-US\/group-booking\/DABZD\/G-OAMO/i,
  );
  assert.doesNotMatch(logisticsHtml, /Hotel block update/i);
  assert.doesNotMatch(logisticsHtml, /Booking link pending/i);
  assert.doesNotMatch(logisticsHtml, /Easy oceanfront stay/i);
  assert.doesNotMatch(logisticsHtml, /Booking available/i);
  assert.doesNotMatch(logisticsHtml, /Resort stay/i);
  assert.doesNotMatch(logisticsHtml, /Includes tax and the reduced resort fee/i);
  assert.doesNotMatch(logisticsHtml, /Includes 12\.5% lodging tax/i);
  assert.doesNotMatch(logisticsHtml, /Daytona Beach International is by far the closest/i);
  assert.doesNotMatch(logisticsHtml, /Drive times are estimates/i);
  assert.doesNotMatch(logisticsHtml, /Both options are oceanfront/i);
  assert.match(logisticsHtml, /Nearby Airports/i);
  assert.match(logisticsHtml, /Nearest major airport/i);
  assert.match(logisticsHtml, /Lodging Information/i);
  assert.doesNotMatch(logisticsHtml, /Choose Your Arrival/i);
  assert.doesNotMatch(logisticsHtml, /Best major-airport fallback/i);
  assert.doesNotMatch(logisticsHtml, /Hotel Details/i);
  assert.doesNotMatch(logisticsHtml, /Book the wedding block/i);
  assert.match(
    logisticsHtml,
    /class=["']hotel-booking-link["'][^>]+href=["'][^"']*SAMJAMES27[^"']*["'][^>]*>\s*Booking link/i,
  );
  assert.match(
    logisticsHtml,
    /class=["']hotel-booking-link["'][^>]+href=["']https:\/\/www\.hyatt\.com\/events\/en-US\/group-booking\/DABZD\/G-OAMO["'][^>]*>\s*Booking link/i,
  );
  assert.match(
    logisticsHtml,
    /Discounted parking is available for an additional \$10 per night/i,
  );
  assert.doesNotMatch(logisticsHtml, /Parking: \$10 per night/i);
  assert.doesNotMatch(logisticsHtml, /Parking: \$10 per night \+ applicable tax/i);
  assert.doesNotMatch(logisticsHtml, /\$10 overnight self-parking \+ applicable tax/i);
  assert.doesNotMatch(logisticsHtml, /Wedding-block exceptions/i);
  assert.doesNotMatch(logisticsHtml, /\$10 overnight self-parking, excluded from the total/i);
  assert.doesNotMatch(
    logisticsHtml,
    /Parking: Complimentary self-parking · one vehicle per guest room/i,
  );
  assert.doesNotMatch(logisticsHtml, /Pricing confirmed/i);
  assert.match(logisticsHtml, /<li>Complimentary self-parking<\/li>/i);
  assert.match(logisticsHtml, /href=["']https:\/\/www\.flydaytonafirst\.com\/["']/i);
  assert.match(logisticsHtml, /href=["']https:\/\/www\.orlandoairports\.net\/["']/i);
  assert.match(logisticsHtml, /href=["']https:\/\/flysfb\.com\/["']/i);
  assert.doesNotMatch(logisticsHtml, /Visit official airport site/i);
  assert.match(
    logisticsHtml,
    /<h3>\s*<a[^>]+href=["']https:\/\/www\.flydaytonafirst\.com\/["'][^>]*>\s*Daytona Beach International Airport\s*<\/a>\s*<\/h3>/i,
  );

  const registryResponse = await worker.fetch(
    new Request("http://localhost/registry", { headers: { accept: "text/html" } }),
    environment,
    context,
  );
  assert.equal(registryResponse.status, 200);
  const wishlistHtml = await registryResponse.text();
  assert.match(wishlistHtml, /We have no expectation of receiving a gift/i);
  assert.match(wishlistHtml, /please mark it as covered below/i);
  assert.match(wishlistHtml, /free to shop wherever you like/i);
  assert.match(wishlistHtml, /Opens with invitations/i);
  assert.doesNotMatch(wishlistHtml, /Choose something you would love to give/i);
  assert.doesNotMatch(wishlistHtml, /Zola/i);
});
