import Link from "next/link";
import { withBase } from "@/lib/site";
import { cn } from "@/lib/utils";

type TagBadgeProps = {
  tag: string;
  count?: number;
  large?: boolean;
  className?: string;
};

export function TagBadge({ tag, count, large = false, className }: TagBadgeProps) {
  return (
    <Link
      href={withBase(`/tags/${encodeURIComponent(tag)}`)}
      className={cn(
        "inline-flex items-center rounded-full border border-zinc-200 bg-white text-zinc-600 transition-colors hover:border-cyan-300 hover:bg-cyan-50 hover:text-cyan-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-cyan-800 dark:hover:bg-cyan-950 dark:hover:text-cyan-300",
        large ? "px-4 py-2 text-sm" : "px-2.5 py-1 text-xs",
        className,
      )}
    >
      #{tag}
      {typeof count === "number" && (
        <span className="ml-1.5 text-zinc-400 dark:text-zinc-500">{count}</span>
      )}
    </Link>
  );
}
