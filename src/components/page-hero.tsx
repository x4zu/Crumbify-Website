import Image from "next/image";
import type { ReactNode } from "react";
import { StarburstIcon } from "@/components/icons";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  images: readonly { src: string; alt: string }[];
  sticker?: string;
}

const placements = [
  "left-[2%] top-[18%] w-[24%] -rotate-6",
  "left-1/2 top-[4%] w-[30%] -translate-x-1/2 rotate-2",
  "right-[2%] top-[22%] w-[24%] rotate-6",
];

/** Inner-page hero: big centered headline over a fanned row of photo cards. */
export function PageHero({ eyebrow, title, images, sticker }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-cocoa px-4 pt-36 pb-16 text-oat md:px-6 md:pt-44">
      <div className="relative mx-auto max-w-4xl text-center">
        <span className="inline-block rounded-full bg-butter px-4 py-1.5 text-sm font-semibold text-cocoa-dark">{eyebrow}</span>
        <h1 className="mt-6 text-[clamp(3.4rem,9vw,7.5rem)] leading-[0.88]">{title}</h1>
      </div>

      <div className="relative mx-auto mt-14 h-[44vw] max-h-[460px] min-h-[220px] max-w-5xl">
        {images.slice(0, 3).map((image, i) => (
          <div
            key={image.src}
            className={`absolute aspect-[4/5] overflow-hidden rounded-[28px] bg-white p-1.5 shadow-[0_30px_50px_-25px_rgba(0,0,0,0.7)] transition-transform duration-500 hover:-translate-y-3 ${placements[i]}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[22px]">
              <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 768px) 300px, 30vw" className="object-cover" />
            </div>
          </div>
        ))}
        {sticker && (
          <div className="absolute right-[18%] bottom-[30%] z-10 hidden size-28 animate-spin-slow place-items-center md:grid">
            <StarburstIcon className="absolute inset-0 size-full text-berry" />
            <span className="relative text-center font-display text-lg leading-none text-cocoa-dark">{sticker}</span>
          </div>
        )}
      </div>
    </section>
  );
}
