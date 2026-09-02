const RSVPIFY_FORM_URL = "https://jcm-sno.rsvpify.com/rsvp?embed=1";
const RSVPIFY_EMBED_SCRIPT_URL = "https://jcm-sno.rsvpify.com/embed.js";

export default function RsvpifyEmbed() {
  return (
    <>
      <iframe
        src={RSVPIFY_FORM_URL}
        data-rsvpify-embed=""
        title="James and Samantha wedding RSVP form"
        className="rsvpify-embed-host"
        style={{
          display: "block",
          width: "100%",
          height: "700px",
          border: 0,
        }}
        scrolling="no"
      />
      <script src={RSVPIFY_EMBED_SCRIPT_URL} async />
    </>
  );
}
