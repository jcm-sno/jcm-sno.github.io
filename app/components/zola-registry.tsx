import Script from "next/script";

function registryDetails() {
  const configuredUrl = process.env.NEXT_PUBLIC_ZOLA_REGISTRY_URL?.trim();
  if (!configuredUrl) return null;

  try {
    const url = new URL(configuredUrl);
    const match = url.pathname.match(/^\/registry\/([^/]+)\/?$/i);
    if (!/(^|\.)zola\.com$/i.test(url.hostname) || !match) return null;
    return { url: url.toString(), key: match[1] };
  } catch {
    return null;
  }
}

export default function ZolaRegistry() {
  const registry = registryDetails();

  if (!registry) {
    return (
      <section className="registry-connection" aria-labelledby="registry-connection-title">
        <p className="section-number">Zola registry</p>
        <h2 id="registry-connection-title">Registry Connection Prepared</h2>
        <p>
          Our registry is still being assembled. Once it is published, it will
          appear right here through Zola&apos;s supported registry connection.
        </p>
        <span className="status-pill">Registry coming soon</span>
      </section>
    );
  }

  return (
    <section className="registry-connection registry-connection-live" aria-label="James and Samantha's Zola registry">
      <a
        className="zola-registry-embed"
        href={registry.url}
        data-registry-key={registry.key}
      >
        Our Zola Wedding Registry
      </a>
      <Script src="https://widget.zola.com/js/widget.js" strategy="afterInteractive" />
      <noscript>
        <p>
          JavaScript is disabled. You can still <a href={registry.url}>visit our registry on Zola</a>.
        </p>
      </noscript>
    </section>
  );
}
