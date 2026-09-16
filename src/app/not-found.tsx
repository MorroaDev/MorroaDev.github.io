import Link from "next/link";
import { Home, Search } from "lucide-react";
import { withBase } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[65vh] w-full max-w-2xl flex-col items-center justify-center px-5 py-20 text-center">
      <p className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-7xl font-black text-transparent">
        404
      </p>
      <h1 className="mt-5 text-2xl font-bold tracking-tight">页面不存在</h1>
      <p className="mt-3 max-w-md text-zinc-600 dark:text-zinc-400">
        你访问的链接可能已失效，或文章已经被移动。
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href={withBase("/")}
          className="inline-flex h-11 items-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          <Home className="h-4 w-4" />
          返回首页
        </Link>
        <Link
          href={withBase("/blog")}
          className="inline-flex h-11 items-center gap-2 rounded-full border border-zinc-200 px-5 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
        >
          <Search className="h-4 w-4" />
          浏览文章
        </Link>
      </div>
    </section>
  );
}
