import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const variants = {
  cocoa: "bg-cocoa text-oat hover:bg-cocoa-dark",
  butter: "bg-butter text-cocoa-dark hover:bg-[#f2bb20]",
  berry: "bg-berry text-cocoa-dark hover:bg-[#e25a7a]",
  outline: "border-2 border-current bg-transparent hover:bg-cocoa hover:text-oat hover:border-cocoa",
  oat: "bg-oat text-cocoa-dark hover:bg-milk",
} as const;

interface PillLinkProps {
  href: string;
  children: ReactNode;
  variant?: keyof typeof variants;
  className?: string;
  arrow?: boolean;
}

export function PillLink({ href, children, variant = "cocoa", className, arrow = true }: PillLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-[15px] font-semibold transition-colors duration-300",
        variants[variant],
        className,
      )}
    >
      {children}
      {arrow && (
        <span className="grid size-6 place-items-center rounded-full bg-current/0 transition-transform duration-300 group-hover:translate-x-1">
          <ArrowRightIcon className="size-4" />
        </span>
      )}
    </Link>
  );
}
