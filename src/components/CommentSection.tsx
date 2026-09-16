"use client";

import { useEffect, useRef } from "react";
import { MessageCircle } from "lucide-react";

type CommentSectionProps = {
  slug: string;
};

export function CommentSection({ slug }: CommentSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const repo = process.env.NEXT_PUBLIC_GISCUS_REPO;
  const repoId = process.env.NEXT_PUBLIC_GISCUS_REPO_ID;
  const category = process.env.NEXT_PUBLIC_GISCUS_CATEGORY;
  const categoryId = process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID;
  const enabled = Boolean(repo && repoId && category && categoryId);

  useEffect(() => {
    if (!enabled || !containerRef.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("data-repo", repo!);
    script.setAttribute("data-repo-id", repoId!);
    script.setAttribute("data-category", category!);
    script.setAttribute("data-category-id", categoryId!);
    script.setAttribute("data-mapping", "pathname");
    script.setAttribute("data-strict", "0");
    script.setAttribute("data-reactions-enabled", "1");
    script.setAttribute("data-emit-metadata", "0");
    script.setAttribute("data-input-position", "bottom");
    script.setAttribute("data-theme", "preferred_color_scheme");
    script.setAttribute("data-lang", "zh-CN");
    script.setAttribute("data-loading", "lazy");

    containerRef.current.appendChild(script);
  }, [enabled, repo, repoId, category, categoryId]);

  return (
    <section className="mt-12">
      <div className="mb-6 flex items-center gap-2">
        <MessageCircle className="h-5 w-5 text-cyan-500" />
        <h2 className="text-xl font-bold tracking-tight">评论</h2>
      </div>
      {enabled ? (
        <div ref={containerRef} className="min-h-32" />
      ) : (
        <div className="rounded-3xl border border-dashed border-zinc-300 bg-zinc-50 p-6 text-sm leading-6 text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900/60 dark:text-zinc-400">
          评论功能默认关闭。你可以在部署时配置 Giscus 环境变量：
          <code className="mx-1 rounded bg-zinc-200 px-1.5 py-0.5 text-xs dark:bg-zinc-800">
            NEXT_PUBLIC_GISCUS_REPO
          </code>
          等参数后启用。
        </div>
      )}
      <div className="sr-only">文章 slug：{slug}</div>
    </section>
  );
}
