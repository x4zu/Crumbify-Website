import { renderBones } from "boneyard-js";
import type { SkeletonResult } from "boneyard-js";
import heroBones from "@/bones/hero.bones.json";

const BONE_COLOR = "#5c3322";

/** Breakpoints captured by `npm run bones`, smallest first. */
const breakpoints = Object.entries((heroBones as { breakpoints: Record<string, SkeletonResult> }).breakpoints)
  .map(([width, skel]) => ({ width: Number(width), skel }))
  .sort((a, b) => a.width - b.width);

/**
 * Server-rendered boneyard skeleton for the hero.
 * - One layer per captured breakpoint. Media queries show only the matching layer.
 * - It sits over the (already rendered) hero and fades out with pure CSS after a
 *   moment, so it never waits for hydration.
 */
export function HeroBones() {
  const css = breakpoints
    .map(({ width }, i) => {
      const next = breakpoints[i + 1]?.width;
      const min = i === 0 ? 0 : width;
      const range = next ? `(min-width: ${min}px) and (max-width: ${next - 0.02}px)` : `(min-width: ${min}px)`;
      return `@media ${range}{.hero-bones>[data-bp="${width}"]{display:block}}`;
    })
    .join("");

  return (
    <div aria-hidden="true" className="hero-bones">
      <style>{css}</style>
      {breakpoints.map(({ width, skel }) => (
        <div key={width} data-bp={width} dangerouslySetInnerHTML={{ __html: renderBones(skel, BONE_COLOR, true) }} />
      ))}
    </div>
  );
}
