import type { Metadata } from "next";
import Image from "next/image";
import { InstagramStrip } from "@/components/instagram-strip";
import { PageHero } from "@/components/page-hero";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { BRAND, IMAGES } from "@/lib/content";

export const metadata: Metadata = {
  title: "Our story",
  description: "Good bread. Good company. The story behind Crumbify.",
};

const heroImages = [
  { src: IMAGES.layers, alt: "Croissant cross-section showing its layers" },
  { src: IMAGES.painStack, alt: "Pain au chocolat broken open" },
  { src: IMAGES.cinnamonSplit, alt: "Cinnamon swirl pulled apart" },
] as const;

const process = [
  {
    step: "01.",
    title: "Time in the dough.",
    body: "We give the dough time to develop, then shape each batch by hand. A good crust begins well before the oven.",
    image: IMAGES.breadSpread,
    alt: "Hand-shaped sourdough and baguettes",
    color: "bg-butter",
  },
  {
    step: "02.",
    title: "Care in every fold.",
    body: "Folded pastry, a well-scored loaf, the right moment to come out of the oven. Small decisions make the difference.",
    image: IMAGES.layers,
    alt: "Laminated croissant layers",
    color: "bg-berry-soft",
  },
  {
    step: "03.",
    title: "Fresh to the counter.",
    body: "Bread for tonight. A pastry for right now. We bake for everyday appetites and the people who bring them.",
    image: IMAGES.fruitDanish,
    alt: "Fruit danishes fresh from the oven",
    color: "bg-sage",
  },
];

export default function OurBakeryPage() {
  return (
    <>
      <PageHero
        eyebrow="Our story"
        title={
          <>
            Good bread. <span className="text-butter">Good company.</span>
          </>
        }
        images={heroImages}
        sticker="Since 2019"
      />

      <section className="px-4 py-24 md:px-6 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1fr_1.1fr] md:items-center">
          <Reveal>
            <h2 className="text-5xl leading-[0.95] text-cocoa md:text-7xl">A bakery for the everyday.</h2>
          </Reveal>
          <Reveal delay={120} className="space-y-5 text-lg leading-relaxed text-cocoa-soft md:text-xl">
            <p>
              <span className="font-display text-2xl text-cocoa">Crumbify</span> began with a simple idea: a good bakery becomes part of your day. The coffee on your walk. The loaf under your arm. The pastry you share.
            </p>
            <p>
              We’re a small team who work the dough, watch the oven, and fill the counter with things we’d happily take home. We like learning your usual, helping you find a favorite, and sending you off with something warm.
            </p>
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-16 max-w-6xl">
          <div className="relative aspect-[4/3] overflow-hidden rounded-[28px] bg-white sm:aspect-[21/9] sm:rounded-[40px]">
            <Image src={IMAGES.board} alt="Crumbs on a wooden bread board" fill sizes="(min-width: 1152px) 1152px, 100vw" className="object-cover" />
            <p className="absolute bottom-6 left-6 rounded-full bg-cocoa px-5 py-2.5 font-display text-xl text-butter md:bottom-10 md:left-10 md:text-2xl">
              Every crumb counts.
            </p>
          </div>
        </Reveal>
      </section>

      <section className="rounded-[48px] bg-cocoa px-4 py-24 text-oat md:mx-4 md:rounded-[72px] md:px-6 md:py-28">
        <div className="mx-auto max-w-6xl">
          <Reveal className="max-w-2xl">
            <h2 className="text-5xl leading-[0.95] md:text-7xl">
              A little patience. <span className="text-butter">A better bake.</span>
            </h2>
            <p className="mt-5 text-lg text-oat/75">From the first fold to the final golden crust, we give every bake the time and care it deserves.</p>
          </Reveal>

          <ol className="mt-14 grid gap-6 md:grid-cols-3">
            {process.map((item, i) => (
              <li key={item.step}>
                <Reveal delay={i * 120} className="h-full">
                  <article className={`group flex h-full flex-col rounded-[32px] p-3 text-cocoa-dark ${item.color}`}>
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-white">
                      <Image src={item.image} alt={item.alt} fill sizes="(min-width: 768px) 360px, 90vw" className="object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="p-4 pt-6">
                      <span className="font-display text-5xl text-cocoa/60">{item.step}</span>
                      <h3 className="mt-2 text-3xl text-cocoa">{item.title}</h3>
                      <p className="mt-3 leading-relaxed text-cocoa-soft">{item.body}</p>
                    </div>
                  </article>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="px-4 py-24 md:px-6 md:py-32">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-5xl leading-[0.95] text-cocoa md:text-7xl">
            Come for your usual. <span className="text-caramel">Find a new favorite.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-lg text-cocoa-soft">
            Meet us at the counter for fresh bread, pastries and coffee. Take a look at what’s baking, or find your way to the bakery.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <PillLink href={BRAND.mapsUrl}>Find the bakery</PillLink>
            <PillLink href="/menu" variant="butter">
              Explore the menu
            </PillLink>
          </div>
        </Reveal>
      </section>

      <InstagramStrip />
    </>
  );
}
