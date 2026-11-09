import { PillLink } from "@/components/pill-link";
import { ProductCard } from "@/components/product-card";
import { Reveal } from "@/components/reveal";
import { BEST_SELLERS } from "@/lib/content";

export function BestSellers() {
  return (
    <section className="rounded-[48px] bg-butter-soft px-4 py-24 md:mx-4 md:rounded-[72px] md:px-6 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-xl">
            <span className="inline-block rounded-full bg-cocoa px-4 py-1.5 text-sm font-semibold text-butter">Best sellers</span>
            <h2 className="mt-5 text-5xl leading-[0.95] text-cocoa md:text-7xl">Our Best Seller</h2>
            <p className="mt-4 text-lg text-cocoa-soft">Golden layers. Soft middles. A few very good reasons to make us your usual.</p>
          </div>
          <PillLink href="/menu">Explore the Menu</PillLink>
        </Reveal>

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {BEST_SELLERS.map((item, i) => (
            <li key={item.slug}>
              <Reveal delay={(i % 3) * 100} className="h-full">
                <ProductCard item={item} />
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
