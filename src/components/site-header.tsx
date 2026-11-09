"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { CloseIcon, CrumbifyMark, GithubIcon, MenuIcon } from "@/components/icons";
import { NAV_LINKS, SOURCE_URL } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  // Menu stays open only for the route it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null);
  const open = openOn === pathname;
  const solid = scrolled || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // While the mobile menu is open: pause smooth scroll and close on Escape.
  useEffect(() => {
    if (!open) return;
    window.__lenis?.stop();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenOn(null);
    window.addEventListener("keydown", onKey);
    return () => {
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-4 sm:pt-4 md:px-6">
      <div
        className={cn(
          // Only colour/shadow animate (no transition-all): cheap to paint on phones.
          "pointer-events-auto relative mx-auto flex max-w-6xl items-center justify-between gap-2 rounded-full border px-2 py-2 pl-4 transition-[background-color,border-color,box-shadow] duration-300 sm:pl-5",
          solid
            ? "border-cocoa/10 bg-milk shadow-[0_10px_30px_-12px_rgba(43,21,12,0.25)] md:bg-milk/90 md:backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <Link href="/" className={cn("flex min-w-0 items-center gap-2 transition-colors duration-300", solid ? "text-cocoa" : "text-oat")}>
          <CrumbifyMark className="size-8 shrink-0" />
          <span className="font-display text-2xl leading-none">Crumbify</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-full px-4 py-2 text-[15px] font-medium transition-colors",
                  solid ? "text-cocoa hover:bg-butter/60" : "text-oat hover:bg-oat/15",
                  active && "bg-butter text-cocoa-dark hover:bg-butter",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            title="View source on GitHub"
            className={cn(
              "grid size-11 place-items-center rounded-full transition-colors",
              solid ? "text-cocoa hover:bg-butter/60" : "text-oat hover:bg-oat/15",
            )}
          >
            <GithubIcon className="size-6" />
          </a>
          <Link
            href="/menu"
            className={cn(
              "inline-flex rounded-full px-5 py-2.5 text-[15px] font-semibold whitespace-nowrap transition-colors",
              solid ? "bg-cocoa text-oat hover:bg-cocoa-dark" : "bg-butter text-cocoa-dark hover:bg-oat",
            )}
          >
            Order now
          </Link>
        </div>

        <div className="flex shrink-0 items-center gap-1 md:hidden">
          <a
            href={SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View source on GitHub"
            className={cn("grid size-11 place-items-center rounded-full transition-colors duration-300", solid ? "text-cocoa" : "text-oat")}
          >
            <GithubIcon className="size-6" />
          </a>
          <button
            type="button"
            onClick={() => setOpenOn(open ? null : pathname)}
            className="relative grid size-11 place-items-center rounded-full bg-cocoa text-oat active:scale-95"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {/* cross-fade the two icons instead of swapping them */}
            <MenuIcon className={cn("absolute size-5 transition-[opacity,transform] duration-200", open ? "scale-50 rotate-90 opacity-0" : "opacity-100")} />
            <CloseIcon className={cn("absolute size-5 transition-[opacity,transform] duration-200", open ? "opacity-100" : "scale-50 -rotate-90 opacity-0")} />
          </button>
        </div>
      </div>

      {/* Mobile menu: positioned, animated with opacity + transform only (GPU, no layout). */}
      <div
        id="mobile-menu"
        data-lenis-prevent
        className={cn(
          "absolute inset-x-3 top-[calc(100%+0.5rem)] origin-top rounded-3xl bg-cocoa text-oat shadow-[0_24px_50px_-20px_rgba(20,8,3,0.6)] transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] will-change-transform sm:inset-x-4 md:hidden",
          open ? "pointer-events-auto visible translate-y-0 scale-100 opacity-100" : "pointer-events-none invisible -translate-y-2 scale-[0.97] opacity-0",
        )}
      >
        <nav className="flex flex-col p-3" aria-label="Mobile">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpenOn(null)}
              className={cn(
                "font-display rounded-2xl px-4 py-3 text-3xl transition-[opacity,transform] duration-300 hover:bg-white/10",
                open ? "translate-y-0 opacity-100" : "translate-y-1 opacity-0",
              )}
              style={{ transitionDelay: open ? `${60 + i * 40}ms` : "0ms" }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/menu"
            onClick={() => setOpenOn(null)}
            className="mt-2 rounded-full bg-butter px-5 py-3 text-center font-semibold text-cocoa-dark"
          >
            Order now
          </Link>
        </nav>
      </div>
    </header>
  );
}
