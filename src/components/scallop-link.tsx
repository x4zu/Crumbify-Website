import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ScallopLinkProps {
  href: string;
  children: ReactNode;
  /** Button size in px. The scalloped edge is drawn for exactly this size. */
  width?: number;
  height?: number;
  className?: string;
}

/**
 * Cloud / scalloped-edge button (like the Sunday Crumb CTA).
 * The shape is a stadium filled in the middle, ringed with small circles, so the
 * bumps stay round at any size instead of stretching.
 */
export function ScallopLink({ href, children, width = 240, height = 68, className }: ScallopLinkProps) {
  const r = height * 0.16; // bump radius
  const a = height / 2 - r; // half-height of the stadium the bump centres sit on
  const x1 = a + r;
  const x2 = width - a - r;
  const cy = height / 2;

  // walk the stadium outline and drop a bump every ~1.45r
  const step = r * 1.45;
  const straight = x2 - x1;
  const arc = Math.PI * a;
  const perimeter = 2 * straight + 2 * arc;
  const count = Math.max(8, Math.round(perimeter / step));
  const bumps = Array.from({ length: count }, (_, i) => {
    let d = (i / count) * perimeter;
    if (d < straight) return [x1 + d, cy - a];
    d -= straight;
    if (d < arc) {
      const t = -Math.PI / 2 + d / a;
      return [x2 + a * Math.cos(t), cy + a * Math.sin(t)];
    }
    d -= arc;
    if (d < straight) return [x2 - d, cy + a];
    d -= straight;
    const t = Math.PI / 2 + d / a;
    return [x1 + a * Math.cos(t), cy + a * Math.sin(t)];
  });

  return (
    <Link
      href={href}
      className={cn(
        "group relative inline-grid shrink-0 place-items-center transition-transform duration-300 ease-out hover:-rotate-2 hover:scale-105 active:scale-95",
        className,
      )}
      style={{ width, height }}
    >
      <svg
        aria-hidden="true"
        viewBox={`0 0 ${width} ${height}`}
        width={width}
        height={height}
        className="absolute inset-0 overflow-visible text-butter drop-shadow-[0_10px_18px_rgba(20,8,3,0.35)] transition-colors duration-300 group-hover:text-[#ffd85c]"
      >
        <g fill="currentColor">
          <rect x={x1 - a} y={cy - a} width={straight + 2 * a} height={2 * a} rx={a} />
          {bumps.map(([x, y], i) => (
            <circle key={i} cx={x.toFixed(2)} cy={y.toFixed(2)} r={r.toFixed(2)} />
          ))}
        </g>
      </svg>
      <span className="relative font-display text-xl leading-none text-cocoa-dark">{children}</span>
    </Link>
  );
}
