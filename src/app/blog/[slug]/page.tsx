import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  CalendarDays,
  Clock3,
  Home,
  Tag,
  UserRound,
} from "lucide-react";
import {
  getPostBySlug,
  getPostSlugs,
  getRelatedPosts,
} from "@/lib/posts";
import { absoluteUrl, withBase } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { MarkdownRenderer } from "@/components/MarkdownRenderer";
import { TableOfContents } from "@/components/TableOfContents";
import { ReadingProgress } from "@/components/ReadingProgress";
import { PostList } from "@/components/PostList";
import { CommentSection } from "@/components/CommentSection";
import { TagBadge } from "@/components/TagBadge";

type PostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return getPostSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      title: "文章不存在",
    };
  }

  const url = absoluteUrl(post.href);

  return {
    title: post.title,
    description: post.description || post.excerpt,
    authors: [{ name: post.author }],
    alternates: {
      canonical: url,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description || post.excerpt,
      url,
      publishedTime: post.date,
      modifiedTime: post.updated || post.date,
      tags: post.tags,
      authors: [post.author],
    },
    twitter: {
      card: "summary",
      title: post.title,
      description: post.description || post.excerpt,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description || post.excerpt,
    datePublished: post.date,
    dateModified: post.updated || post.date,
    author: {
      "@type": "Person",
      name: post.author,
    },
    keywords: post.tags.join(", "),
    mainEntityOfPage: absoluteUrl(post.href),
  };

  return (
    <>
      <ReadingProgress />
      <article className="mx-auto w-full max-w-6xl px-5 py-12 lg:py-16">
        <header className="mx-auto max-w-3xl">
          <Link
            href={withBase("/blog")}
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
          >
            <Home className="h-4 w-4" />
            返回博客
          </Link>

          <div className="mb-5 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </div>

          <h1 className="text-3xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-4xl md:text-5xl dark:text-white">
            {post.title}
          </h1>

          {post.description && (
            <p className="mt-5 text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {post.description}
            </p>
          )}

          <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-zinc-200 py-4 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1.5">
              <UserRound className="h-4 w-4" />
              {post.author}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays className="h-4 w-4" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock3 className="h-4 w-4" />
              {post.readingTime.text}
            </span>
            {post.updated && post.updated !== post.date && (
              <span className="inline-flex items-center gap-1.5">
                更新于 {formatDate(post.updated)}
              </span>
            )}
          </div>
        </header>

        <div className="mx-auto mt-10 grid max-w-6xl gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
          <div className="min-w-0">
            <MarkdownRenderer content={post.content} />

            <div className="mt-10 flex items-center gap-2 border-t border-zinc-200 pt-6 text-sm text-zinc-500 dark:border-zinc-800 dark:text-zinc-400">
              <Tag className="h-4 w-4" />
              标签：
              <span className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <TagBadge key={tag} tag={tag} />
                ))}
              </span>
            </div>

            <CommentSection slug={post.slug} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <TableOfContents headings={post.headings} />
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mx-auto mt-16 max-w-6xl">
            <div className="mb-6">
              <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Related</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">相关文章</h2>
            </div>
            <PostList posts={relatedPosts} />
          </section>
        )}
      </article>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
    </>
  );
}
