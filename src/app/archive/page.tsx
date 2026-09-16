import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "归档",
  description: "按年份查看全部文章。",
};

export default function ArchivePage() {
  const posts = getAllPosts();
  const grouped = new Map<string, typeof posts>();

  for (const post of posts) {
    const year = new Date(post.date).getFullYear().toString();
    grouped.set(year, [...(grouped.get(year) || []), post]);
  }

  const years = Array.from(grouped.entries()).sort(([a], [b]) => Number(b) - Number(a));

  return (
    <section className="mx-auto w-full max-w-4xl px-5 py-14">
      <header className="mb-12">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Archive</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">归档</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          按年份回看所有内容。
        </p>
      </header>

      {years.length > 0 ? (
        <div className="space-y-12">
          {years.map(([year, yearPosts]) => (
            <section key={year}>
              <div className="mb-5 flex items-center gap-2">
                <CalendarDays className="h-5 w-5 text-cyan-500" />
                <h2 className="text-2xl font-bold tracking-tight">{year}</h2>
                <span className="text-sm text-zinc-400">{yearPosts.length} 篇</span>
              </div>
              <div className="divide-y divide-zinc-200 border-y border-zinc-200 dark:divide-zinc-800 dark:border-zinc-800">
                {yearPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.href}
                    className="group grid gap-1 py-5 transition-colors sm:grid-cols-[180px_1fr] sm:gap-6"
                  >
                    <time className="text-sm text-zinc-400">
                      {formatDate(post.date)}
                    </time>
                    <div>
                      <span className="font-medium text-zinc-900 transition-colors group-hover:text-cyan-700 dark:text-zinc-100 dark:group-hover:text-cyan-300">
                        {post.title}
                      </span>
                      <span className="mt-1 block text-sm text-zinc-500 dark:text-zinc-400">
                        {post.description || post.excerpt}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">暂无归档内容。</p>
        </div>
      )}
    </section>
  );
}
