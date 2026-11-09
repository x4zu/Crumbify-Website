// Cuts pastries out of the white-background sprite sheets in AssetsPhotos/
// so they can be stacked on a coloured hero scene.
// Writes transparent WebP files to public/images/crumbify/cutouts/.
// Run: node scripts/cutout-assets.mjs
//
// Method:
// 1. Flood-fill from the crop border over pale, low-saturation pixels. That region is
//    the background (including the soft drop shadows).
// 2. Pixels outside the flood stay opaque (the pastry).
// 3. Background pixels and a 2px edge band go through "colour to alpha" against the
//    sampled background colour. Shadows survive as translucent darkness, and edge
//    pixels lose their white fringe.
// Light, low-saturation pastries that touch the background (glazed cinnamon roll,
// sugar donuts) leak into the flood. Do not add them here.
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "AssetsPhotos";
const OUT = "public/images/crumbify/cutouts";
const SCALE = 2752 / 2000; // boxes are measured on a 2000px-wide preview

/** [file, name, x1, y1, x2, y2] */
const cutouts = [
  ["Assets 2.jpg", "board", 885, 630, 1900, 915],
  ["Assets 2.jpg", "croissant-stack", 1340, 50, 1915, 565],
  ["Assets 2.jpg", "croissant", 75, 100, 720, 475],
  ["Assets 2.jpg", "croissant-half", 785, 125, 1295, 465],
  ["Assets 1.jpg", "pain-au-chocolat", 95, 565, 720, 980],
  ["Assets 1.jpg", "pain-stack", 1420, 50, 1915, 545],
  ["Assets 1.jpg", "fruit-danish", 1040, 565, 1905, 925],
  ["Assets 3.jpg", "chocolate-donut", 1680, 530, 1925, 760],
  ["Assets 3.jpg", "berry-danish", 80, 650, 345, 885],
  ["Assets 2.jpg", "crumb-1", 590, 935, 765, 1035],
  ["Assets 2.jpg", "crumb-2", 835, 940, 1005, 1035],
  ["Assets 2.jpg", "crumb-3", 1115, 965, 1255, 1040],
  ["Assets 2.jpg", "crumb-4", 1360, 950, 1475, 1035],
];

const PALE_MIN = 150; // min channel above this = pale
const GREY_SAT = 45; // max - min below this = unsaturated
const SHADOW_MIN = 85; // contact shadows: darker but almost colourless
const SHADOW_SAT = 20;
const EDGE_BAND = 2;
const NOISE = 0.07;
const MIN_ISLAND = 0.04; // islands smaller than 4% of the main piece are dropped
const SHADOW = [28, 12, 6];

