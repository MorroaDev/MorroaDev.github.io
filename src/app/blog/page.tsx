import type { Metadata } from "next";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { Pagination } from "@/components/Pagination";

export const metadata: Metadata = {
  title: "博客",
  description: "浏览所有 Markdown 文章、技术笔记与生活记录。",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));
  const currentPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Blog</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">博客</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          共 {posts.length} 篇文章。这里记录技术、产品与日常思考。
        </p>
      </header>

      <PostList posts={currentPosts} />
      <Pagination currentPage={1} totalPages={totalPages} basePath="/blog" />
    </section>
  );
}
