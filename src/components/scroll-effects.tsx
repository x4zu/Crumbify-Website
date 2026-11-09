"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";
import type Lenis from "lenis";

declare global {
  interface Window {
    __lenis?: Lenis;
    /** Set by `npx boneyard-js build` while it captures skeleton bones. */
    __BONEYARD_BUILD?: boolean;
  }
}

/**
 * Site-wide scroll feel, modelled on sundaycrumb.framer.website:
 * - Lenis smooth (inertial) scrolling. Disabled for prefers-reduced-motion.
 * - Every section below the hero fades in when it enters the viewport and fades
 *   out again when it leaves, instead of popping in.
 * - Jumps back to the top on route change, keeping Lenis in sync.
 */
const HEADER_OFFSET = 96;

function scrollToHash(hash: string, immediate: boolean) {
  const el = document.getElementById(decodeURIComponent(hash.slice(1)));
  if (!el) return;
  if (window.__lenis) {
    window.__lenis.scrollTo(el, { offset: -HEADER_OFFSET, immediate, force: true });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    window.scrollTo({ top, behavior: immediate ? "auto" : "smooth" });
  }
}

export function ScrollEffects() {
  const pathname = usePathname();

  // Lenis smooth scroll
  useEffect(() => {
    if (window.__BONEYARD_BUILD) {
      document.documentElement.classList.add("boneyard-build");
      return;
    }
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup = () => {};
    import("lenis").then(({ default: LenisCtor }) => {
      if (cancelled) return;
      const lenis = new LenisCtor({
        autoRaf: true,
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        touchMultiplier: 1.2,
        prevent: (node) => !!node.closest?.("[data-lenis-prevent]"),
      });
      window.__lenis = lenis;
      cleanup = () => {
        lenis.destroy();
        window.__lenis = undefined;
      };
    });
    return () => {
      cancelled = true;
      cleanup();
    };
  }, []);

  // New page: start at the top, or jump to the #hash target (e.g. /#order from /menu).
  useEffect(() => {
    const { hash } = window.location;
    if (hash) {
      requestAnimationFrame(() => scrollToHash(hash, true));
      return;
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true, force: true });
    else window.scrollTo(0, 0);
  }, [pathname]);

  // Same-page hash links (e.g. "Catering" -> /#order while on /): ONE scroll handler.
  // Before, Lenis anchors and Next <Link> both reacted to the same tap while the open
  // mobile menu had Lenis stopped, which made the page jump/zoom on phones.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = (e.target as Element | null)?.closest?.("a[href*='#']");
      if (!(a instanceof HTMLAnchorElement)) return;
      const url = new URL(a.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      e.preventDefault(); // Next <Link> skips navigation when the event is already handled
      history.replaceState(history.state, "", url.hash);
      // Let the mobile menu close (and Lenis restart) before scrolling.
      setTimeout(() => scrollToHash(url.hash, false), 60);
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  // Section fade in / fade out
  useEffect(() => {
    if (window.__BONEYARD_BUILD) return;
    const sections = Array.from(document.querySelectorAll<HTMLElement>("main > *:not(:first-child):not([data-no-fade])"));
    sections.forEach((el) => el.classList.add("section-fade"));

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("is-in", entry.isIntersecting);
      },
      // Shrink the viewport a little so sections fade before they touch the edges.
      { threshold: 0, rootMargin: "-8% 0px -8% 0px" },
    );
    sections.forEach((el) => observer.observe(el));
    return () => {
      observer.disconnect();
      sections.forEach((el) => el.classList.remove("section-fade", "is-in"));
    };
  }, [pathname]);

  return null;
}
