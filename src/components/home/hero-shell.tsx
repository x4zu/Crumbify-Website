"use client";

import { Skeleton } from "boneyard-js/react";
import { useEffect, useState, type ReactNode } from "react";
import "@/bones/registry";

/**
 * Normal visits: renders the hero as-is, so it is in the server HTML and paints
 * without waiting for JavaScript (good LCP). The skeleton the visitor sees is the
 * server-rendered <HeroBones> overlay.
 *
 * `npm run bones`: boneyard's CLI sets window.__BONEYARD_BUILD. Then the hero is
 * wrapped in <Skeleton name="hero"> so the CLI can capture fresh bones.
 */
export function HeroShell({ children }: { children: ReactNode }) {
  const [capture, setCapture] = useState(false);

  useEffect(() => {
    // Read a browser-only flag after mount; this cannot be known during SSR.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (window.__BONEYARD_BUILD) setCapture(true);
  }, []);

  if (!capture) return <>{children}</>;
  return (
    <Skeleton name="hero" loading={false} snapshotConfig={{ excludeSelectors: ["[data-no-skeleton]"] }}>
      {children}
    </Skeleton>
  );
}
