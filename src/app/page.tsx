import { FaqSection } from "@/components/faq-section";
import { AboutIntro } from "@/components/home/about-intro";
import { BestSellers } from "@/components/home/best-sellers";
import { Hero } from "@/components/home/hero";
import { HeroBones } from "@/components/home/hero-bones";
import { HeroShell } from "@/components/home/hero-shell";
import { HowToOrder } from "@/components/home/how-to-order";
import { VisitUs } from "@/components/home/visit-us";
import { InstagramStrip } from "@/components/instagram-strip";
import { WordMarquee } from "@/components/word-marquee";

export default function Home() {
  return (
    <>
      <div className="relative">
        <HeroShell>
          <Hero />
        </HeroShell>
        <HeroBones />
      </div>
      <WordMarquee />
      <AboutIntro />
      <BestSellers />
      <HowToOrder />
      <VisitUs />
      <FaqSection />
      <InstagramStrip />
    </>
  );
}
