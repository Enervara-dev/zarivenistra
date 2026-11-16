import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode } from "react";

/** Fades/raises its children once, the first time they enter the viewport. */
export function Reveal({
  as: Tag = "div",
  delay = 0,
  className = "",
  children,
}: {
  as?: ElementType;
  delay?: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const shown = useOnce(ref);
  return (
    <Tag
      ref={ref}
      className={`reveal ${shown ? "is-in" : ""} ${className}`}
      style={{ "--d": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * Headline whose words rise out of a mask. `*word*` renders in the serif italic accent.
 * The full sentence stays in the accessible name; the split spans are hidden from AT.
 */
export function Headline({
  as: Tag = "h2",
  text,
  id,
  className = "",
}: {
  as?: ElementType;
  text: string;
  id?: string;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const shown = useOnce(ref);
  const plain = text.replace(/\*/g, "");
  return (
    <Tag ref={ref} id={id} className={`headline ${shown ? "is-in" : ""} ${className}`} aria-label={plain}>
      {text.split(" ").map((w, i) => {
        const em = w.startsWith("*");
        return (
          <span key={i} aria-hidden="true">
            <span className="w">
              <span style={{ "--i": i } as CSSProperties}>{em ? <em>{w.replace(/\*/g, "")}</em> : w}</span>
            </span>{" "}
          </span>
        );
      })}
    </Tag>
  );
}

function useOnce(ref: React.RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [ref]);
  return shown;
}

export function ExternalLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a className={`arrow-link ${className}`} href={href} target="_blank" rel="noopener noreferrer">
      <span>{children}</span>
      <svg viewBox="0 0 20 20" width="16" height="16" aria-hidden="true">
        <path d="M5 15 15 5M7 5h8v8" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}
