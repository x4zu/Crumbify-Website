import Image from "next/image";
import { PillLink } from "@/components/pill-link";
import { Reveal } from "@/components/reveal";
import { IMAGES } from "@/lib/content";

const cards = [
  {
    step: "01",
    title: "Visit the bakery.",
    body: "Pop in for fresh bread, pastries and coffee to take away. Choose from the day’s counter selection, available while it lasts.",
    cta: { href: "/menu", label: "Browse the menu" },
    image: IMAGES.painStack,
    alt: "Pain au chocolat broken open",
    theme: "bg-cocoa text-oat",
    stepColor: "text-butter",
    button: "butter" as const,
  },
  {
    step: "02",
    title: "Large orders.",
    body: "Enquire at least 48 hours ahead with your date and guest count. We’ll confirm availability, price and bakery collection.",
    cta: { href: "mailto:hello@crumbify.co", label: "Enquire about catering" },
    image: IMAGES.sweetsSpread,
    alt: "Muffins, cookies, donuts and scones for catering",
    theme: "bg-berry text-cocoa-dark",
    stepColor: "text-cocoa",
    button: "cocoa" as const,
  },
];

export function HowToOrder() {
  return (
    <section id="order" className="scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-5xl leading-[0.95] text-cocoa md:text-7xl">How to order</h2>
          <p className="mt-4 text-lg text-cocoa-soft">Drop in for today’s bakes, or plan ahead for catering and larger orders.</p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-2">
          {cards.map((card, i) => (
            <Reveal key={card.step} delay={i * 120} className="h-full">
              <article className={`flex h-full flex-col overflow-hidden rounded-[40px] ${card.theme}`}>
                <div className="flex flex-1 flex-col p-8 md:p-10">
                  <span className={`font-display text-6xl ${card.stepColor}`}>{card.step}</span>
                  <h3 className="mt-4 text-4xl md:text-5xl">{card.title}</h3>
                  <p className="mt-4 text-lg leading-relaxed opacity-85">{card.body}</p>
                  <PillLink href={card.cta.href} variant={card.button} className="mt-8 self-start">
                    {card.cta.label}
                  </PillLink>
                </div>
                <div className="relative mx-4 mb-4 aspect-[16/9] overflow-hidden rounded-[28px] bg-white">
                  <Image src={card.image} alt={card.alt} fill sizes="(min-width: 768px) 540px, 90vw" className="object-cover transition-transform duration-700 hover:scale-105" />
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
