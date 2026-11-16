import { useEffect, useRef } from "react";
import { useReducedMotion } from "../hooks/useReducedMotion";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  hub: boolean;
}

/**
 * A drifting field of nodes that connect when near one another. Two larger hubs
 * stand for the two brands within the wider ecosystem and are always linked.
 */
export function NetworkCanvas({ className, label }: { className?: string; label: string }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let nodes: Node[] = [];
    let raf = 0;
    let visible = true;
    const pointer = { x: -9999, y: -9999 };

    const seed = () => {
      const count = w < 700 ? 44 : 96;
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.18,
        vy: (Math.random() - 0.5) * 0.18,
        r: i < 2 ? 5 : 1 + Math.random() * 1.6,
        hub: i < 2,
      }));
      nodes[0].x = w * 0.62;
      nodes[0].y = h * 0.4;
      nodes[1].x = w * 0.8;
      nodes[1].y = h * 0.62;
    };

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      frame();
    };

    const link = 170;
    const frame = () => {
      ctx.clearRect(0, 0, w, h);
      for (const n of nodes) {
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
        }
      }
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          const hubPair = a.hub && b.hub;
          if (d < link || hubPair) {
            const near = Math.hypot((a.x + b.x) / 2 - pointer.x, (a.y + b.y) / 2 - pointer.y) < 180 ? 0.35 : 0;
            const alpha = hubPair ? 0.7 : (1 - d / link) * 0.42 + near * (1 - d / link);
            ctx.strokeStyle = hubPair ? `rgba(120,214,205,${alpha})` : `rgba(235,232,224,${alpha})`;
            ctx.lineWidth = hubPair ? 1 : 0.6;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }
      for (const n of nodes) {
        if (n.hub) {
          ctx.strokeStyle = "rgba(120,214,205,0.55)";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, 15, 0, 6.2832);
          ctx.stroke();
          ctx.fillStyle = "#9be6dd";
          ctx.font = "500 11px 'Inter Tight Variable', system-ui, sans-serif";
          ctx.letterSpacing = "2px";
          ctx.textBaseline = "middle";
          ctx.fillText(n === nodes[0] ? "ENERVARA" : "ORYNDOC", n.x + 26, n.y);
        } else {
          ctx.fillStyle = "rgba(235,232,224,0.8)";
        }
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, 6.2832);
        ctx.fill();
      }
    };

    const loop = () => {
      frame();
      raf = visible && !document.hidden ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      if (visible) kick();
    });
    io.observe(canvas);
    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      pointer.x = e.clientX - r.left;
      pointer.y = e.clientY - r.top;
    };

    resize();
    window.addEventListener("resize", resize);
    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("visibilitychange", kick);
      kick();
    }
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("visibilitychange", kick);
    };
  }, [reduced]);

  return <canvas ref={ref} className={className} role="img" aria-label={label} />;
}
