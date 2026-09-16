import type { Post } from "@/lib/posts";
import { PostCard } from "@/components/PostCard";

export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="rounded-3xl border border-dashed border-zinc-300 p-12 text-center dark:border-zinc-700">
        <p className="text-sm text-zinc-500 dark:text-zinc-400">暂时还没有文章。</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {posts.map((post, index) => (
        <PostCard key={post.slug} post={post} priority={index < 2} />
      ))}
    </div>
  );
}
