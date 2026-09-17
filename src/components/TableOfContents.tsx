"use client";

import { useEffect, useState } from "react";
import { ListTree } from "lucide-react";
import type { Heading } from "@/lib/posts";
import { cn } from "@/lib/utils";

type TableOfContentsProps = {
  headings: Heading[];
};

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState("");
  const visibleHeadings = headings.filter((heading) => heading.level === 2 || heading.level === 3);

  useEffect(() => {
    if (visibleHeadings.length === 0) {
      return;
    }

    const elements = visibleHeadings
      .map((heading) => document.getElementById(heading.id))
      .filter((element): element is HTMLElement => Boolean(element));

    if (elements.length === 0) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries.find((entry) => entry.isIntersecting);
        if (visibleEntry?.target.id) {
          setActiveId(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-80px 0px -70% 0px",
        threshold: [0, 0.25, 0.5, 1],
      },
    );

    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [visibleHeadings]);

  if (visibleHeadings.length === 0) {
    return null;
  }

  function scrollToHeading(id: string) {
    const element = document.getElementById(id);
    if (!element) {
      return;
    }

    const y = element.getBoundingClientRect().top + window.scrollY - 96;
    window.scrollTo({ top: y, behavior: "smooth" });
    history.replaceState(null, "", `#${id}`);
  }

  return (
    <aside className="rounded-3xl border border-zinc-200 bg-zinc-50 p-5 dark:border-zinc-800 dark:bg-zinc-900/70">
      <div className="mb-4 flex items-center gap-2 text-sm font-semibold">
        <ListTree className="h-4 w-4 text-cyan-500" />
        目录
      </div>
      <nav className="max-h-[70vh] overflow-y-auto pr-1 text-sm">
        <ul className="space-y-0.5">
          {visibleHeadings.map((heading) => (
            <li key={heading.id}>
              <button
                type="button"
                onClick={() => scrollToHeading(heading.id)}
                className={cn(
                  "w-full rounded-lg px-2.5 py-1 text-left leading-6 text-zinc-600 transition-colors hover:bg-white hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white",
                  heading.level === 3 && "pl-6 text-xs",
                  activeId === heading.id &&
                    "bg-white font-medium text-cyan-700 dark:bg-zinc-800 dark:text-cyan-300",
                )}
              >
                {heading.text}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
