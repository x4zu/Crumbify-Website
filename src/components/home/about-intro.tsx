import Image from "next/image";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { IMAGES } from "@/lib/content";

const stats = [
  { value: "48h", label: "dough fermentation" },
  { value: "30+", label: "bakes every morning" },
  { value: "6am", label: "first loaves out" },
];

export function AboutIntro() {
  return (
    <section className="px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-14 md:grid-cols-2">
        <Reveal className="relative order-2 md:order-1">
          <div className="relative aspect-[4/5] overflow-hidden rounded-[40px] bg-white ring-8 ring-milk">
            <Image src={IMAGES.about} alt="A spread of morning pastries" fill sizes="(min-width: 768px) 520px, 90vw" className="object-cover" />
          </div>
          <div className="absolute -right-3 -bottom-6 rounded-3xl bg-butter px-6 py-4 shadow-lg md:-right-8">
            <p className="font-display text-4xl leading-none text-cocoa">Since 2019</p>
            <p className="text-sm font-medium text-cocoa-soft">on Jl. Ahmad Yani</p>
          </div>
        </Reveal>

        <Reveal className="order-1 md:order-2" delay={120}>
          <span className="inline-block rounded-full bg-butter-soft px-4 py-1.5 text-sm font-semibold text-cocoa">Hello, neighbour</span>
          <h2 className="mt-5 text-5xl leading-[0.95] text-cocoa md:text-6xl">
            A little flour. <span className="text-caramel">A lot of joy.</span>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-cocoa-soft">
            We&apos;re Crumbify, a neighborhood bakery for slow mornings, quick coffee stops, and the pastry you think about all day.
          </p>
          <p className="mt-4 text-lg leading-relaxed text-cocoa-soft">
            We give our dough time, our loaves a good crust, and our counter a little something for everyone. Come for your usual. Leave with a new favorite.
          </p>

          <dl className="mt-8 grid grid-cols-3 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="rounded-2xl bg-milk p-4 ring-1 ring-cocoa/5">
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl text-cocoa md:text-4xl">{stat.value}</dd>
                <dd className="mt-1 text-xs leading-tight text-cocoa-soft md:text-sm">{stat.label}</dd>
              </div>
            ))}
          </dl>

          <PillLink href="/our-bakery" className="mt-9">
            Our story
          </PillLink>
        </Reveal>
      </div>
    </section>
  );
}
