/* eslint-disable @next/next/no-img-element */
import SiteHeader from "./components/site-header";

const responsiveWidths = [640, 960] as const;

function responsivePhotoSrcSet(
  src: string,
  originalWidth: number,
  candidateWidths: readonly number[] = responsiveWidths,
) {
  const stem = src.replace(/\.webp$/, "");
  return [
    ...candidateWidths
      .filter((width) => width < originalWidth)
      .map((width) => `${stem}-${width}.webp ${width}w`),
    `${src} ${originalWidth}w`,
  ].join(", ");
}

const longDistancePhotos = [
  {
    className: "long-distance-street",
    src: "/long-distance-scotland.webp",
    alt: "James eats fish and chips on a colorful, rain-soaked street in Scotland",
    width: 1536,
    height: 1152,
    candidateWidths: [640, 960, 1280],
    sizes:
      "(min-width: 1440px) 520px, (min-width: 1024px) 36vw, (min-width: 768px) calc(100vw - 108px), calc(100vw - 40px)",
    loadEarly: false,
  },
  {
    className: "long-distance-seafood",
    src: "/long-distance-seafood.webp",
    alt: "Samantha smiles behind a large seafood platter during an adventure together",
    width: 1152,
    height: 1536,
    candidateWidths: [640, 960],
    sizes:
      "(min-width: 1440px) 420px, (min-width: 1024px) 28vw, (min-width: 768px) calc((100vw - 136px) / 2), calc(100vw - 40px)",
    loadEarly: false,
  },
  {
    className: "long-distance-harbor",
    src: "/long-distance-harbor.webp",
    alt: "James and Samantha smile together beside a harbor in Scotland",
    width: 1536,
    height: 1152,
    candidateWidths: [640, 960, 1280],
    sizes:
      "(min-width: 1440px) 520px, (min-width: 1024px) 36vw, (min-width: 768px) calc((100vw - 136px) / 2), calc(100vw - 40px)",
    loadEarly: true,
  },
];

const engagementPhotos = [
  {
    className: "engagement-walk",
    src: "/engagement-walk.webp",
    alt: "James and Samantha hold hands while walking across rocks at the beach",
    width: 1536,
    height: 1023,
    candidateWidths: [640, 960, 1280],
    sizes:
      "(min-width: 1440px) 620px, (min-width: 1024px) 43vw, (min-width: 768px) calc(100vw - 108px), calc(100vw - 40px)",
  },
  {
    className: "engagement-proposal",
    src: "/engagement-proposal.webp",
    alt: "James kneels to propose to Samantha on the beach",
    width: 1024,
    height: 1536,
    candidateWidths: [640, 960],
    sizes:
      "(min-width: 1440px) 420px, (min-width: 1024px) 28vw, (min-width: 768px) calc((100vw - 136px) / 2), calc(100vw - 40px)",
  },
  {
    className: "engagement-reaction",
    src: "/engagement-reaction.webp",
    alt: "James and Samantha laugh together immediately after the proposal",
    width: 1024,
    height: 1536,
    candidateWidths: [640, 960],
    sizes:
      "(min-width: 1440px) 520px, (min-width: 1024px) 36vw, (min-width: 768px) calc((100vw - 136px) / 2), calc(100vw - 40px)",
  },
];