function cutout(data, w, h, ch) {
  const n = w * h;
  const isBgCandidate = (i) => {
    const r = data[i * ch];
    const g = data[i * ch + 1];
    const b = data[i * ch + 2];
    const mn = Math.min(r, g, b);
    const sat = Math.max(r, g, b) - mn;
    // pale background, or a neutral mid-grey contact shadow
    return (mn >= PALE_MIN && sat <= GREY_SAT) || (mn >= SHADOW_MIN && sat <= SHADOW_SAT);
  };

  // 1. flood fill from the border
  const bg = new Uint8Array(n);
  const stack = [];
  const push = (i) => {
    if (!bg[i] && isBgCandidate(i)) {
      bg[i] = 1;
      stack.push(i);
    }
  };
  for (let x = 0; x < w; x++) {
    push(x);
    push((h - 1) * w + x);
  }
  for (let y = 0; y < h; y++) {
    push(y * w);
    push(y * w + w - 1);
  }
  while (stack.length) {
    const i = stack.pop();
    const x = i % w;
    if (x > 0) push(i - 1);
    if (x < w - 1) push(i + 1);
    if (i >= w) push(i - w);
    if (i < n - w) push(i + w);
  }

  // drop small foreground islands (stray crumbs cut by the crop box)
  const label = new Int32Array(n).fill(-1);
  const sizes = [];
  for (let i = 0; i < n; i++) {
    if (bg[i] || label[i] !== -1) continue;
    const id = sizes.length;
    let size = 0;
    const q = [i];
    label[i] = id;
    while (q.length) {
      const j = q.pop();
      size++;
      const x = j % w;
      for (const k of [x > 0 ? j - 1 : -1, x < w - 1 ? j + 1 : -1, j >= w ? j - w : -1, j < n - w ? j + w : -1]) {
        if (k >= 0 && !bg[k] && label[k] === -1) {
          label[k] = id;
          q.push(k);
        }
      }
    }
    sizes.push(size);
  }
  const keepMin = Math.max(...sizes, 0) * MIN_ISLAND;
  const drop = (i) => label[i] !== -1 && sizes[label[i]] < keepMin;

  // reference background colour = average of the brightest border pixels
  const border = [];
  for (let x = 0; x < w; x += 2) border.push(x, (h - 1) * w + x);
  for (let y = 0; y < h; y += 2) border.push(y * w, y * w + w - 1);
  const lum = (i) => data[i * ch] + data[i * ch + 1] + data[i * ch + 2];
  border.sort((a, b) => lum(b) - lum(a));
  const top = border.slice(0, Math.max(10, Math.floor(border.length * 0.3)));
  const ref = [0, 1, 2].map((c) => top.reduce((s, i) => s + data[i * ch + c], 0) / top.length);

  // 2. edge band: foreground pixels within EDGE_BAND of the background
  let edge = bg.slice();
  for (let pass = 0; pass < EDGE_BAND; pass++) {
    const next = edge.slice();
    for (let i = 0; i < n; i++) {
      if (edge[i]) continue;
      const x = i % w;
      if ((x > 0 && edge[i - 1]) || (x < w - 1 && edge[i + 1]) || (i >= w && edge[i - w]) || (i < n - w && edge[i + w])) next[i] = 1;
    }
    edge = next;
  }

  // 3. colour to alpha
  const out = Buffer.alloc(n * 4);
  for (let i = 0; i < n; i++) {
    const p = [data[i * ch], data[i * ch + 1], data[i * ch + 2]];
    if (drop(i)) {
      out.set([0, 0, 0, 0], i * 4);
      continue;
    }
    if (!edge[i]) {
      out.set([...p, 255], i * 4);
      continue;
    }
    let a = 0;
    for (let c = 0; c < 3; c++) a = Math.max(a, (ref[c] - p[c]) / ref[c]);
    if (!bg[i]) a = Math.max(a, 0.55); // edge pixels belong to the pastry: keep them solid-ish
    if (a < NOISE) {
      out.set([0, 0, 0, 0], i * 4);
      continue;
    }
    a = Math.min(1, a);
    // Flood pixels are shadow: paint them warm-dark so they read as shadow on any colour.
    if (bg[i]) {
      out.set([...SHADOW, Math.round(Math.min(1, a * 1.6) * 200)], i * 4);
      continue;
    }
    const col = p.map((v, c) => Math.max(0, Math.min(255, Math.round((v - ref[c] * (1 - a)) / a))));
    out.set([...col, Math.round(a * 255)], i * 4);
  }
  return out;
}

await mkdir(OUT, { recursive: true });

for (const [file, name, x1, y1, x2, y2] of cutouts) {
  const left = Math.round(x1 * SCALE);
  const top = Math.round(y1 * SCALE);
  const width = Math.round((x2 - x1) * SCALE);
  const height = Math.round((y2 - y1) * SCALE);
  const { data, info } = await sharp(path.join(SRC, file))
    .extract({ left, top, width, height })
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  const rgba = cutout(data, info.width, info.height, info.channels);
  const dest = path.join(OUT, `${name}.webp`);
  const trimmed = await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
    .png()
    .toBuffer();
  await sharp(trimmed)
    .trim({ threshold: 1 })
    .resize({ width: 1100, withoutEnlargement: true })
    .webp({ quality: 85, alphaQuality: 90 })
    .toFile(dest);
  console.log(`ok ${dest}`);
}
