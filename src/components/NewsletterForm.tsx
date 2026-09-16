"use client";

import { useState } from "react";
import { CheckCircle2, Mail, Send } from "lucide-react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const endpoint = process.env.NEXT_PUBLIC_NEWSLETTER_ENDPOINT;

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!endpoint) {
      setStatus("error");
      return;
    }

    setStatus("loading");
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        throw new Error("Subscribe failed");
      }

      setEmail("");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="rounded-3xl border border-zinc-200 bg-gradient-to-br from-white to-zinc-50 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-zinc-950">
      <div className="mb-3 flex items-center gap-2">
        <Mail className="h-5 w-5 text-cyan-500" />
        <h2 className="font-semibold">订阅更新</h2>
      </div>
      <p className="mb-5 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
        有新文章时通过邮件通知你。默认不启用外部服务，可在部署时配置邮件订阅接口。
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3 sm:flex-row">
        <input
          type="email"
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="h-11 flex-1 rounded-full border border-zinc-200 bg-white px-4 text-sm outline-none transition-colors placeholder:text-zinc-400 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-100 dark:border-zinc-700 dark:bg-zinc-900 dark:focus:border-cyan-700 dark:focus:ring-cyan-950"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="inline-flex h-11 items-center justify-center gap-2 rounded-full bg-zinc-950 px-5 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
        >
          {status === "loading" ? "提交中…" : "订阅"}
          <Send className="h-4 w-4" />
        </button>
      </form>

      {status === "success" && (
        <p className="mt-3 flex items-center gap-1.5 text-sm text-emerald-600 dark:text-emerald-400">
          <CheckCircle2 className="h-4 w-4" />
          订阅成功，请查收确认邮件。
        </p>
      )}
      {status === "error" && (
        <p className="mt-3 text-sm text-amber-600 dark:text-amber-400">
          {endpoint ? "订阅失败，请稍后再试。" : "当前未配置订阅接口，请设置 NEXT_PUBLIC_NEWSLETTER_ENDPOINT。"}
        </p>
      )}
    </div>
  );
}
