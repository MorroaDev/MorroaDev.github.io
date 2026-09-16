"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import { siteConfig, withBase } from "@/lib/site";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchDialog } from "@/components/SearchDialog";

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const isActive = (href: string) => {
    const target = withBase(href);
    return pathname === target || (target !== "/" && pathname.startsWith(`${target}/`));
  };

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-zinc-200/70 bg-white/85 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/85">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-5">
          <Link
            href={withBase("/")}
            className="group inline-flex items-center gap-2 font-semibold tracking-tight"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-zinc-950 text-sm font-bold text-white transition-transform group-hover:-rotate-6 dark:bg-white dark:text-zinc-950">
              M
            </span>
            <span>{siteConfig.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {siteConfig.nav.map((item) => (
              <Link
                key={item.href}
                href={withBase(item.href)}
                className={cn(
                  "rounded-full px-3 py-2 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50",
                  isActive(item.href) &&
                    "bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-900 dark:text-white",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setSearchOpen(true)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              aria-label="打开搜索"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileOpen((value) => !value)}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-950 md:hidden dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-white"
              aria-label="打开导航菜单"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-zinc-200 bg-white px-5 py-3 md:hidden dark:border-zinc-800 dark:bg-zinc-950">
            <nav className="grid gap-1">
              {siteConfig.nav.map((item) => (
                <Link
                  key={item.href}
                  href={withBase(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "rounded-xl px-3 py-2.5 text-sm text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900",
                    isActive(item.href) &&
                      "bg-zinc-100 font-medium text-zinc-950 dark:bg-zinc-900 dark:text-white",
                  )}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      <SearchDialog open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
