"use client";

import { useState } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkBreaks from "remark-breaks";
import rehypeHighlight from "rehype-highlight";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";
import "highlight.js/styles/github-dark-dimmed.css";

type MarkdownRendererProps = {
  content: string;
  className?: string;
};

function nodeToText(node: unknown): string {
  if (!node || typeof node !== "object") {
    return "";
  }

  const value = (node as { value?: unknown }).value;
  if (typeof value === "string") {
    return value;
  }

  const children = (node as { children?: unknown[] }).children;
  if (Array.isArray(children)) {
    return children.map((child) => nodeToText(child)).join("");
  }

  return "";
}

function CodeBlock({
  code,
  language,
  children,
}: {
  code: string;
  language: string;
  children: React.ReactNode;
}) {
  const [copied, setCopied] = useState(false);

  async function copyCode() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  }

  return (
    <figure className="my-6 overflow-hidden rounded-2xl border border-zinc-800 bg-[#22272e] shadow-lg shadow-zinc-950/5 dark:border-zinc-800">
      <figcaption className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
          {language || "text"}
        </span>
        <button
          type="button"
          onClick={copyCode}
          className="inline-flex items-center gap-1.5 rounded-lg px-2 py-1 text-xs text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5" />
              已复制
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" />
              复制
            </>
          )}
        </button>
      </figcaption>
      <pre className="overflow-x-auto p-4 text-sm leading-6">
        <code className="hljs font-mono">{children}</code>
      </pre>
    </figure>
  );
}

const markdownComponents: Components = {
  pre: ({ children }) => <>{children}</>,
  code: ({ node, className, children, ...props }) => {
    const isInline = !className?.includes("language-");

    if (isInline) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    const language = /language-([\w-]+)/.exec(className || "")?.[1] || "";
    const rawCode = nodeToText(node).replace(/\n$/, "");

    return (
      <CodeBlock code={rawCode} language={language}>
        {children}
      </CodeBlock>
    );
  },
};

export function MarkdownRenderer({ content, className }: MarkdownRendererProps) {
  return (
    <div
      className={cn(
        "prose prose-zinc max-w-none dark:prose-invert prose-headings:scroll-mt-24 prose-h2:mt-12 prose-h2:text-2xl prose-h2:font-bold prose-h2:tracking-tight prose-h3:mt-8 prose-h3:text-xl prose-h3:font-semibold prose-p:leading-8 prose-li:leading-7 prose-blockquote:border-cyan-400 prose-blockquote:text-zinc-600 dark:prose-blockquote:text-zinc-300",
        className,
      )}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkBreaks]}
        rehypePlugins={[
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["markdown-anchor"],
                ariaHidden: true,
                tabIndex: -1,
              },
              content: {
                type: "text",
                value: "#",
              },
            },
          ],
          rehypeHighlight,
        ]}
        components={markdownComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
