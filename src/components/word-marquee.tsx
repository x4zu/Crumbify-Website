import { StarburstIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const WORDS = ["Slow-fermented", "Baked daily", "Buttery layers", "Neighborhood loved", "Fresh from the oven"];

interface StripProps {
  reverse?: boolean;
  className?: string;
  textClass: string;
  starClass: string;
}

function Strip({ reverse, className, textClass, starClass }: StripProps) {
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];
  return (
    <div className={cn("overflow-hidden border-y-2 border-cocoa-dark py-3.5 md:py-4", className)}>
      <div className={cn("flex w-max items-center gap-8", "motion-keep", reverse ? "animate-marquee-reverse" : "animate-marquee")}>
        {items.map((word, i) => (
          <span key={i} className={cn("flex items-center gap-8 font-display text-3xl whitespace-nowrap md:text-4xl", textClass)}>
            {word}
            <StarburstIcon className={cn("size-7", starClass)} />
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Two crossing ribbons. The back one scrolls right, the front one scrolls left.
 * Sits on the seam between the hero and the next section.
 */
export function WordMarquee({ className }: { className?: string }) {
  return (
    <div aria-hidden="true" data-no-fade className={cn("pointer-events-none relative z-20 -mt-14 h-36 overflow-x-clip md:-mt-16 md:h-40", className)}>
      <Strip
        reverse
        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-butter"
        textClass="text-cocoa"
        starClass="text-berry"
      />
      <Strip
        className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2deg] bg-berry shadow-[0_14px_30px_-14px_rgba(43,21,12,0.55)]"
        textClass="text-cocoa-dark"
        starClass="text-butter"
      />
    </div>
  );
}
