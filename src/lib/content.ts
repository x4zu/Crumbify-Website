import type { FaqItem, MenuItem, OpeningHours } from "@/types/bakery";

const img = (name: string) => `/images/crumbify/${name}.webp`;

export const BRAND = {
  name: "Crumbify",
  address: "Jl. Ahmad Yani No. 18, Banyuwangi, Jawa Timur",
  street: "Jl. Ahmad Yani",
  mapsUrl: "https://maps.google.com/?q=Jl.+Ahmad+Yani+No.+18,+Banyuwangi,+Jawa+Timur",
  email: "hello@crumbify.co",
  phone: "+62 333 421 018",
  instagram: "@crumbify",
} as const;

export const SOURCE_URL = "https://github.com/x4zu/Crumbify-Website";
export const AUTHOR = "Reivan Elsyafir Pratama";
export const AUTHOR_URL = "https://www.x2zu.net/";

export const NAV_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/our-bakery", label: "Our story" },
  { href: "/#order", label: "Catering" },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    slug: "seeded-sourdough",
    name: "Seeded sourdough",
    description: "Golden crust, soft crumb, sesame and pumpkin seeds.",
    price: 9.0,
    category: "Bread",
    image: img("sourdough"),
    bestSeller: true,
  },
  {
    slug: "everyday-baguette",
    name: "Everyday baguette",
    description: "Crisp crust, airy crumb. Made for butter.",
    price: 5.0,
    category: "Bread",
    image: img("baguette"),
  },
  {
    slug: "sesame-bagel",
    name: "Sesame bagel",
    description: "Boiled then baked, chewy middle, toasted sesame.",
    price: 3.5,
    category: "Bread",
    image: img("sesame-bagel"),
  },
  {
    slug: "pain-au-chocolat",
    name: "Pain au chocolat",
    description: "Flaky pastry with two dark chocolate batons.",
    price: 5.5,
    category: "Pastries",
    image: img("pain-au-chocolat"),
    bestSeller: true,
  },
  {
    slug: "butter-croissant",
    name: "Butter croissant",
    description: "Golden, flaky layers with a buttery middle.",
    price: 4.5,
    category: "Pastries",
    image: img("butter-croissant"),
    bestSeller: true,
    tag: "Fan favourite",
  },
  {
    slug: "almond-croissant",
    name: "Almond croissant",
    description: "Almond cream, toasted almonds, a sugar dusting.",
    price: 6.0,
    category: "Pastries",
    image: img("almond-croissant"),
  },
  {
    slug: "cinnamon-roll",
    name: "Cinnamon swirl",
    description: "Soft brioche swirl, brown-sugar cinnamon, vanilla glaze.",
    price: 5.0,
    category: "Pastries",
    image: img("cinnamon-roll"),
    bestSeller: true,
    tag: "New",
  },
  {
    slug: "berry-danish",
    name: "Blackcurrant danish",
    description: "Buttery pastry cradling jammy blackcurrants.",
    price: 5.5,
    category: "Pastries",
    image: img("berry-danish"),
  },
  {
    slug: "fruit-danish",
    name: "Apricot custard danish",
    description: "Vanilla custard, apricot and fresh summer berries.",
    price: 6.0,
    category: "Pastries",
    image: img("fruit-danish"),
  },
  {
    slug: "chocolate-chunk-cookie",
    name: "Chocolate chunk cookie",
    description: "Crisp edges, soft center, chunky chocolate.",
    price: 3.5,
    category: "Sweets",
    image: img("cookies"),
    bestSeller: true,
  },
  {
    slug: "muffins",
    name: "Muffin duo",
    description: "Double chocolate and blueberry, baked every morning.",
    price: 4.0,
    category: "Sweets",
    image: img("muffins"),
  },
  {
    slug: "sprinkle-donut",
    name: "Chocolate sprinkle donut",
    description: "Fluffy ring, dark chocolate glaze, rainbow sprinkles.",
    price: 3.5,
    category: "Sweets",
    image: img("chocolate-donut"),
    bestSeller: true,
  },
  {
    slug: "sugar-donuts",
    name: "Sugar ring donuts",
    description: "Pillowy, golden and rolled in fine sugar.",
    price: 3.0,
    category: "Sweets",
    image: img("sugar-donuts"),
  },
  {
    slug: "choc-chip-scones",
    name: "Choc chip scones",
    description: "Tender, crumbly and dotted with dark chocolate.",
    price: 4.0,
    category: "Sweets",
    image: img("scones"),
  },
];

export const BEST_SELLERS = MENU_ITEMS.filter((item) => item.bestSeller);

export const FAQS: FaqItem[] = [
  {
    question: "Do I need to pre-order?",
    answer:
      "Not for everyday visits — the counter is stocked fresh each morning. For catering or anything over a dozen pieces, enquire at least 48 hours ahead.",
  },
  {
    question: "Can I collect a pastry box?",
    answer:
      "Yes! Pick six or twelve of your favourites and we'll box them up. Order ahead and collect from the counter at a time that suits you.",
  },
  {
    question: "Will my favourite be available?",
    answer:
      "We bake in small batches, so popular bakes can sell out by lunch. Come early, or message us and we'll set one aside.",
  },
  {
    question: "What about dietary requirements?",
    answer:
      "Ask the team about ingredients and allergens. All of our bakes are made in a kitchen that handles gluten, dairy, eggs and nuts.",
  },
];

export const OPENING_HOURS: OpeningHours[] = [
  { days: "Tuesday–Friday", hours: "7am–3pm" },
  { days: "Saturday–Sunday", hours: "8am–2pm" },
  { days: "Monday", hours: "Closed" },
];

export const INSTAGRAM_PHOTOS = [
  { src: img("croissant-stack"), alt: "Stacked butter croissants" },
  { src: img("cinnamon-roll-split"), alt: "Cinnamon swirl pulled apart" },
  { src: img("pastry-spread"), alt: "Morning pastry spread" },
  { src: img("croissant-layers"), alt: "Croissant cross-section showing layers" },
  { src: img("sweets-spread"), alt: "Muffins, cookies, donuts and scones" },
  { src: img("pain-au-chocolat-stack"), alt: "Pain au chocolat broken open" },
] as const;

export const IMAGES = {
  heroMain: img("croissant-stack"),
  heroSide: img("cinnamon-roll"),
  heroBadge: img("chocolate-donut"),
  about: img("pastry-spread"),
  breadSpread: img("bread-spread"),
  sweetsSpread: img("sweets-spread"),
  board: img("bread-board"),
  layers: img("croissant-layers"),
  cinnamonSplit: img("cinnamon-roll-split"),
  painStack: img("pain-au-chocolat-stack"),
  fruitDanish: img("fruit-danish"),
} as const;

export const formatPrice = (price: number) => `$${price.toFixed(2)}`;
