import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { withBase } from "@/lib/site";
import { cn } from "@/lib/utils";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  basePath?: string;
};

function pageHref(page: number, basePath: string) {
  return page === 1 ? basePath : `${basePath}/page/${page}`;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath = "/blog",
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav className="mt-10 flex items-center justify-center gap-2" aria-label="分页">
      {currentPage > 1 ? (
        <Link
          href={withBase(pageHref(currentPage - 1, basePath))}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-zinc-200 px-4 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          <ChevronLeft className="h-4 w-4" />
          上一页
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 rounded-full border border-zinc-200 px-4 text-sm text-zinc-300 dark:border-zinc-800 dark:text-zinc-700">
          <ChevronLeft className="h-4 w-4" />
          上一页
        </span>
      )}

      {pages.map((page) => (
        <Link
          key={page}
          href={withBase(pageHref(page, basePath))}
          className={cn(
            "inline-flex h-10 w-10 items-center justify-center rounded-full border text-sm transition-colors",
            page === currentPage
              ? "border-zinc-950 bg-zinc-950 font-medium text-white dark:border-white dark:bg-white dark:text-zinc-950"
              : "border-zinc-200 text-zinc-600 hover:bg-zinc-100 dark:border-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-900",
          )}
        >
          {page}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={withBase(pageHref(currentPage + 1, basePath))}
          className="inline-flex h-10 items-center gap-1 rounded-full border border-zinc-200 px-4 text-sm transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-900"
        >
          下一页
          <ChevronRight className="h-4 w-4" />
        </Link>
      ) : (
        <span className="inline-flex h-10 items-center gap-1 rounded-full border border-zinc-200 px-4 text-sm text-zinc-300 dark:border-zinc-800 dark:text-zinc-700">
          下一页
          <ChevronRight className="h-4 w-4" />
        </span>
      )}
    </nav>
  );
}
