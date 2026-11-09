import Link from "next/link";
import { CrumbifyMark, GithubIcon } from "@/components/icons";
import { NewsletterForm } from "@/components/newsletter-form";
import { AUTHOR, AUTHOR_URL, BRAND, SOURCE_URL } from "@/lib/content";

const columns = [
  {
    title: "Navigation",
    links: [
      { label: "Our Story", href: "/our-bakery" },
      { label: "Catering", href: "/#order" },
      { label: "Menu", href: "/menu" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Email", href: `mailto:${BRAND.email}` },
      { label: "Phone", href: `tel:${BRAND.phone.replace(/[^+\d]/g, "")}` },
      { label: "Whatsapp", href: "#" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-cocoa-dark text-oat">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 pt-20 pb-10 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div className="max-w-sm">
          <Link href="/" className="flex items-center gap-2">
            <CrumbifyMark className="size-9" />
            <span className="font-display text-3xl">Crumbify</span>
          </Link>
          <h3 className="mt-8 text-3xl text-butter">Sign up for a little joy.</h3>
          <p className="mt-2 text-sm text-oat/70">New bakes, seasonal specials and the odd free cookie.</p>
          <NewsletterForm />
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <p className="text-xs font-semibold tracking-[0.18em] text-butter uppercase">{col.title}</p>
            <ul className="mt-5 space-y-3">
              {col.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-[17px] text-oat/85 transition-colors hover:text-butter">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <p className="text-xs font-semibold tracking-[0.18em] text-butter uppercase">Visit Us</p>
          <ul className="mt-5 space-y-3 text-[17px] text-oat/85">
            <li>{BRAND.address}</li>
            <li>Tue–Fri 7am–3pm</li>
            <li>Sat–Sun 8am–2pm</li>
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        data-wordmark="Crumbify"
        className="font-display pointer-events-none -mb-[0.22em] text-center text-[25vw] leading-none text-cocoa select-none before:content-[attr(data-wordmark)]"
      />

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-6 text-sm text-oat/60 md:flex-row md:items-center md:justify-between">
          <p>
            © 2026 Crumbify Bakery · Made by{" "}
            <a
              href={AUTHOR_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-butter underline-offset-4 transition-colors hover:text-berry hover:underline"
            >
              {AUTHOR}
            </a>
          </p>
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 self-start rounded-full bg-white/10 px-4 py-2 font-medium text-oat transition-colors hover:bg-butter hover:text-cocoa-dark md:self-auto"
          >
            <GithubIcon className="size-4" />
            Get the source on GitHub
          </a>
          <p>
            <Link href="#" className="hover:text-butter">Privacy Policy</Link>
            <span className="mx-2">·</span>
            <Link href="#" className="hover:text-butter">Terms &amp; Conditions</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
