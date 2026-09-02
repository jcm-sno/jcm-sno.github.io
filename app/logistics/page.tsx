import type { Metadata } from "next";
import FastAnchorNav from "../components/fast-anchor-nav";
import SiteHeader from "../components/site-header";

export const metadata: Metadata = {
  title: "Logistics | James & Samantha",
  description:
    "Schedule, airport, and lodging information for James and Samantha’s wedding weekend in Port Orange, Florida.",
};

const airports = [
  {
    code: "DAB",
    name: "Daytona Beach International Airport",
    time: "About 15–25 minutes",
    note: "The closest and simplest option for our Daytona Beach Shores hotels.",
    label: "Closest airport",
    href: "https://www.flydaytonafirst.com/",
  },
  {
    code: "MCO",
    name: "Orlando International Airport",
    time: "About 1 hour 20 minutes–1 hour 45 minutes",
    note: "Usually the broadest selection of airlines and nonstop routes, making it the best major-airport fallback despite the longer drive.",
    label: "Best major-airport fallback",
    href: "https://www.orlandoairports.net/",
  },
  {
    code: "SFB",
    name: "Orlando Sanford International Airport",
    time: "About 50–65 minutes",
    note: "Best only when a nonstop itinerary happens to match your city and dates; compare the full fare and schedule before choosing it.",
    label: "Limited-route alternative",
    href: "https://flysfb.com/",
  },
];

const shoresBookingUrl =
  "https://be.synxis.com/?Hotel=17713&Chain=21123&config=initialConfig&arrive=2027-05-14&depart=2027-05-16&adult=1&child=0&group=SAMJAMES27";

