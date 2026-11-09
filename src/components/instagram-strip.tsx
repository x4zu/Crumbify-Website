import Image from "next/image";
import { InstagramIcon } from "@/components/icons";
import { PillLink } from "@/components/pill-link";
import { INSTAGRAM_PHOTOS } from "@/lib/content";

const tilts = ["-rotate-3", "rotate-2", "-rotate-1", "rotate-3", "-rotate-2", "rotate-1"];

export function InstagramStrip() {
  const photos = [...INSTAGRAM_PHOTOS, ...INSTAGRAM_PHOTOS];
  return (
    <section className="overflow-hidden bg-butter py-24">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 md:flex-row md:items-end">
        <h2 className="text-5xl leading-[0.95] text-cocoa md:text-7xl">Follow the crumbs.</h2>
        <PillLink href="#" variant="cocoa">
          <InstagramIcon className="size-5" />
          Follow along on Instagram
        </PillLink>
      </div>

      <div className="motion-keep mt-14 flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
        {photos.map((photo, i) => (
          <figure
            key={`${photo.src}-${i}`}
            className={`relative h-72 w-60 shrink-0 overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_18px_30px_-18px_rgba(43,21,12,0.5)] transition-transform duration-500 hover:rotate-0 md:h-80 md:w-72 ${tilts[i % tilts.length]}`}
          >
            <div className="relative h-full w-full overflow-hidden rounded-[22px] bg-white">
              <Image src={photo.src} alt={photo.alt} fill sizes="288px" className="object-cover" />
            </div>
          </figure>
        ))}
      </div>
    </section>
  );
}
