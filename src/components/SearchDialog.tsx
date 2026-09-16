"use client";

import Fuse from "fuse.js";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { FileText, Search, X } from "lucide-react";
import { withBase } from "@/lib/site";
import { formatDateShort } from "@/lib/utils";

type SearchItem = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  date: string;
  content: string;
  href: string;
};

type SearchDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function SearchDialog({ open, onClose }: SearchDialogProps) {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const frame = requestAnimationFrame(() => {
      setQuery("");
      inputRef.current?.focus();
    });

    async function loadIndex() {
      try {
        const response = await fetch(withBase("/search-index.json"));
        if (!response.ok) {
          throw new Error("Failed to load search index");
        }
        setItems(await response.json());
      } catch {
        setItems([]);
      }
    }

    void loadIndex();

    return () => cancelAnimationFrame(frame);
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }

      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        onClose();
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const fuse = useMemo(
    () =>
      new Fuse(items, {
        keys: [
          { name: "title", weight: 0.45 },
          { name: "description", weight: 0.25 },
          { name: "tags", weight: 0.2 },
          { name: "content", weight: 0.1 },
        ],
        threshold: 0.38,
        ignoreLocation: true,
        minMatchCharLength: 1,
      }),
    [items],
  );

  const results = query.trim()
    ? fuse.search(query.trim()).slice(0, 10).map((result) => result.item)
    : items.slice(0, 6);

  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-zinc-950/55 px-4 pt-[12vh] backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-label="搜索文章"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl overflow-hidden rounded-3xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-950/20 dark:border-zinc-800 dark:bg-zinc-900 dark:shadow-black/40"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex items-center gap-3 border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <Search className="h-5 w-5 text-zinc-400" />
          <input
            ref={inputRef}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="搜索文章标题、标签或正文…"
            className="flex-1 bg-transparent text-base text-zinc-900 outline-none placeholder:text-zinc-400 dark:text-zinc-100"
          />
          <button
            type="button"
            onClick={onClose}
            className="rounded-full bg-zinc-100 p-1.5 text-zinc-500 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700"
            aria-label="关闭搜索"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="px-4 py-12 text-center">
              <FileText className="mx-auto h-8 w-8 text-zinc-300 dark:text-zinc-700" />
              <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                {query.trim() ? "没有找到匹配的文章" : "输入关键词开始搜索"}
              </p>
            </div>
          ) : (
            results.map((item) => (
              <Link
                key={item.slug}
                href={item.href}
                onClick={onClose}
                className="group flex flex-col gap-2 rounded-2xl px-4 py-3 transition-colors hover:bg-zinc-100 dark:hover:bg-zinc-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="font-medium text-zinc-900 group-hover:text-cyan-700 dark:text-zinc-100 dark:group-hover:text-cyan-300">
                    {item.title}
                  </span>
                  <time className="shrink-0 text-xs text-zinc-400">
                    {formatDateShort(item.date)}
                  </time>
                </div>
                {item.description && (
                  <span className="line-clamp-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                    {item.description}
                  </span>
                )}
                <span className="flex flex-wrap gap-1.5">
                  {item.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400"
                    >
                      #{tag}
                    </span>
                  ))}
                </span>
              </Link>
            ))
          )}
        </div>

        <div className="border-t border-zinc-200 px-5 py-3 text-xs text-zinc-400 dark:border-zinc-800">
          按 <kbd className="rounded bg-zinc-100 px-1.5 py-0.5 dark:bg-zinc-800">Esc</kbd> 关闭
        </div>
      </div>
    </div>
  );
}
