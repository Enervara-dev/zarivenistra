import { Headline, Reveal } from "./ui";

export function Vision() {
  return (
    <section className="vision" id="about" aria-labelledby="vision-title">
      <div className="wrap vision__grid">
        <div className="vision__head">
          <Reveal as="p" className="kicker">
            01 / Why we exist
          </Reveal>
          <Headline text="Healthcare deserves a more *connected* future." id="vision-title" className="display" />
        </div>

        <div className="vision__figure">
          <div className="vision__parallax" data-speed="-0.06">
            <picture>
              <source srcSet="/image.webp" type="image/webp" />
              <img
                className="vision__img"
                src="/image.png"
                width="1672"
                height="941"
                loading="lazy"
                decoding="async"
                alt="Translucent living cells held in a luminous web of connected tissue"
              />
            </picture>
          </div>
        </div>

        <div className="vision__copy">
          <Reveal as="p" className="lead">
            Care is rarely a single moment. It is a path, from the first symptom to the follow-up long after, and too often that path is broken into disconnected pieces.
          </Reveal>
          <Reveal as="p" delay={120} className="body">
            Zarivenistra exists to join those pieces. We combine scientific thinking with considered technology, so that patients and the people who care for them move through one connected experience.
          </Reveal>
        </div>
      </div>
    </section>
  );
}
