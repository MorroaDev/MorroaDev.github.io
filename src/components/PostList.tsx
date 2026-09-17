import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";
import { cn } from "@/lib/utils";

type PostListProps = {
  posts: Post[];
  columns?: 2 | 3;
};

export function PostList({ posts, columns = 3 }: PostListProps) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">暂时还没有文章。</p>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "grid gap-5 sm:grid-cols-2",
        columns === 3 && "xl:grid-cols-3",
      )}
    >
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} priority={index < 2} />
      ))}
    </div>
  );
}
