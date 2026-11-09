# Crumbify Customization Guide

This guide shows how to turn Crumbify into a website for *your* bakery. Most changes are in **3 files**.

| What | Where |
|---|---|
| Brand name, address, links, menu, FAQ, hours | `src/lib/content.ts` |
| Colors, fonts, animations | `src/app/globals.css`, `src/app/layout.tsx` |
| Photos | `public/images/crumbify/` |

---

## 1. Brand & contact info

Open `src/lib/content.ts`:

```ts
export const BRAND = {
  name: "Crumbify",
  address: "18 Market Lane, Brookfield",
  email: "hello@crumbify.co",
  phone: "+1 (555) 018-2026",
  instagram: "@crumbify",
};
export const SOURCE_URL = "https://github.com/x4zu/Crumbify-Website";
```

Also update `metadata` (page title and description) in `src/app/layout.tsx`.

## 2. Menu

Every product is one object in `MENU_ITEMS`:

```ts
{
  slug: "butter-croissant",       // unique id
  name: "Butter croissant",
  description: "Golden, flaky layers with a buttery middle.",
  price: 4.5,
  category: "Pastries",           // "Bread" | "Pastries" | "Sweets"
  image: img("butter-croissant"), // → /images/crumbify/butter-croissant.webp
  bestSeller: true,               // shows on the home page (keep 3 or 6 for a full grid)
  tag: "Fan favourite",           // optional badge
}
```

To add a category, extend `MenuCategory` in `src/types/bakery.ts`, then add it to `FILTERS` in `src/components/menu/menu-grid.tsx`.

## 3. Colors

The palette is defined once in `src/app/globals.css` under `@theme inline`:

```css
--color-cocoa: #4a2617;   /* dark surfaces, buttons      */
--color-butter: #f7c948;  /* highlights, CTAs            */
--color-berry: #e9738f;   /* accents, stickers, marquee  */
--color-oat: #fbf1e4;     /* page background             */
--color-milk: #fffaf3;    /* cards                       */
```

Change the hex values, and every `bg-cocoa`, `text-butter`, etc. updates automatically.

## 4. Fonts

`src/app/layout.tsx` loads **Lilita One** (headings) and **Inter** (body) with `next/font/google`. To use another Google font, swap the import and keep the same CSS variable names (`--font-lilita`, `--font-inter`).

## 5. Photos

### Menu / gallery photos
Drop WebP or JPG files into `public/images/crumbify/` and reference them by file name in `content.ts`. Square-ish 4:3 images look best on product cards.

If your photos are **sheets with several products** (like the ones in `AssetsPhotos/`), edit the crop boxes in `scripts/crop-assets.mjs` and run:

```bash
npm run assets:crop
```

### Hero pastry pile
The hero uses **transparent cutouts** from `public/images/crumbify/cutouts/`. They are generated from white-background photos:

```bash
npm run assets:cutout
```

Tips:
- Use photos on a **plain white or light-grey** background.
- Avoid very pale products (glazed or sugar-dusted). They blend into the background and get cut away.
- You can also use any transparent PNG/WebP made with another tool.

To move pieces around the pile, edit the `PILE` array in `src/components/home/hero.tsx`. Each item is positioned with Tailwind classes in **% of the pile box**, so it scales on every screen:

```ts
{ src: cut("croissant-stack"), className: "left-[29%] bottom-[19%] w-[42%] z-30", delay: 460 }
```

`z-*` controls the layering, and `delay` controls the drop-in order (ms).

## 6. Skeleton loader (boneyard)

The hero shows a [boneyard](https://github.com/0xGF/boneyard) skeleton (`<HeroBones>`, server-rendered from the captured bones, fades out with CSS). The bones in `src/bones/hero.bones.json` are a snapshot of the real hero layout, so **re-capture them after you change the hero**:

```bash
npm run dev          # terminal 1
npm run bones        # terminal 2
```

The CLI uses Playwright by default. If that is not installed, start Chrome with a debug port, then add `--cdp 9222`:

```bash
chrome --headless=new --remote-debugging-port=9222 --user-data-dir=/tmp/boneyard
npx boneyard-js build http://localhost:3000 --cdp 9222 --out src/bones --breakpoints 375,768,1024,1280,1440,1920 --force --no-scan
```

Add `data-no-skeleton` to decorative layers you don't want captured as bones.

## 7. Smooth scroll & fades

`src/components/scroll-effects.tsx` starts Lenis and fades every section after the first in and out. Tune `duration` / `easing` there. Wrap scrollable overlays in `data-lenis-prevent` so they keep native scrolling.

## 8. Pages & sections

| Page | File | Sections |
|---|---|---|
| Home | `src/app/page.tsx` | Hero, marquee, about, best sellers, how to order, visit us, FAQ, Instagram |
| Menu | `src/app/menu/page.tsx` | Page hero, marquee, filterable grid, FAQ, Instagram |
| Our Bakery | `src/app/our-bakery/page.tsx` | Page hero, story, process cards, CTA, Instagram |

Sections are plain components, so you can reorder or delete them freely in the page files.

## 9. Deploy

1. Push your fork to GitHub.
2. Import it at <https://vercel.com/new>. The framework is detected automatically, and no settings are needed.
3. Every push to `main` redeploys the site.

## Credits

Template by **Reivan Elsyafir Pratama**. If you use it, please keep the "Made by" line in the footer (`src/components/site-footer.tsx`).
