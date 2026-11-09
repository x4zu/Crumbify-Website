// Crops individual pastry shots out of the sprite sheets in AssetsPhotos/
// and writes optimized WebP files to public/images/crumbify/.
// Run: node scripts/crop-assets.mjs
import sharp from "sharp";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const SRC = "AssetsPhotos";
const OUT = "public/images/crumbify";
// Sprite sheets are 2752x1536; boxes below are measured on a 2000px-wide preview.
const SCALE = 2752 / 2000;

/** [file, name, x1, y1, x2, y2, rotate?] in preview coordinates */
const crops = [
  ["Assets 1.jpg", "cinnamon-roll", 95, 90, 615, 485],
  ["Assets 1.jpg", "cinnamon-roll-split", 700, 130, 1350, 470],
  ["Assets 1.jpg", "pain-au-chocolat-stack", 1425, 55, 1910, 540],
  ["Assets 1.jpg", "pain-au-chocolat", 100, 570, 715, 975],
  ["Assets 1.jpg", "fruit-danish", 1045, 570, 1900, 920],
  ["Assets 2.jpg", "butter-croissant", 80, 105, 715, 470],
  ["Assets 2.jpg", "croissant-layers", 790, 130, 1290, 460],
  ["Assets 2.jpg", "croissant-stack", 1345, 55, 1910, 560],
  ["Assets 2.jpg", "almond-croissant", 75, 560, 745, 940],
  ["Assets 2.jpg", "bread-board", 890, 635, 1895, 905],
  ["Assets 3.jpg", "pastry-spread", 10, 100, 650, 1000],
  ["Assets 3.jpg", "bread-spread", 675, 100, 1325, 1010],
  ["Assets 3.jpg", "sweets-spread", 1345, 100, 1995, 1040],
  ["Assets 3.jpg", "sourdough", 710, 110, 1090, 425],
  ["Assets 3.jpg", "baguette", 1088, 185, 1332, 725, -90],
  ["Assets 3.jpg", "sesame-bagel", 715, 690, 1262, 1005],
  ["Assets 3.jpg", "muffins", 1390, 115, 1935, 355],
  ["Assets 3.jpg", "cookies", 1380, 395, 1680, 628],
  ["Assets 3.jpg", "chocolate-donut", 1685, 535, 1920, 755],
  ["Assets 3.jpg", "sugar-donuts", 1395, 650, 1675, 900],
  ["Assets 3.jpg", "scones", 1595, 765, 1950, 1030],
  ["Assets 3.jpg", "berry-danish", 80, 650, 340, 880],
];

await mkdir(OUT, { recursive: true });

await Promise.all(
  crops.map(async ([file, name, x1, y1, x2, y2, rotate = 0]) => {
    const left = Math.round(x1 * SCALE);
    const top = Math.round(y1 * SCALE);
    const width = Math.round((x2 - x1) * SCALE);
    const height = Math.round((y2 - y1) * SCALE);
    const dest = path.join(OUT, `${name}.webp`);
    // Two pipelines: sharp would otherwise rotate before extracting.
    const cropped = await sharp(path.join(SRC, file)).extract({ left, top, width, height }).toBuffer();
    await sharp(cropped)
      .rotate(rotate) // top-down shots can be turned to landscape for 4:3 cards
      .resize({ width: Math.min(rotate % 180 ? height : width, 1200), withoutEnlargement: true })
      .webp({ quality: 82 })
      .toFile(dest);
    console.log(`ok ${dest} (${width}x${height})`);
  }),
);
