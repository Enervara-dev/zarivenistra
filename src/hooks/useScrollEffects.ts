import { useEffect } from "react";
import { useReducedMotion } from "./useReducedMotion";

/**
 * One shared rAF-throttled scroll loop.
 *  - [data-speed="0.1"]  → vertical parallax (translate3d on the element)
 *  - [data-progress]     → sets --p (0..1) as the element crosses the viewport
 *  - [data-theme="dark"] sections → toggles data-nav on <html> for nav contrast
 */
export function useScrollEffects() {
  const reduced = useReducedMotion();

  useEffect(() => {
    const parallax = Array.from(document.querySelectorAll<HTMLElement>("[data-speed]"));
    const progress = Array.from(document.querySelectorAll<HTMLElement>("[data-progress]"));
    const darks = Array.from(document.querySelectorAll<HTMLElement>("section[data-theme='dark']"));
    let ticking = false;

    const update = () => {
      ticking = false;
      const vh = window.innerHeight;
      if (!reduced) {
        for (const el of parallax) {
          const r = el.parentElement!.getBoundingClientRect();
          if (r.bottom < -200 || r.top > vh + 200) continue;
          const off = (r.top + r.height / 2 - vh / 2) * Number(el.dataset.speed);
          el.style.transform = `translate3d(0,${off.toFixed(1)}px,0)`;
        }
      }
      for (const el of progress) {
        const r = el.getBoundingClientRect();
        const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height * 0.6 + vh * 0.2)));
        el.style.setProperty("--p", reduced ? "1" : p.toFixed(3));
      }
      const navY = 36;
      const onDark = darks.some((s) => {
        const r = s.getBoundingClientRect();
        return r.top <= navY && r.bottom >= navY;
      });
      document.documentElement.dataset.nav = onDark ? "dark" : "light";
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [reduced]);
}
