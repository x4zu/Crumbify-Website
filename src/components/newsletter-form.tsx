"use client";

import { useState, type FormEvent } from "react";

export function NewsletterForm() {
  const [done, setDone] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setDone(true);
  };

  if (done) {
    return <p className="mt-6 rounded-full bg-butter px-5 py-3 font-semibold text-cocoa-dark">Thanks! A little joy is on its way.</p>;
  }

  return (
    <form onSubmit={onSubmit} className="mt-6 flex rounded-full bg-white/10 p-1.5 focus-within:ring-2 focus-within:ring-butter">
      <label htmlFor="newsletter-email" className="sr-only">
        Email address
      </label>
      <input
        id="newsletter-email"
        type="email"
        required
        placeholder="Email address"
        className="min-w-0 flex-1 bg-transparent px-4 text-base text-oat md:text-[15px] placeholder:text-oat/50 focus:outline-none"
      />
      <button
        type="submit"
        className="rounded-full bg-butter px-5 py-2.5 text-xs font-bold tracking-widest text-cocoa-dark transition-colors hover:bg-berry"
      >
        SIGN UP
      </button>
    </form>
  );
}
