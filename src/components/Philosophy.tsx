import { Headline, Reveal } from "./ui";

/** Four bespoke glyphs, one per theme. Drawn as thin strokes so they animate with CSS. */
const glyphs = [
  // Human-centred: nested arcs, a person at the centre of care
  <svg key="h" viewBox="0 0 120 120" aria-hidden="true">
    <circle cx="60" cy="60" r="8" />
    <circle cx="60" cy="60" r="26" />
    <circle cx="60" cy="60" r="44" />
    <circle cx="60" cy="60" r="58" />
  </svg>,
  // Connected: nodes joined by a continuous line
  <svg key="c" className="dots" viewBox="0 0 120 120" aria-hidden="true">
    <path d="M12 84 40 36 74 78 108 30" fill="none" />
    <circle cx="12" cy="84" r="6" />
    <circle cx="40" cy="36" r="6" />
    <circle cx="74" cy="78" r="6" />
    <circle cx="108" cy="30" r="6" />
  </svg>,
  // Intelligent: a field of points resolving into a wave
  <svg key="i" className="dots" viewBox="0 0 120 120" aria-hidden="true">
    {Array.from({ length: 5 }).flatMap((_, r) =>
      Array.from({ length: 5 }).map((__, c) => (
        <circle key={`${r}${c}`} cx={14 + c * 23} cy={14 + r * 23 + Math.sin(c * 0.9 + r * 0.6) * 7} r={2.2 + ((r + c) % 3) * 0.8} />
      )),
    )}
  </svg>,
  // Responsible: a balanced beam on a single fulcrum
  <svg key="r" className="dots" viewBox="0 0 120 120" aria-hidden="true">
    <path d="M60 30v62M36 92h48" fill="none" />
    <path d="M14 46 106 40" fill="none" />
    <circle cx="60" cy="30" r="5" />
    <path d="M14 46 4 72h20ZM106 40 96 66h20Z" fill="none" />
  </svg>,
];

const themes = [
  ["Human-centred healthcare", "Technology should fit around the people it serves: patients, doctors and care teams. Never the other way round."],
  ["Connected experiences", "Care works best when every step knows about the one before it, and the one that follows."],
  ["Intelligent technology", "Applied where it helps people decide, and held to the standard of those who rely on it."],
  ["Responsible innovation", "Progress that earns trust: considered, accountable, and built to last."],
] as const;

export function Philosophy() {
  return (
    <section className="philosophy" aria-labelledby="phil-title">
      <div className="wrap philosophy__grid">
        <div className="philosophy__head">
          <Reveal as="p" className="kicker">
            03 / Our philosophy
          </Reveal>
          <Headline text="Four ideas we build *around.*" id="phil-title" className="display display--md" />
        </div>
        <ol className="themes">
          {themes.map(([title, text], i) => (
            <li key={title} className="theme">
              <Reveal className="theme__inner">
                <span className="theme__no">{String(i + 1).padStart(2, "0")}</span>
                <div className="theme__body">
                  <h3>{title}</h3>
                  <p>{text}</p>
                </div>
                <div className="theme__glyph">{glyphs[i]}</div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
