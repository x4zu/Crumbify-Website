"use client";

import { useMemo, useState } from "react";
import { ProductCard } from "@/components/product-card";
import { MENU_ITEMS } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { MenuCategory } from "@/types/bakery";

type Filter = "All" | MenuCategory;
const FILTERS: Filter[] = ["All", "Bread", "Pastries", "Sweets"];
const PAGE_SIZE = 9;

export function MenuGrid() {
  const [filter, setFilter] = useState<Filter>("All");
  const [visible, setVisible] = useState(PAGE_SIZE);

  const items = useMemo(
    () => (filter === "All" ? MENU_ITEMS : MENU_ITEMS.filter((item) => item.category === filter)),
    [filter],
  );
  const shown = items.slice(0, visible);

  const selectFilter = (next: Filter) => {
    setFilter(next);
    setVisible(PAGE_SIZE);
  };

  return (
    <section className="px-4 py-20 md:px-6 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <h2 className="text-5xl leading-[0.95] text-cocoa md:text-6xl">Fresh from the counter.</h2>
            <p className="mt-3 text-lg text-cocoa-soft">Everything is made for a very good day.</p>
          </div>

          <div role="tablist" aria-label="Filter menu" className="no-scrollbar flex max-w-full gap-1 overflow-x-auto rounded-full bg-milk p-1.5 ring-1 ring-cocoa/10">
            {FILTERS.map((name) => {
              const count = name === "All" ? MENU_ITEMS.length : MENU_ITEMS.filter((i) => i.category === name).length;
              const active = filter === name;
              return (
                <button
                  key={name}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => selectFilter(name)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full px-3.5 py-2.5 text-sm sm:gap-2 sm:px-5 sm:text-[15px] font-semibold whitespace-nowrap transition-colors duration-300",
                    active ? "bg-cocoa text-oat" : "text-cocoa hover:bg-butter-soft",
                  )}
                >
                  {name}
                  <span className={cn("rounded-full px-2 text-xs", active ? "bg-butter text-cocoa-dark" : "bg-cocoa/10")}>{count}</span>
                </button>
              );
            })}
          </div>
        </div>

        <ul key={filter} className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((item, i) => (
            <li
              key={item.slug}
              className="animate-in fade-in slide-in-from-bottom-4 fill-mode-both duration-500"
              style={{ animationDelay: `${(i % PAGE_SIZE) * 50}ms` }}
            >
              <ProductCard item={item} priority={i < 3} />
            </li>
          ))}
        </ul>

        {visible < items.length && (
          <div className="mt-12 flex justify-center">
            <button
              type="button"
              onClick={() => setVisible((v) => v + PAGE_SIZE)}
              className="rounded-full border-2 border-cocoa px-8 py-3.5 font-semibold text-cocoa transition-colors hover:bg-cocoa hover:text-oat"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
