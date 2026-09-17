import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import type { Post } from "@/lib/posts";
import { withBase } from "@/lib/site";
import { formatDate } from "@/lib/utils";
import { TagBadge } from "@/components/TagBadge";

type PostCardProps = {
  post: Post;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-800 dark:hover:shadow-black/30">
      <Link
        href={post.href}
        aria-label={post.title}
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
      />
      <div className="flex h-full flex-col">
        <div className="relative aspect-[16/9] overflow-hidden bg-gradient-to-br from-cyan-100 via-white to-violet-100 dark:from-cyan-950 dark:via-zinc-900 dark:to-violet-950">
          {post.cover ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={withBase(post.cover)}
              alt={post.title}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <span className="text-5xl font-bold text-zinc-950/20 dark:text-white/20">
                {post.title.slice(0, 1)}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3 flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="inline-flex items-center gap-1">
              <CalendarDays className="h-3.5 w-3.5" />
              {formatDate(post.date)}
            </span>
            <span className="inline-flex items-center gap-1">
              <Clock3 className="h-3.5 w-3.5" />
              {post.readingTime.text}
            </span>
          </div>

          <h2 className="line-clamp-2 text-lg font-semibold leading-7 tracking-tight text-zinc-950 transition-colors group-hover:text-cyan-700 dark:text-zinc-50 dark:group-hover:text-cyan-300">
            {post.title}
          </h2>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            {post.description || post.excerpt}
          </p>

          <div className="mt-auto flex items-end justify-between gap-4 pt-5">
            <div className="flex flex-wrap gap-1.5">
              {post.tags.slice(0, 3).map((tag) => (
                <span key={tag} className="relative z-20">
                  <TagBadge tag={tag} />
                </span>
              ))}
            </div>
            <ArrowUpRight className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-cyan-500 dark:text-zinc-700" />
          </div>
        </div>
      </div>
    </article>
  );
}
