import type { Metadata } from "next";
import { getAllTags } from "@/lib/posts";
import { TagBadge } from "@/components/TagBadge";

export const metadata: Metadata = {
  title: "标签",
  description: "按主题浏览所有文章标签。",
};

export default function TagsPage() {
  const tags = getAllTags();

  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Tags</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">标签</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          通过标签快速找到你感兴趣的主题。
        </p>
      </header>

      {tags.length > 0 ? (
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <TagBadge key={tag.name} tag={tag.name} count={tag.count} large />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">暂无标签。</p>
        </div>
      )}
    </section>
  );
}
