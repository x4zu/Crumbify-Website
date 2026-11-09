import Image from "next/image";
import { PlusIcon } from "@/components/icons";
import { formatPrice } from "@/lib/content";
import { cn } from "@/lib/utils";
import type { MenuItem } from "@/types/bakery";

interface ProductCardProps {
  item: MenuItem;
  className?: string;
  priority?: boolean;
}

export function ProductCard({ item, className, priority }: ProductCardProps) {
  return (
    <article
      className={cn(
        "group flex h-full flex-col rounded-[28px] bg-milk p-3 shadow-[0_1px_0_rgba(43,21,12,0.06)] ring-1 ring-cocoa/5 transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_24px_40px_-20px_rgba(74,38,23,0.35)]",
        className,
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-white">
        <Image
          src={item.image}
          alt={item.name}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 group-hover:scale-[1.06] group-hover:rotate-[-2deg]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-butter px-3 py-1 text-sm font-bold text-cocoa-dark">
          {formatPrice(item.price)}
        </span>
        {item.tag && (
          <span className="absolute top-3 right-3 rounded-full bg-berry px-3 py-1 text-xs font-semibold text-cocoa-dark">
            {item.tag}
          </span>
        )}
      </div>
      <div className="flex flex-1 items-end justify-between gap-3 px-2 pt-4 pb-2">
        <div>
          <h3 className="text-2xl leading-tight text-cocoa">{item.name}</h3>
          <p className="mt-1.5 text-[15px] leading-snug text-cocoa-soft">{item.description}</p>
        </div>
        <button
          type="button"
          aria-label={`Add ${item.name}`}
          className="grid size-11 shrink-0 place-items-center rounded-full bg-cocoa text-oat transition-all duration-300 group-hover:rotate-90 hover:bg-berry hover:text-cocoa-dark"
        >
          <PlusIcon className="size-5" />
        </button>
      </div>
    </article>
  );
}
