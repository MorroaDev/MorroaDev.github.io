import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { getAllTags, getPostsByTag } from "@/lib/posts";
import { withBase } from "@/lib/site";
import { PostList } from "@/components/PostList";

type TagPageProps = {
  params: Promise<{ tag: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllTags().map((tag) => ({ tag: encodeURIComponent(tag.name) }));
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  return {
    title: `标签：${decodedTag}`,
    description: `查看带有 ${decodedTag} 标签的全部文章。`,
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { tag } = await params;
  const decodedTag = decodeURIComponent(tag);
  const posts = getPostsByTag(decodedTag);

  if (posts.length === 0) {
    notFound();
  }

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14">
      <Link
        href={withBase("/tags")}
        className="mb-8 inline-flex items-center gap-1 text-sm text-zinc-500 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
      >
        <ChevronLeft className="h-4 w-4" />
        全部标签
      </Link>

      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Tag</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">#{decodedTag}</h1>
        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          共 {posts.length} 篇相关文章。
        </p>
      </header>

      <PostList posts={posts} />
    </section>
  );
}
