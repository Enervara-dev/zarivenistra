import { useEffect, useState } from "react";

export const links = [
  { href: "#about", label: "About" },
  { href: "#ecosystem", label: "Our Ecosystem" },
  { href: "#vision", label: "Vision" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className={`nav ${open ? "is-open" : ""}`}>
      <a className="nav__brand" href="#top" onClick={() => setOpen(false)} aria-label="Zarivenistra, back to top">
        ZARIVENISTRA
      </a>
      <nav className="nav__links" aria-label="Primary">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
      </nav>
      <button
        className="nav__toggle"
        aria-expanded={open}
        aria-controls="menu"
        onClick={() => setOpen((o) => !o)}
      >
        <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
        <i aria-hidden="true" />
        <i aria-hidden="true" />
      </button>
      <div id="menu" className="menu" aria-hidden={!open} inert={!open}>
        {links.map((l, i) => (
          <a key={l.href} href={l.href} style={{ "--i": i } as React.CSSProperties} onClick={() => setOpen(false)}>
            {l.label}
          </a>
        ))}
      </div>
    </header>
  );
}
