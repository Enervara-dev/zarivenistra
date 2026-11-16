import { Headline, Reveal, ExternalLink } from "./ui";
import { links } from "./Nav";

export function Closing() {
  return (
    <>
      <section className="closing" id="contact" aria-labelledby="closing-title">
        <div className="wrap closing__inner">
          <Headline text="Building a better *connected* world of healthcare." id="closing-title" className="display display--xl" />
          <Reveal delay={200} className="closing__cta">
            <a className="button" href="mailto:hello@enervara.com">
              <span>Start a conversation</span>
              <svg viewBox="0 0 20 20" width="18" height="18" aria-hidden="true">
                <path d="M3 10h13M11 5l5 5-5 5" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>
            <span className="closing__mail">hello@enervara.com</span>
          </Reveal>
        </div>
      </section>

      <footer className="footer">
        <div className="wrap footer__grid">
          <div>
            <p className="footer__brand">ZARIVENISTRA</p>
            <p className="footer__line">Building a more connected future of healthcare.</p>
          </div>
          <nav aria-label="Footer">
            <h2>Explore</h2>
            <ul>
              {links.map((l) => (
                <li key={l.href}>
                  <a href={l.href}>{l.label}</a>
                </li>
              ))}
            </ul>
          </nav>
          <div>
            <h2>Our brands</h2>
            <ul>
              <li>
                <ExternalLink href="https://enervara.com">Enervara</ExternalLink>
              </li>
              <li>
                <ExternalLink href="https://oryndoc.com">OrynDoc</ExternalLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="wrap footer__base">
          <p>© {new Date().getFullYear()} Zarivenistra. All rights reserved.</p>
          <a href="#top">Back to top ↑</a>
        </div>
      </footer>
    </>
  );
}