export default function LogisticsPage() {
  return (
    <main className="site-shell">
      <article className="album-page logistics-page">
        <SiteHeader active="logistics" />

        <section className="logistics-hero" aria-labelledby="logistics-title">
          <p className="eyebrow">The wedding weekend</p>
          <h1 id="logistics-title">Logistics</h1>
          <FastAnchorNav />
        </section>

        <section id="schedule" className="logistics-section schedule-section" aria-labelledby="schedule-title">
          <div className="logistics-section-heading">
            <p className="section-number">01 · Schedule</p>
            <h2 id="schedule-title">Save the Weekend</h2>
          </div>
          <article className="schedule-card">
            <div className="date-card" aria-label="May 15, 2027">
              <span>May</span>
              <strong>15</strong>
              <span>2027</span>
            </div>
            <div>
              <p className="detail-label">Saturday · Port Orange, Florida</p>
              <h3>Wedding Day</h3>
              <p>
                Ceremony, reception, and surrounding weekend-event times will
                be added as soon as they are finalized.
              </p>
              <span className="status-pill">Full schedule pending</span>
            </div>
          </article>
          <aside className="transport-note schedule-transport" aria-labelledby="transport-title">
            <p className="section-number">Wedding-day transportation</p>
            <h3 id="transport-title">Leave the driving to us.</h3>
            <p>
              Transportation to and from the wedding is planned from both
              hotels. Pickup locations and timing will be posted with the full
              schedule once they are confirmed.
            </p>
          </aside>
        </section>

        <section id="travel" className="logistics-section travel-section" aria-labelledby="travel-title">
          <div className="logistics-section-heading centered-heading">
            <p className="section-number">02 · Getting here</p>
            <h2 id="travel-title">Choose Your Arrival</h2>
            <p>
              Daytona Beach International is by far the closest. Orlando
              International is the strongest fallback for schedule and route
              choice; Sanford is worth checking only when a specific itinerary
              lines up well.
            </p>
          </div>
          <div className="airport-grid">
            {airports.map((airport) => (
              <article className="airport-card" key={airport.code}>
                <p className="detail-label">{airport.label}</p>
                <p className="airport-code" aria-hidden="true">
                  {airport.code}
                </p>
                <h3>{airport.name}</h3>
                <p className="drive-time">{airport.time}</p>
                <p>{airport.note}</p>
                <a href={airport.href} target="_blank" rel="noreferrer">
                  Visit official airport site <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="travel-caveat">
            Drive times are estimates to the Daytona Beach Shores hotel area
            under ordinary conditions. Please check live traffic before you
            leave, especially around Orlando and Interstate 4.
          </p>
        </section>

        <section id="lodging" className="logistics-section lodging-section" aria-labelledby="lodging-title">
          <div className="logistics-section-heading lodging-heading">
            <div>
              <p className="section-number">03 · Where to stay</p>
              <h2 id="lodging-title">Hotel Details</h2>
            </div>
            <p>
              Both options are oceanfront in Daytona Beach Shores, with pools
              and direct beach access.
            </p>
          </div>

          <div className="pending-notice" role="note">
            <p className="detail-label">Hotel block update</p>
            <h3>The Shores booking link is live.</h3>
            <p>
              The Shores pricing below reflects the current written wedding-block
              offer, and the official room-block booking link is now available.
              The Hyatt booking link and any final reservation deadlines are
              still pending.
            </p>
          </div>

          <div className="hotel-grid">
            <article className="hotel-card shores-card">
              <div className="hotel-card-topline">
                <p className="detail-label">Resort stay</p>
                <span>Pricing confirmed</span>
              </div>
              <h3>The Shores Resort &amp; Spa</h3>
              <address>
                2637 South Atlantic Avenue
                <br />
                Daytona Beach Shores, FL 32118
              </address>
              <div className="rate-block" aria-label="Approximate Shores nightly total per room after tax and before parking">
                <span>Approximate nightly total after tax</span>
                <strong>$224</strong>
                <span>Includes tax and the reduced resort fee</span>
                <p className="parking-rate">Parking: $10 per night + applicable tax</p>
              </div>
              <div className="hotel-details">
                <div>
                  <h4>Current resort amenities</h4>
                  <ul>
                    <li>Oceanfront pool and direct beach access</li>
                    <li>Morning beach yoga</li>
                    <li>Shores s&apos;mores kit</li>
                    <li>Welcome drink</li>
                    <li>Complimentary cruiser bikes</li>
                  </ul>
                </div>
                <div>
                  <h4>Wedding-block exceptions</h4>
                  <ul>
                    <li>Reduced $10 resort fee included in the total</li>
                    <li>$10 overnight self-parking + applicable tax, excluded from the total</li>
                    <li>Total uses the current 12.5% lodging-tax rate</li>
                    <li>Official room-block booking link is live</li>
                  </ul>
                </div>
              </div>
              <div className="hotel-actions">
                <a href={shoresBookingUrl} target="_blank" rel="noreferrer">
                  Book the wedding block <span aria-hidden="true">↗</span>
                </a>
                <a href="https://www.shoresresort.com/" target="_blank" rel="noreferrer">
                  Explore the hotel <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>

            <article className="hotel-card hyatt-card">
              <div className="hotel-card-topline">
                <p className="detail-label">Easy oceanfront stay</p>
                <span>Block pending</span>
              </div>
              <h3>Hyatt Place Daytona Beach – Oceanfront</h3>
              <address>
                3161 South Atlantic Avenue
                <br />
                Daytona Beach Shores, FL 32118
              </address>
              <div className="split-rates" aria-label="Approximate Hyatt Place nightly totals per room after tax">
                <span className="split-rates-heading">Approximate nightly total after tax</span>
                <div>
                  <span>King room</span>
                  <strong>$156</strong>
                </div>
                <div>
                  <span>Queen room</span>
                  <strong>$168</strong>
                </div>
                <p>Includes 12.5% lodging tax</p>
              </div>
              <div className="hotel-details single-list">
                <div>
                  <h4>Current hotel amenities</h4>
                  <ul>
                    <li>Complimentary breakfast</li>
                    <li>Complimentary self-parking</li>
                    <li>Oceanfront pool</li>
                    <li>Direct beach access</li>
                    <li>Free internet access</li>
                  </ul>
                </div>
              </div>
              <div className="hotel-actions">
                <span className="pending-link" aria-label="Hyatt Place room-block booking link is pending">
                  Booking link pending
                </span>
                <a
                  href="https://www.hyatt.com/hyatt-place/en-US/dabzd-hyatt-place-daytona-beach-oceanfront"
                  target="_blank"
                  rel="noreferrer"
                >
                  Explore the hotel <span aria-hidden="true">↗</span>
                </a>
              </div>
            </article>
          </div>

        </section>
      </article>
    </main>
  );
}
