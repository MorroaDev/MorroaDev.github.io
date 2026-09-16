import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, POSTS_PER_PAGE } from "@/lib/posts";
import { PostList } from "@/components/PostList";
import { Pagination } from "@/components/Pagination";

type BlogPageProps = {
  params: Promise<{ page: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const totalPages = Math.max(
    1,
    Math.ceil(getAllPosts().length / POSTS_PER_PAGE),
  );

  return Array.from({ length: totalPages }, (_, index) => ({
    page: String(index + 1),
  }));
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
  const { page } = await params;
  return {
    title: `博客 · 第 ${page} 页`,
  };
}

export default async function BlogPageNumber({ params }: BlogPageProps) {
  const { page } = await params;
  const pageNumber = Number(page);
  const posts = getAllPosts();
  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE));

  if (!Number.isInteger(pageNumber) || pageNumber < 1 || pageNumber > totalPages) {
    notFound();
  }

  const start = (pageNumber - 1) * POSTS_PER_PAGE;
  const currentPosts = posts.slice(start, start + POSTS_PER_PAGE);

  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Blog</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">
          博客 · 第 {pageNumber} 页
        </h1>
      </header>

      <PostList posts={currentPosts} />
      <Pagination currentPage={pageNumber} totalPages={totalPages} basePath="/blog" />
    </section>
  );
}
