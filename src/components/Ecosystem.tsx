import { Headline, Reveal, ExternalLink } from "./ui";

const products = [
  ["Reach", "Patients find you, book you, and come back."],
  ["Assist", "A multi-agent copilot, live in the room during the visit."],
  ["Practice", "One workspace for the practice behind the practice."],
  ["Voice", "A voice channel that remembers every patient."],
  ["Assure", "Consent, access, and audit, underneath everything else."],
] as const;

/** Five products orbiting one connected practice (names as listed on oryndoc.com). */
function Orbit() {
  const cx = 250;
  const cy = 250;
  const R = 140;
  return (
    <svg viewBox="0 0 500 500" className="orbit" aria-hidden="true">
      <circle cx={cx} cy={cy} r={R} className="orbit__ring" />
      <circle cx={cx} cy={cy} r={R * 0.55} className="orbit__ring orbit__ring--in" />
      {products.map(([name], i) => {
        const a = (i / products.length) * Math.PI * 2 - Math.PI / 2;
        const x = cx + Math.cos(a) * R;
        const y = cy + Math.sin(a) * R;
        const lx = cx + Math.cos(a) * (R + 26);
        const ly = cy + Math.sin(a) * (R + 26);
        return (
          <g key={name} className="orbit__node" style={{ "--i": i } as React.CSSProperties}>
            <line x1={cx} y1={cy} x2={x} y2={y} />
            <circle cx={x} cy={y} r="5" />
            <text x={lx} y={ly} textAnchor={Math.cos(a) > 0.3 ? "start" : Math.cos(a) < -0.3 ? "end" : "middle"} dy="0.35em">
              {name}
            </text>
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r="7" className="orbit__core" />
    </svg>
  );
}

/** A path converging from scattered first inputs into one line of care. */
function Convergence() {
  const starts = [40, 95, 150, 205, 260, 315, 370, 425];
  return (
    <svg viewBox="0 0 500 460" className="converge" aria-hidden="true" preserveAspectRatio="none">
      {starts.map((y, i) => (
        <path
          key={y}
          d={`M500 ${y} C 460 ${y}, 440 236, 398 236`}
          pathLength={1}
          style={{ "--i": i } as React.CSSProperties}
        />
      ))}
      <circle cx="398" cy="236" r="5" />
    </svg>
  );
}

export function Ecosystem() {
  return (
    <section className="ecosystem" id="ecosystem" aria-labelledby="eco-title">
      <div className="wrap">
        <div className="eco__head">
          <Reveal as="p" className="kicker">
            02 / Our ecosystem
          </Reveal>
          <Headline text="Two brands. One connected *ecosystem.*" id="eco-title" className="display display--md" />
        </div>
      </div>

      {/* ENERVARA */}
      <article className="brand brand--enervara" aria-labelledby="enervara-name">
        <div className="wrap brand__grid">
          <Reveal className="brand__visual brand__visual--dark">
            <div className="brand__parallax" data-speed="-0.05">
              <img
                src="/enervara.png"
                width="1358"
                height="1454"
                loading="lazy"
                decoding="async"
                alt="Enervara brand mark: a butterfly and a human profile composed of overlapping translucent shapes"
              />
              <Convergence />
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

      {/* ORYNDOC */}
      <article className="brand brand--oryndoc" aria-labelledby="oryndoc-name">
        <div className="wrap brand__grid brand__grid--flip">
          <Reveal className="brand__visual brand__visual--light">
            <div className="brand__parallax" data-speed="0.04">
              <Orbit />
              <span className="mark" aria-hidden="false">
                <img
                  src="/oryndoc.png"
                  width="721"
                  height="581"
                  loading="lazy"
                  decoding="async"
                  alt="OrynDoc brand mark: a letter O entwined with a stethoscope"
                />
              </span>
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
    </section>
  );
}
