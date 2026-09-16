import Link from "next/link";
import { siteConfig, withBase } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto grid w-full max-w-6xl gap-8 px-5 py-10 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <Link href={withBase("/")} className="text-lg font-semibold">
            {siteConfig.name}
          </Link>
          <p className="mt-3 max-w-sm text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {siteConfig.description}
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">导航</h3>
          <div className="mt-3 grid gap-2">
            {siteConfig.nav.slice(0, 4).map((item) => (
              <Link
                key={item.href}
                href={withBase(item.href)}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">联系与订阅</h3>
          <div className="mt-3 grid gap-2">
            {siteConfig.socials.map((item) => (
              <a
                key={item.label}
                href={item.href.startsWith("/") ? withBase(item.href) : item.href}
                target={item.href.startsWith("/") ? undefined : "_blank"}
                rel={item.href.startsWith("/") ? undefined : "noreferrer"}
                className="text-sm text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-zinc-200 py-5 dark:border-zinc-800">
        <p className="mx-auto w-full max-w-6xl px-5 text-center text-xs text-zinc-500 dark:text-zinc-500">
          © {year} {siteConfig.name}. Built with Next.js &amp; Markdown.
        </p>
      </div>
    </footer>
  );
}
