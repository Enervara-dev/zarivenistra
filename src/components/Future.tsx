import { NetworkCanvas } from "../art/NetworkCanvas";
import { Headline, Reveal } from "./ui";

const stages = ["Discover", "Understand", "Treat", "Follow through"];

export function Future() {
  return (
    <section className="future" id="vision" data-theme="dark" aria-labelledby="future-title">
      <NetworkCanvas className="future__canvas" label="A drifting network of connected nodes, two of them highlighted as the Zarivenistra brands" />
      <div className="wrap future__inner">
        <Reveal as="p" className="kicker">
          04 / The future
        </Reveal>
        <Headline text="Many systems. One *continuous* experience of care." id="future-title" className="display future__title" />
        <Reveal as="p" delay={150} className="lead future__lead">
          Our long-term vision is a healthcare landscape where discovery, diagnosis, treatment and follow-up are no longer separate worlds, where information moves with the patient, and technology quietly supports the people delivering care.
        </Reveal>

        <div className="horizon" data-progress aria-label="The continuous path of care">
          <div className="horizon__line" aria-hidden="true">
            <span />
          </div>
          <ol>
            {stages.map((s, i) => (
              <li key={s} style={{ "--k": i / (stages.length - 1) } as React.CSSProperties}>
                <span className="horizon__dot" aria-hidden="true" />
                {s}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
