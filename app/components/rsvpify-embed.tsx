const RSVPIFY_EMBED_URL = "https://weddingdraft3.rsvpify.com/embed";

export default function RsvpifyEmbed() {
  return (
    <div className="rsvpify-embed-host" aria-label="Wedding RSVP form">
      {/* RSVPify's legacy embed must execute at this exact parser location. */}
      {/* eslint-disable-next-line @next/next/no-sync-scripts */}
      <script type="text/javascript" src={RSVPIFY_EMBED_URL}></script>
    </div>
  );
}
