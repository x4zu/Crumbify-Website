# Changelog

All notable changes to Crumbify are documented here.
The format follows [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Bug-fix root causes and lessons are tracked separately in [CHANGELOG_FIXES.md](./CHANGELOG_FIXES.md).

## [1.3.0] - 2026-11-08

### Changed
- The hero is server-rendered again. The boneyard skeleton is now a server-rendered overlay (`<HeroBones>`, built with boneyard `renderBones`) that fades out with CSS, so it never waits for JavaScript.
- Mobile menu is a floating panel animated with opacity and transform only. It has no blur on mobile, crossfades its icons, closes on Escape and pauses Lenis while open.
- Marquee ribbons keep moving (slower) when the OS has "reduce motion" enabled.
- Lilita One uses `font-display: block` so headlines never re-wrap when the font loads.

### Fixed
- Horizontal overflow on phones: the Our Story banner was forced to 539px wide.
- Low-contrast text (step numbers, the "Closed" label, the footer wordmark).
- Hero images were requested at the wrong size.

### Performance (Lighthouse 12, production)
- Mobile: Home 94, Menu 96, Our Story 98. Desktop: 97–100.
- Accessibility 100, Best Practices 100, SEO 100 on every page. CLS 0.

## [1.2.0] - 2026-11-08

### Added
- [boneyard](https://github.com/0xGF/boneyard) skeleton loader for the hero. Bones are captured from the real layout with `npm run bones`. The skeleton shows until the fonts are ready (350 ms–1.5 s).
- [Lenis](https://github.com/darkroomengineering/lenis) smooth, inertial scrolling, like the original Sunday Crumb site. It is off under `prefers-reduced-motion`.
- Sections below the hero fade in as they enter the viewport and fade out as they leave. `<Reveal>` items now fade both ways too.
- Scalloped "cloud" CTA button (`ScallopLink`).

### Changed
- Hero is now full-bleed and fills the screen (`min-h-[100svh]`, no rounded bottom corners). The same goes for the Menu and Our Story heroes.
- "Explore the menu" sits beside the board on the table from `xl` up (button left, copy right). It is stacked under the pile on smaller screens. The hero "Our story" button was removed.
- Navigation "Our bakery" is renamed "Our story".
- Word marquee is now two crossing ribbons moving in opposite directions (left and right).
- Address is now Jl. Ahmad Yani No. 18, Banyuwangi, Jawa Timur (+62 333 421 018). Map links point there.

## [1.1.0] - 2026-11-08

### Changed
- Hero now fits one screen at 100% zoom. The headline size, pile width and spacing scale with viewport height (`svh`). Verified from 1366×625 to 1920×940 and on 390px phones.
- Removed the "Fresh out of the oven" badge above the headline.
- The footer "Made by Reivan Elsyafir Pratama" credit now links to https://www.x2zu.net/.

## [1.0.0] - 2026-11-08

### Added
- Home page: studio-style hero with an animated pastry pile on a wooden board, a word marquee, an about section with stats, a best-seller grid, how-to-order cards, visit-us with opening hours, an FAQ accordion and an Instagram photo marquee.
- Menu page: filterable grid (All / Bread / Pastries / Sweets) with item counts and "Load More".
- Our Bakery page: story, a 3-step process and a call to action.
- Shared fixed header that changes style on scroll, with a mobile menu.
- Footer with a newsletter form, a giant wordmark, a "Made by" credit and a GitHub source link.
- GitHub "view source" button in the header.
- Cocoa / butter / berry palette with Lilita One + Inter typography.
- Asset scripts: `assets:crop` (cuts photo sheets into product images) and `assets:cutout` (makes transparent hero cutouts).
- Scroll-reveal animations, with `prefers-reduced-motion` support.
- README, customization guide and MIT license.
