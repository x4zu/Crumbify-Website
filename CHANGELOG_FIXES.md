# CHANGELOG_FIXES

Newest first.

### Fix #4 — Tapping "Catering" on mobile made the screen jump/zoom; "Follow the crumbs" moved on phones but not on PC

| | |
|---|---|
| Tanggal | 2026-11-08 |
| File | `src/components/scroll-effects.tsx`, `src/components/newsletter-form.tsx`, `src/app/globals.css`, `src/components/instagram-strip.tsx` |
| Masalah | (1) Tapping "Catering" (`/#order`) in the mobile menu made the page swell/jump. (2) The "Follow the crumbs" photo strip moved on phones but stood still on the user's PC. |
| Akar | (1) Two scroll handlers reacted to one tap: Lenis `anchors` and Next `<Link>` hash navigation. Both ran while the open menu had Lenis stopped (`lenis-stopped`, overflow clip on html). The newsletter input was also 15px, so iOS zooms when it gets focus. (2) Same cause as the ribbons in Fix #3: the OS reduce-motion setting stopped the strip, and only the ribbons had the `.motion-keep` exception. |
| Fix | (1) Removed Lenis `anchors`. One capture-phase click handler for same-page hash links calls `preventDefault` (so Next skips), updates the hash, waits 60 ms for the menu to close and Lenis to restart, then `scrollToHash()`. Arriving from another page (`/menu` → `/#order`) also uses `scrollToHash`. The input is 16px on mobile, plus `touch-action: manipulation` and `text-size-adjust: 100%`. (2) Added `motion-keep` to the strip. |
| Verifikasi | iPhone 13 emulation on production, tapping menu → Catering from `/` and from `/menu`: `visualViewport.scale` 1, scrollWidth 390 = viewport, landed on `#order` (top 144 px / 192 px), Lenis not stuck stopped. Strip under reduce motion: `marquee 70s infinite`. |
| Pelajaran | Use one hash-scroll handler. Never let Lenis anchors and framework routing both handle the same link. Any animated element that must look the same everywhere needs `motion-keep`. |
| Log Keyword | catering, hash, anchor, lenis anchors, zoom, ios input zoom, instagram strip, follow the crumbs, reduced-motion |
| Deploy | ✅ LIVE 2026-11-08 — eb2e75f |

### Fix #3 — Gap on the right on iPhone, laggy burger menu, desktop ribbons not moving, PageSpeed under 90

| | |
|---|---|
| Tanggal | 2026-11-08 |
| File | `src/app/our-bakery/page.tsx`, `src/components/site-header.tsx`, `src/app/globals.css`, `src/components/word-marquee.tsx`, `src/components/home/hero-bones.tsx`, `src/components/home/hero-shell.tsx`, `src/components/home/hero.tsx`, `src/app/layout.tsx` |
| Masalah | (1) On iPhone 13, zooming out showed an empty gap on the right. (2) The burger menu stuttered when opening. (3) The ribbons moved on mobile but not on the user's PC. (4) Home mobile scored 91 (LCP 3.4s), and accessibility was 96–97. (5) CLS was 0.107 on desktop /our-bakery. |
| Akar | (1) The Our Story banner combined `aspect-[21/9]` with `min-h-56`, so 224px × 21/9 forced a 539px width. (2) The menu animated `max-height` (layout) with `transition-all`, and the header used `backdrop-blur`. (3) The OS "reduce motion" setting (Windows animation effects off) made the global rule stop every animation. (4) boneyard's `<Skeleton>` renders no children on the server, so the hero only appeared after hydration. High-priority image preloads then counted as LCP dependencies in Lighthouse's simulation (observed LCP was 649ms, simulated 2.7s). The `pileSizes` regex had lost its backslashes when written through the shell, so every image got 40vw sizes. (5) Lilita One swapping in re-wrapped "Good company.". |
| Fix | (1) Banner is `aspect-[4/3] sm:aspect-[21/9]`, with no min-h. (2) The panel is absolute, animates only opacity, transform and visibility, uses a solid background on mobile, closes on Escape, and calls `lenis.stop()`. (3) A `.motion-keep` exception: ribbons loop at 70s under reduce. (4) The hero is server-rendered. `<HeroBones>` renders the bones with `renderBones` per breakpoint and fades out with CSS at 0.5s. `<Skeleton>` is only mounted when `__BONEYARD_BUILD` is set. Image preloads removed (images are eager at normal priority), regex fixed, contrast fixed. (5) `display: "block"` for Lilita One. |
| Verifikasi | Audit of 3 pages × 9 widths (320–1440) on production: 0 overflowing elements and 0 cut-off text. Lighthouse mobile: Home 91 → 94, Menu 98 → 96, Our Story 99 → 98. Desktop 97–100. A11y 96–97 → 100, BP 100, SEO 100, CLS 0.107 → 0. Ribbons under emulated reduce motion: `marquee 70s infinite`. `npm run bones` still captures 15/18 bones. |
| Pelajaran | Never pair `aspect-ratio` with `min-height` on a full-width box. When LCP is text, a `fetchPriority=high` image preload only hurts Lighthouse's simulated LCP. Write code containing regex with the Write/Edit tools, not through shell `node -e` (backslashes get lost). Users with OS reduce-motion see "animations not working". |
| Log Keyword | overflow, iphone, aspect-ratio min-h, burger, mobile menu, reduced-motion, marquee, pagespeed, lighthouse, LCP, CLS, renderBones, skeleton SSR |
| Deploy | ✅ LIVE 2026-11-08 — crumbify-website.vercel.app (de80bfe, 4e6c485, ef3ddf1, af4580b, 30eb4d0) |

