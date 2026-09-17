import Link from "next/link";
import type { Post } from "@/lib/posts";
import { withBase } from "@/lib/site";
import { formatDate } from "@/lib/utils";

type PostCardProps = {
  post: Post;
  priority?: boolean;
};

export function PostCard({ post, priority = false }: PostCardProps) {
  return (
    <article className="group relative flex h-full overflow-hidden rounded-2xl border border-zinc-200 bg-white transition-all duration-200 hover:-translate-y-0.5 hover:border-cyan-300 hover:shadow-lg hover:shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-800 dark:hover:shadow-black/30">
      <Link
        href={post.href}
        aria-label={post.title}
        className="absolute inset-0 z-10 rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 focus-visible:ring-offset-2"
      />
      <div className="relative ml-4 aspect-video w-[34%] min-w-24 max-w-40 shrink-0 self-center overflow-hidden bg-gradient-to-br from-cyan-100 via-white to-violet-100 dark:from-cyan-950 dark:via-zinc-900 dark:to-violet-950">
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
            <span className="text-2xl font-bold text-zinc-950/15 dark:text-white/15">
              {post.title.slice(0, 1)}
            </span>
          </div>
        )}
      </div>

      <div className="flex min-w-0 flex-1 flex-col p-4">
        <h2 className="line-clamp-2 text-base font-semibold leading-6 tracking-tight text-zinc-950 transition-colors group-hover:text-cyan-700 dark:text-zinc-50 dark:group-hover:text-cyan-300">
          {post.title}
        </h2>
        <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-zinc-600 dark:text-zinc-400">
          {post.description || post.excerpt}
        </p>

        <div className="mt-auto flex items-center justify-between gap-2 pt-3">
          <div className="flex shrink-0 items-center gap-1.5 whitespace-nowrap text-[11px] text-zinc-500 dark:text-zinc-500">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime.text}</span>
          </div>

          {post.tags.length > 0 && (
            <div className="flex min-w-0 flex-1 flex-wrap justify-end gap-x-1.5 gap-y-0.5">
              {post.tags.slice(0, 2).map((tag) => (
                <Link
                  key={tag}
                  href={withBase(`/tags/${encodeURIComponent(tag)}`)}
                  className="relative z-20 truncate text-[11px] text-zinc-400 transition-colors hover:text-cyan-600 dark:text-zinc-500 dark:hover:text-cyan-300"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
