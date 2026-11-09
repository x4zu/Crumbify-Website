import Image from "next/image";
import type { CSSProperties } from "react";
import { StarburstIcon } from "@/components/icons";
import { ScallopLink } from "@/components/scallop-link";
import { cn } from "@/lib/utils";

const cut = (name: string) => `/images/crumbify/cutouts/${name}.webp`;

interface PileItem {
  src: string;
  alt: string;
  w: number;
  h: number;
  /** Tailwind positioning/size classes, in % of the pile box */
  className: string;
  /** entrance order (ms) */
  delay: number;
  rotate?: number;
  float?: boolean;
  priority?: boolean;
}

/*
 * Studio-style pile: a board on the "table", pastries stacked on it, a few pieces
 * floating above. Inspired by the Sunday Crumb hero (a croissant on a board in front
 * of a giant headline), with a fuller pile and a cocoa set instead of blue.
 * Back to front: board -> lying pastries -> centre stack -> crumbs -> floaters.
 */
export const PILE: PileItem[] = [
  { src: cut("board"), alt: "", w: 1100, h: 296, className: "left-[6%] bottom-[2%] w-[88%] z-10", delay: 0, priority: true },
  { src: cut("croissant"), alt: "Butter croissant", w: 876, h: 498, className: "left-[6%] bottom-[17%] w-[42%] z-20", delay: 180, rotate: -8, priority: true },
  { src: cut("pain-au-chocolat"), alt: "Pain au chocolat", w: 840, h: 554, className: "right-[5%] bottom-[15%] w-[40%] z-20", delay: 300, rotate: 6, priority: true },
  { src: cut("croissant-stack"), alt: "A croissant topped with a cut croissant half", w: 779, h: 695, className: "left-[29%] bottom-[19%] w-[42%] z-30", delay: 460, priority: true },
  { src: cut("crumb-1"), alt: "", w: 241, h: 133, className: "-left-[3%] bottom-[1%] w-[10%] z-30", delay: 650, rotate: -10 },
  { src: cut("crumb-3"), alt: "", w: 192, h: 97, className: "left-[44%] -bottom-[4%] w-[7%] z-30", delay: 700, rotate: 18 },
  { src: cut("crumb-4"), alt: "", w: 158, h: 106, className: "right-[-1%] bottom-[6%] w-[7%] z-30", delay: 750, rotate: 8 },
  { src: cut("croissant-half"), alt: "Croissant cross-section", w: 681, h: 456, className: "-left-[13%] top-[34%] w-[24%] z-40 hidden lg:block", delay: 820, rotate: -14, float: true },
  { src: cut("fruit-danish"), alt: "Apricot and berry danishes", w: 1100, h: 445, className: "-right-[16%] top-[40%] w-[30%] z-40 hidden lg:block", delay: 920, rotate: 9, float: true },
  { src: cut("crumb-2"), alt: "", w: 228, h: 131, className: "-left-[4%] top-[22%] w-[6%] z-40 hidden lg:block", delay: 1000, rotate: 25, float: true },
];

/** `sizes` for a pile image: its width % of the pile box (max 860px wide). */
export function pileSizes(item: PileItem) {
  const pct = Number(item.className.match(/\bw-\[(\d+)%\]/)?.[1] ?? 40);
  return `(min-width: 900px) ${Math.round(pct * 8.6)}px, ${pct}vw`;
}

export function Hero() {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-cocoa text-oat">
      {/* ---- studio set ---- */}
      <div aria-hidden="true" data-no-skeleton className="absolute inset-0 -z-10">
        {/* warm key light from the top-left */}
        <div className="absolute -top-1/4 -left-1/4 h-[90%] w-[80%] rounded-full bg-[radial-gradient(closest-side,rgba(247,201,72,0.35),transparent)] blur-2xl" />
        {/* window light rays */}
        <div className="absolute inset-0 bg-[repeating-linear-gradient(118deg,transparent_0_70px,rgba(255,226,170,0.07)_70px_150px)] [mask-image:radial-gradient(ellipse_at_top_left,black,transparent_65%)] blur-[6px]" />
        {/* table surface */}
        <div className="absolute inset-x-0 bottom-0 h-[30%] bg-gradient-to-b from-[#3a1c10] to-cocoa-dark md:h-[34%]">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-butter/40 to-transparent" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_0%,rgba(247,201,72,0.18),transparent_60%)]" />
        </div>
      </div>

      <div className="relative mx-auto flex w-full max-w-7xl flex-1 flex-col items-center justify-center px-4 xl:justify-start pt-28 md:px-6 md:pt-[max(6.5rem,13svh)]">
        {/* giant headline, sits behind the pile */}
        <h1 className="animate-in fade-in slide-in-from-bottom-6 relative z-0 text-center text-[clamp(3.4rem,min(12.5vw,15svh),11.5rem)] leading-[0.82] duration-1000">
          <span className="block text-oat">A little crust,</span>
          <span className="block text-butter">a lot of joy</span>
        </h1>

        {/* the pile */}
        <div className="relative z-10 -mt-[min(9vw,14svh)] aspect-[43/28] w-[min(100%,860px,80svh)]">
          {PILE.map((item) => (
            <div
              key={item.src}
              className={cn("animate-in fade-in slide-in-from-top-12 absolute fill-mode-both duration-700 ease-out", item.className)}
              style={{ animationDelay: `${item.delay}ms` }}
            >
              <div
                className={cn(item.float && "animate-float")}
                style={{ ["--r" as string]: `${item.rotate ?? 0}deg`, transform: `rotate(${item.rotate ?? 0}deg)`, animationDelay: item.float ? `${item.delay}ms` : undefined } as CSSProperties}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  width={item.w}
                  height={item.h}
                  // Eager, but normal priority: the LCP is hero text, so these must not
                  // compete with the CSS and fonts.
                  loading={item.priority ? "eager" : "lazy"}
                  sizes={pileSizes(item)}
                  className="h-auto w-full drop-shadow-[0_18px_22px_rgba(20,8,3,0.45)]"
                />
              </div>
            </div>
          ))}

          <div className="animate-in zoom-in fade-in absolute top-[30%] right-[18%] z-50 grid size-24 place-items-center fill-mode-both delay-1000 duration-500 md:size-32">
            <div className="absolute inset-0 animate-spin-slow">
              <StarburstIcon className="size-full text-berry" />
            </div>
            <span className="relative rotate-12 text-center font-display text-base leading-none text-cocoa-dark md:text-xl">
              Baked
              <br />
              daily
            </span>
          </div>
        </div>

        {/*
          Below xl: stacked under the pile. From xl: pulled up beside the board on the
          table (button left, copy right, like the original), clear of the ribbon below.
        */}
        <div className="relative z-20 flex w-full flex-col items-center gap-6 pt-6 pb-24 text-center md:pb-28 xl:-mt-[15svh] xl:w-screen xl:flex-row xl:items-center xl:justify-between xl:px-[4vw] xl:pt-0 xl:pb-[11svh] xl:text-right">
          <p className="max-w-md text-lg leading-relaxed text-oat/80 xl:order-2 xl:max-w-[18rem]">
            A neighborhood bakery making slow-fermented bread, buttery pastries, and reasons to stop by.
          </p>
          <ScallopLink href="/menu" className="xl:order-1">
            Explore the menu
          </ScallopLink>
        </div>
      </div>
    </section>
  );
}