export default function Home() {
  return (
    <main className="site-shell">
      <article className="album-page">
        <SiteHeader active="about" />

        <section className="hero-banner" aria-labelledby="hero-title">
          <img
            className="hero-photo"
            src="/about-banner-2048.webp"
            alt="James and Samantha embracing as they look out at the ocean"
            width="2048"
            height="1365"
            srcSet="/about-banner-960.webp 960w, /about-banner-1536.webp 1536w, /about-banner-2048.webp 2048w"
            sizes="(min-width: 1440px) 1320px, 100vw"
            loading="eager"
            decoding="sync"
            fetchPriority="high"
          />
          <div className="hero-copy">
            <p className="eyebrow">May 15, 2027 · Port Orange, Florida</p>
            <h1
              id="hero-title"
              aria-label="James Morrison and Samantha Oates"
            >
              <span className="hero-full-name hero-name-james" aria-hidden="true">
                <span>James</span>
                <span>Morrison</span>
              </span>
              <span className="hero-amp" aria-hidden="true">&amp;</span>
              <span className="hero-full-name hero-name-samantha" aria-hidden="true">
                <span>Samantha</span>
                <span>Oates</span>
              </span>
            </h1>
          </div>
        </section>

        <section id="our-story" className="scrapbook-section" aria-labelledby="story-heading">
          <div className="scrapbook-heading">
            <h2 id="story-heading">Archive</h2>
          </div>

          <div
            className="field-day-cluster"
            role="group"
            aria-labelledby="field-day-heading"
          >
            <article className="story-card field-day-story">
              <div className="story-heading-fields">
                <p className="clip-kicker">Same neighborhood · first Field Day</p>
                <h3 id="field-day-heading">So How’d You Meet?</h3>
              </div>
              <p>
                James and I first met in September 2024, when he moved into the
                apartment one floor above mine. I worked from home and was
                excited to have new neighbors; James was in grad school and
                excited to have a room with bay windows. Over the next couple of
                months, we’d stop to chat whenever we ran into each other in the
                halls, both hoping to get to know each other better.
              </p>
              <p>
                The opportunity came when James joined the semiannual field day
                my roommate and I hosted. During a game of capture the flag, he
                collided with someone and wobbled off the field. I was too busy
                playing to notice. “Probably got the wind knocked out of him,” I
                said when a friend pointed out James lying on the side of the
                field. Instead, he ended up in the emergency room with a broken
                collarbone.
              </p>
              <p>
                James had asked for my number during a previous hallway run-in
                but didn’t know how to start the conversation. The X-ray broke
                the ice. I dropped flowers at his doorstep with a note letting
                him know that his team had lost capture the flag. James maintains
                that the broken collarbone was worth it. We went on our first
                date that week, with James in a sling: a walk across the Charles
                River followed by grilled cheese and tomato soup.
              </p>
            </article>

            <figure className="cluster-photo field-day-main">
              <img
                src="/field-day-group.webp"
                alt="Friends line up for a Field Day game; Samantha in green shorts and James in red stand together at the right"
                width="1635"
                height="954"
                srcSet={responsivePhotoSrcSet("/field-day-group.webp", 1635)}
                sizes="(min-width: 1024px) 56vw, 92vw"
                loading="eager"
                decoding="async"
                fetchPriority="low"
              />
            </figure>

            <figure className="cluster-photo field-day-facing">
              <img
                src="/field-day-facing.webp"
                alt="James in a red shirt faces Samantha across a Field Day net"
                width="1090"
                height="1898"
                srcSet={responsivePhotoSrcSet("/field-day-facing.webp", 1090)}
                sizes="(min-width: 1024px) 34vw, 92vw"
                loading="eager"
                decoding="async"
                fetchPriority="low"
              />
            </figure>

            <figure className="cluster-photo field-day-action">
              <img
                src="/field-day-wheelbarrow.webp"
                alt="James holds Samantha's legs during a Field Day wheelbarrow race"
                width="1096"
                height="1543"
                srcSet={responsivePhotoSrcSet("/field-day-wheelbarrow.webp", 1096)}
                sizes="(min-width: 1024px) 34vw, 92vw"
                loading="eager"
                decoding="async"
                fetchPriority="low"
              />
            </figure>

            <figure className="field-day-map">
              <div className="field-day-map-frame">
                <img
                  src="/donnelly-field-map.svg"
                  alt="Static street map of the East Cambridge neighborhood surrounding Donnelly Field"
                  width="900"
                  height="720"
                  loading="eager"
                  decoding="async"
                  fetchPriority="low"
                />
              </div>
              <figcaption>
                <span>
                  <strong>Donnelly Field · Cambridge, MA</strong>
                  <small>Map data: City of Cambridge GIS · PDDL 1.0</small>
                </span>
              </figcaption>
            </figure>
          </div>

          <div
            className="boston-cluster"
            role="group"
            aria-labelledby="boston-heading"
          >
            <article className="story-card boston-story">
              <div className="story-heading-fields">
                <p className="clip-kicker">Boston · beginning to date</p>
                <h3 id="boston-heading">Life in Cambridge Montage</h3>
              </div>
              <p>
                Once they began dating, James and Samantha were notoriously bad
                at taking pictures—perhaps because neither of them was on social
                media. Thankfully, an employee at a little Cambridge coffee
                shop stopped long enough to take one for them. James was
                finishing graduate school and would soon return to his Air
                Force duties. Samantha was working in consulting and hoping to
                make a career change. They were excited about what came next,
                yet increasingly reluctant for their time together to end.
              </p>
            </article>

            <figure className="cluster-photo captioned-photo boston-coffee">
              <img
                src="/boston-coffee.webp"
                alt="Samantha rests her head on James at a table in a Cambridge coffee shop"
                width="628"
                height="502"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="photo-sticky-caption">
                coffee shop stalker
              </figcaption>
            </figure>

            <figure className="cluster-photo boston-kayak">
              <img
                src="/boston-kayak.webp"
                alt="Samantha and James smile together on the water with the Boston skyline behind them"
                width="1448"
                height="1086"
                srcSet={responsivePhotoSrcSet("/boston-kayak.webp", 1448)}
                sizes="(min-width: 1024px) 38vw, 92vw"
                loading="lazy"
                decoding="async"
              />
            </figure>

            <figure className="cluster-photo captioned-photo boston-night">
              <img
                src="/boston-night.webp"
                alt="Samantha and James smile together above a city skyline at night"
                width="1152"
                height="1536"
                loading="lazy"
                decoding="async"
              />
              <figcaption className="photo-sticky-caption">
                Windy Boston Skyline from the Prudential Center
              </figcaption>
            </figure>
          </div>

          <div
            className="long-distance-cluster"
            role="group"
            aria-labelledby="long-distance-heading"
          >
            <article className="story-card long-distance-story">
              <div className="story-heading-fields">
                <p className="clip-kicker">Scotland · California · long distance</p>
                <h3 id="long-distance-heading">Across the Distance</h3>
              </div>
              <p>
                Samantha&apos;s work took her to Scotland, while James went to
                California. Long distance made for many unforgettable adventures
                together.
              </p>
            </article>

            {longDistancePhotos.map((photo) => (
              <figure
                className={`cluster-photo ${photo.className}`}
                key={photo.src}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  srcSet={responsivePhotoSrcSet(
                    photo.src,
                    photo.width,
                    photo.candidateWidths,
                  )}
                  sizes={photo.sizes}
                  loading={photo.loadEarly ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={photo.loadEarly ? "low" : undefined}
                />
              </figure>
            ))}
          </div>

          <div
            className="engagement-cluster"
            role="group"
            aria-labelledby="engagement-heading"
          >
            <article className="story-card engagement-story">
              <div className="story-heading-fields">
                <p className="clip-kicker">Engagement</p>
                <h3 id="engagement-heading">The Big Weekend</h3>
              </div>
              <p>
                During one of the visits that made long distance feel briefly
                ordinary, Samantha flew to Santa Barbara to spend a few days
                with James. She expected their familiar rhythm of making the
                most of limited time together and never suspected a carefully
                disguised plan. A casual suggestion to walk through a park led
                to a seemingly serendipitous turn down a few wooden steps to
                the beach. There, James asked Samantha to marry him. At dinner
                afterward, the surprises continued: many of their siblings
                were waiting to surprise Samantha and celebrate with them.
              </p>
            </article>

            {engagementPhotos.map((photo) => (
              <figure
                className={`cluster-photo ${photo.className}`}
                key={photo.src}
              >
                <img
                  src={photo.src}
                  alt={photo.alt}
                  width={photo.width}
                  height={photo.height}
                  srcSet={responsivePhotoSrcSet(
                    photo.src,
                    photo.width,
                    photo.candidateWidths,
                  )}
                  sizes={photo.sizes}
                  loading="eager"
                  decoding="async"
                  fetchPriority="low"
                />
              </figure>
            ))}
          </div>
        </section>

      </article>
    </main>
  );
}
