export type MenuCategory = "Bread" | "Pastries" | "Sweets";

export interface MenuItem {
  slug: string;
  name: string;
  description: string;
  price: number;
  category: MenuCategory;
  image: string;
  bestSeller?: boolean;
  tag?: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface OpeningHours {
  days: string;
  hours: string;
}
