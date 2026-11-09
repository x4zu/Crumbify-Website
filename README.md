<div align="center">

# 🥐 Crumbify — Bakery Website Template

**A little crust, a lot of joy.**

A warm, modern, fully responsive bakery website built with **Next.js 16**, **React 19** and **Tailwind CSS v4**.
Free to use for your own bakery, café or portfolio.

[Live demo](https://crumbify-website.vercel.app) · [Guide](./GUIDE.md) · [Changelog](./CHANGELOG.md)

<sub>Made by **[Reivan Elsyafir Pratama](https://www.x2zu.net/)**</sub>

</div>

---

## Features

- **3 pages**: Home, Menu and Our Bakery
- **Studio-style hero**: a pastry pile that drops onto a wooden board in front of a giant headline
- **Filterable menu** with categories, counts and "Load More"
- **FAQ accordion**, an Instagram-style photo marquee and a newsletter form
- **Lenis smooth scrolling**, plus sections that fade in and out as you scroll
- **boneyard skeleton** loading state for the hero, captured from the real layout
- A header that adapts to the scroll position, and crossing marquee ribbons
- **Responsive** from 390px phones to wide desktops, and honours `prefers-reduced-motion`
- **All content in one file** (`src/lib/content.ts`), so it is easy to rebrand
- **Static output**: every page is pre-rendered, which makes it fast and cheap to host

## Tech stack

| | |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router) + React 19 |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4, [tw-animate-css](https://github.com/Wombosvideo/tw-animate-css) |
| Fonts | Lilita One + Inter via `next/font` |
| Images | `next/image`, WebP assets processed with [sharp](https://sharp.pixelplumbing.com) |
| Hosting | [Vercel](https://vercel.com) |

## Quick start

```bash
git clone https://github.com/x4zu/Crumbify-Website.git
cd Crumbify-Website
npm install
npm run dev
```

Open <http://localhost:3000>.

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run start` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run check` | Lint + typecheck + build |
| `npm run assets:crop` | Re-crop menu photos from `AssetsPhotos/` |
| `npm run assets:cutout` | Re-generate transparent hero cutouts |
| `npm run bones` | Re-capture hero skeleton bones (needs `npm run dev` running) |

## Project structure

```
src/
  app/               # routes: / , /menu , /our-bakery
  components/
    home/            # home page sections (hero, best sellers, …)
    menu/            # filterable menu grid
    ...              # shared: header, footer, FAQ, product card, …
  lib/content.ts     # ← brand name, menu items, FAQ, hours, links
  types/             # TypeScript types
public/images/crumbify/   # processed photos (+ /cutouts for the hero)
AssetsPhotos/             # original photo sheets
scripts/                  # asset processing scripts
```

## Make it yours

See **[GUIDE.md](./GUIDE.md)** for how to change the name, colors, menu, photos and the hero pile.

## Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/x4zu/Crumbify-Website)

Or deploy it to any host that supports Next.js.

## License

[MIT](./LICENSE). Use it, remix it, ship it. Please keep the credit line in the footer. 💛

<div align="center"><sub>Made with ☕ and butter by <a href="https://www.x2zu.net/"><b>Reivan Elsyafir Pratama</b></a></sub></div>
