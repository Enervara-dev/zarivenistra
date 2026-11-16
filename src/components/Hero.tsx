import { Headline, Reveal } from "./ui";

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__art" data-speed="-0.06">
        <picture>
          <source srcSet="/hero.webp" type="image/webp" />
          <img
            className="hero__img"
            src="/hero.png"
            width="1672"
            height="941"
            fetchPriority="high"
            decoding="async"
            alt="A translucent glass DNA helix flowing into a luminous neuron, surrounded by cells"
          />
        </picture>
      </div>
      <div className="hero__inner wrap">
        <p className="eyebrow">
          <span className="eyebrow__line" /> Zarivenistra · Healthcare technology group
        </p>
        <Headline as="h1" text="Advancing the future of *connected* healthcare." id="hero-title" className="hero__title" />
        <Reveal delay={500} className="hero__lede">
          <p>We bring healthcare, science and technology together to build a more connected future of care.</p>
        </Reveal>
      </div>
      <div className="hero__foot wrap">
        <a className="scroll-cue" href="#about">
          <span className="scroll-cue__bar" aria-hidden="true" />
          Scroll
        </a>
        <p className="hero__brands">
          Enervara <span aria-hidden="true">·</span> OrynDoc
        </p>
      </div>
    </section>
  );
}
