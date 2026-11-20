import { Headline, Reveal, ExternalLink } from "./ui";

const products = [
  ["Reach", "Patients find you, book you, and come back."],
  ["Assist", "A multi-agent copilot, live in the room during the visit."],
  ["Practice", "One workspace for the practice behind the practice."],
  ["Voice", "A voice channel that remembers every patient."],
  ["Assure", "Consent, access, and audit, underneath everything else."],
] as const;

/** Five products joined in one ring around the OrynDoc mark (names as listed on oryndoc.com). */
function Orbit() {
  const cx = 250;
  const cy = 250;
  const R = 178;
  const pts = products.map((_, i) => {
    const a = (i / products.length) * Math.PI * 2 - Math.PI / 2;
    return [cx + Math.cos(a) * R, cy + Math.sin(a) * R, a] as const;
  });
  return (
    <svg viewBox="0 0 500 500" className="orbit" aria-hidden="true">
      <circle cx={cx} cy={cy} r={R} className="orbit__ring" />
      <polygon points={pts.map(([x, y]) => `${x},${y}`).join(" ")} className="orbit__link" />
      {pts.map(([x, y, a], i) => {
        const lx = cx + Math.cos(a) * (R + 22);
        const ly = cy + Math.sin(a) * (R + 22);
        return (
          <g key={products[i][0]} className="orbit__node" style={{ "--i": i } as React.CSSProperties}>
            <circle cx={x} cy={y} r="5" />
            <text x={lx} y={ly} textAnchor={Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle"} dy="0.35em">
              {products[i][0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/** The line that joins the two brands. It draws itself as the reader scrolls between them. */
function Thread() {
  const d = "M208 0 C 208 200, 792 0, 792 200";
  return (
    <div className="eco__thread" data-progress aria-hidden="true">
      <svg viewBox="0 0 1000 200" preserveAspectRatio="none">
        <defs>
          <linearGradient id="thread-g" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0" stopColor="#6c78e6" />
            <stop offset="0.5" stopColor="#2f8f8a" />
            <stop offset="1" stopColor="#f0a56c" />
          </linearGradient>
        </defs>
        <path d={d} className="thread__base" />
        <path d={d} className="thread__live" pathLength={1} />
      </svg>
      <span className="thread__node thread__node--a" />
      <span className="thread__node thread__node--b" />
      <span className="thread__tag">Zarivenistra</span>
    </div>
  );
}

export function Ecosystem() {
  return (
    <section className="ecosystem" id="ecosystem" aria-labelledby="eco-title">
      <div className="eco__glow eco__glow--a" aria-hidden="true" />
      <div className="eco__glow eco__glow--b" aria-hidden="true" />

      <div className="wrap">
        <div className="eco__head">
          <div>
            <Reveal as="p" className="kicker">
              02 / Our ecosystem
            </Reveal>
            <Headline text="Two brands. One connected *ecosystem.*" id="eco-title" className="display display--md" />
          </div>
          <Reveal as="p" delay={200} className="body eco__lead">
            Each brand stands on its own. Together they follow one direction: care that connects.
          </Reveal>
        </div>

        {/* ENERVARA */}
        <article className="brand" aria-labelledby="enervara-name">
          <div className="brand__grid">
            <Reveal className="lens lens--enervara">
              <span className="lens__ring" />
              <span className="lens__ring lens__ring--dash" />
              <div className="lens__float" data-speed="-0.04">
                <picture>
                  <source srcSet="/enervara.webp" type="image/webp" />
                  <img
                    className="lens__img"
                    src="/enervara.png"
                    width="1293"
                    height="1216"
                    loading="lazy"
                    decoding="async"
                    alt="Enervara brand mark: a luminous butterfly and a human profile formed from translucent, overlapping shapes"
                  />
                </picture>
              </div>
            </Reveal>
            <div className="brand__text">
              <Reveal as="p" className="brand__index">
                Brand 01
              </Reveal>
              <Headline as="h3" text="Enervara" id="enervara-name" className="brand__name" />
              <Reveal as="p" delay={100} className="brand__tag">
                From symptoms to care, <em>seamlessly.</em>
              </Reveal>
              <Reveal as="p" delay={180} className="body">
                Enervara guides people from first input to the right care. Clinically informed AI assessment, with doctor support when needed.
              </Reveal>
              <Reveal delay={260}>
                <ExternalLink href="https://enervara.com">Visit enervara.com</ExternalLink>
              </Reveal>
            </div>
          </div>
        </article>

        <Thread />

        {/* ORYNDOC */}
        <article className="brand" aria-labelledby="oryndoc-name">
          <div className="brand__grid brand__grid--flip">
            <Reveal className="lens lens--oryndoc">
              <div className="lens__float" data-speed="0.04">
                <Orbit />
                <picture>
                  <source srcSet="/oryndoc.webp" type="image/webp" />
                  <img
                    className="lens__img lens__img--wide"
                    src="/oryndoc.png"
                    width="1671"
                    height="941"
                    loading="lazy"
                    decoding="async"
                    alt="OrynDoc brand mark: a luminous glass letter O entwined with a stethoscope"
                  />
                </picture>
              </div>
            </Reveal>
            <div className="brand__text">
              <Reveal as="p" className="brand__index">
                Brand 02
              </Reveal>
              <Headline as="h3" text="OrynDoc" id="oryndoc-name" className="brand__name" />
              <Reveal as="p" delay={100} className="brand__tag">
                Better connected care starts with a better <em>connected practice.</em>
              </Reveal>
              <Reveal as="p" delay={180} className="body">
                The connected operating system for modern medical practices. It brings patient discovery, booking, consultations, operations and follow-up into a single, dependable system of record.
              </Reveal>
              <Reveal as="ul" delay={240} className="products">
                {products.map(([name, line]) => (
                  <li key={name}>
                    <strong>{name}</strong>
                    <span>{line}</span>
                  </li>
                ))}
              </Reveal>
              <Reveal delay={300}>
                <ExternalLink href="https://oryndoc.com">Visit oryndoc.com</ExternalLink>
              </Reveal>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
