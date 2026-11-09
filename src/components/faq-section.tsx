"use client";

import { useState } from "react";
import { PillLink } from "@/components/pill-link";
import { PlusIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { FAQS } from "@/lib/content";
import { cn } from "@/lib/utils";

export function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="px-4 py-24 md:px-6">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[0.9fr_1.1fr]">
        <Reveal className="md:sticky md:top-32 md:self-start">
          <span className="inline-block rounded-full bg-berry-soft px-4 py-1.5 text-sm font-semibold text-cocoa">FAQ</span>
          <h2 className="mt-5 text-5xl leading-[0.95] text-cocoa md:text-6xl">A few things you knead to know.</h2>
          <p className="mt-5 max-w-sm text-lg text-cocoa-soft">Still curious? We&apos;re always happy to chat over the counter.</p>
          <PillLink href="mailto:hello@crumbify.co" className="mt-8">
            Get in touch
          </PillLink>
        </Reveal>

        <ul className="space-y-3">
          {FAQS.map((faq, index) => {
            const isOpen = open === index;
            return (
              <li key={faq.question}>
                <Reveal delay={index * 80}>
                  <div
                    className={cn(
                      "overflow-hidden rounded-3xl transition-colors duration-300",
                      isOpen ? "bg-cocoa text-oat" : "bg-milk text-cocoa hover:bg-butter-soft",
                    )}
                  >
                    <button
                      type="button"
                      onClick={() => setOpen(isOpen ? null : index)}
                      aria-expanded={isOpen}
                      className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left md:px-8 md:py-6"
                    >
                      <span className="font-display text-2xl md:text-[28px]">{faq.question}</span>
                      <span
                        className={cn(
                          "grid size-10 shrink-0 place-items-center rounded-full transition-all duration-300",
                          isOpen ? "rotate-45 bg-butter text-cocoa-dark" : "bg-cocoa text-oat",
                        )}
                      >
                        <PlusIcon className="size-5" />
                      </span>
                    </button>
                    <div
                      className={cn(
                        "grid transition-[grid-template-rows] duration-500 ease-out",
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <p className="overflow-hidden px-6 text-lg leading-relaxed text-oat/80 md:px-8">
                        <span className="block pb-7">{faq.answer}</span>
                      </p>
                    </div>
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