### Fix #2 — Hero skeleton collapsed and bones misaligned; Lenis "not working" in tests

| | |
|---|---|
| Tanggal | 2026-11-08 |
| File | `src/components/home/hero-shell.tsx`, `src/components/home/hero.tsx`, `src/components/word-marquee.tsx`, `src/bones/hero.bones.json` |
| Masalah | (1) Before hydration the boneyard skeleton had 0 height, so the ribbons and the next section jumped to the top. (2) The first bones covered the whole hero as one solid block. (3) The bones sat about 60px below the real button and text. (4) Puppeteer showed no `html.lenis`, and the wheel scroll moved an exact 1320px. (5) The ribbons made the page 411px wide on a 390px phone. |
| Akar | (1) The Skeleton container has no intrinsic height until bones render client-side. (2) The decorative background layers (`absolute inset-0`) were captured as bones. (3) The hero sizes with `svh`, so bones captured at the CLI viewport height don't match other heights. Also, the hero shrank after loading because the reserved height was larger than the content. (4) Puppeteer's headless Chrome reports `prefers-reduced-motion: reduce`, which makes ScrollEffects intentionally skip Lenis. (5) The rotated strips use `inset-x-[-5%]`. |
| Fix | (1+3) Hero is `min-h-[100svh]`, and the shell reserves `min-h-[100svh]` while loading, so the height is identical before and after. (2) Added `data-no-skeleton` on the decor + `snapshotConfig.excludeSelectors`. (4) Not a bug: tests now use `emulateMediaFeatures([{name:"prefers-reduced-motion",value:"no-preference"}])`. (5) `overflow-x-clip` on the ribbon wrapper. |
| Verifikasi | Bones went from 23 per breakpoint (including full-cover blocks) to 18 per breakpoint, all real content. A 300ms crossfade screenshot shows the bones aligned with the content. Lenis scrollY eases 918 → 1125 → 1222 → … → 1318 over about 1s. Hero bottom equals viewport height at 1366×625, 1440×760, 1536×730, 1920×940 and 390×760. Mobile `scrollWidth` is 390. |
| Pelajaran | Run `npm run bones` again after any hero layout change. Exclude decorative layers. In headless tests, always emulate `no-preference` before judging any motion feature. |
| Log Keyword | boneyard, skeleton, bones, lenis, reduced-motion, puppeteer, svh, ribbon overflow |
| Deploy | ✅ LIVE 2026-11-08 — crumbify-website.vercel.app, commits fe44c28 + 3d9f402 (ribbons excluded from fade). Prod check: Lenis on, 6 fading sections, skeleton renders, address and nav updated |

### Fix #1 — Crumbify build: header invisible over hero, baguette crop broken, false mobile overflow

| | |
|---|---|
| Tanggal | 2026-11-08 |
| File | `src/components/site-header.tsx`, `scripts/crop-assets.mjs`, `src/app/layout.tsx`, `src/components/menu/menu-grid.tsx` |
| Masalah | (1) The cocoa logo and links were unreadable on the cocoa hero at scroll 0. (2) Rotating the baguette crop threw `extract_area: bad extract area`, and the next attempt gave a 336×152 image. (3) Mobile screenshots showed text clipped on the right. |
| Akar | (1) The header was transparent at the top but still used dark text. (2) In one sharp pipeline, `.rotate()` runs before `.extract()`. The resize also used the width from before rotation. (3) Mostly a tool artifact: headless Chrome on Windows enforces a minimum viewport of **504px**, even with `--window-size=390,…`. |
| Fix | (1) Added a `solid` state: light text + butter CTA while transparent, cocoa text once scrolled or the menu is open. (2) Extract to a buffer, rotate in a second pipeline, and size by `height` when rotated. (3) Added `overflow-x-clip` on body as a guard against the rotated marquee and offset badges. Did mobile QA inside a 390px `<iframe>` instead. Also tightened the filter pill padding on mobile. |
| Verifikasi | `npm run lint` 0 errors, `tsc --noEmit` clean, `npm run build` 6/6 static pages. Baguette is 743×336 after the fix. In the 390px iframe screenshot, all 3 pages show the hamburger and no horizontal clipping. |
| Pelajaran | Don't trust headless Chrome screenshots below 504px wide. Measure `innerWidth` or use an iframe. In sharp, crop and rotate need separate pipelines. |
| Log Keyword | crumbify, header contrast, sharp rotate extract, headless 504px, overflow-x-clip |
| Deploy | ✅ LIVE 2026-11-08 — https://crumbify-website.vercel.app (Vercel, repo x2zu/Crumbify-Website main 6f6d8ff), all 3 routes HTTP 200 |
