import type { Metadata } from "next";
import { getPageContent } from "@/lib/posts";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";

export const metadata: Metadata = {
  title: "关于",
  description: "关于这个博客和作者。",
};

export default function AboutPage() {
  const page = getPageContent("about");

  if (!page) {
    return (
      <section className="mx-auto w-full max-w-3xl px-5 py-14">
        <h1 className="text-3xl font-bold tracking-tight">关于</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          在 content/pages/about.md 中创建关于页面。
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto w-full max-w-3xl px-5 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">About</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">{page.title}</h1>
        {page.description && (
          <p className="mt-4 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            {page.description}
          </p>
        )}
      </header>
      <MarkdownRenderer content={page.content} />
    </section>
  );
}
