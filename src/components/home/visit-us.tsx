import Image from "next/image";
import { PinIcon } from "@/components/icons";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { BRAND, IMAGES, OPENING_HOURS } from "@/lib/content";

export function VisitUs() {
  return (
    <section className="px-4 md:px-6">
      <Reveal className="mx-auto grid max-w-6xl overflow-hidden rounded-[48px] bg-sage md:grid-cols-2">
        <div className="p-8 md:p-14">
          <h2 className="text-5xl leading-[0.95] text-cocoa md:text-7xl">Come on in.</h2>
          <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-milk px-4 py-2 font-semibold text-cocoa">
            <PinIcon className="size-5 text-caramel" />
            {BRAND.address}
          </p>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-cocoa-soft">
            Your morning coffee, a warm pastry and a loaf to take home. We’ll see you at the counter.
          </p>

          <dl className="mt-8 divide-y-2 divide-dashed divide-cocoa/15 rounded-3xl bg-milk px-6">
            {OPENING_HOURS.map((row) => (
              <div key={row.days} className="flex items-center justify-between gap-4 py-4">
                <dt className="font-medium text-cocoa">{row.days}</dt>
                <dd className={row.hours === "Closed" ? "font-display text-xl whitespace-nowrap text-[#b5324f]" : "font-display text-xl whitespace-nowrap text-cocoa"}>{row.hours}</dd>
              </div>
            ))}
          </dl>

          <PillLink href={BRAND.mapsUrl} className="mt-8">
            Get directions
          </PillLink>
        </div>

        <div className="relative min-h-80 bg-white">
          <Image src={IMAGES.breadSpread} alt="Sourdough, baguettes and bagels" fill sizes="(min-width: 768px) 560px, 100vw" className="object-cover" />
        </div>
      </Reveal>
    </section>
  );
}
