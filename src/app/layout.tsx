import type { Metadata } from "next";
import { Inter, Lilita_One } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { ScrollEffects } from "@/components/scroll-effects";
import { SiteFooter } from "@/components/site-footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display font: "block" (it is 11 KB and preloaded) so headlines never re-wrap when
// it swaps in. That swap caused CLS 0.107 on /our-bakery. Body text (Inter) keeps "swap".
const lilita = Lilita_One({
  variable: "--font-lilita",
  weight: "400",
  subsets: ["latin"],
  display: "block",
});

export const metadata: Metadata = {
  title: {
    default: "Crumbify — A little crust, a lot of joy",
    template: "%s · Crumbify",
  },
  description:
    "Crumbify is a neighborhood bakery making slow-fermented bread, buttery pastries, and reasons to stop by.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lilita.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col overflow-x-clip">
        <ScrollEffects />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
