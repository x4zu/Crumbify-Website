import type { Metadata } from "next";
import { FaqSection } from "@/components/faq-section";
import { InstagramStrip } from "@/components/instagram-strip";
import { MenuGrid } from "@/components/menu/menu-grid";
import { PageHero } from "@/components/page-hero";
import { WordMarquee } from "@/components/word-marquee";

export const metadata: Metadata = {
  title: "Menu",
  description: "Bread, pastries and sweets — fresh from the Crumbify counter.",
};

const heroImages = [
  { src: "/images/crumbify/bread-spread.webp", alt: "Sourdough, baguettes and bagels" },
  { src: "/images/crumbify/pastry-spread.webp", alt: "Cinnamon swirls, pain au chocolat and danishes" },
  { src: "/images/crumbify/sweets-spread.webp", alt: "Muffins, cookies, donuts and scones" },
] as const;

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="Our menu"
        title={
          <>
            Pick your <span className="text-butter">happy bite.</span>
          </>
        }
        images={heroImages}
        sticker="Fresh daily"
      />
      <WordMarquee />
      <MenuGrid />
      <FaqSection />
      <InstagramStrip />
    </>
  );
}
