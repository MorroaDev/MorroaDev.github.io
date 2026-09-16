import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight, GitFork } from "lucide-react";
import { projects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "项目",
  description: "我正在构建、维护或曾经完成的项目。",
};

const statusStyles = {
  "进行中": "bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300",
  "维护中": "bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
  "已归档": "bg-zinc-100 text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400",
};

export default function ProjectsPage() {
  return (
    <section className="mx-auto w-full max-w-5xl px-5 py-14">
      <header className="mb-10">
        <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Projects</p>
        <h1 className="mt-1 text-3xl font-bold tracking-tight sm:text-4xl">项目</h1>
        <p className="mt-4 max-w-2xl text-zinc-600 dark:text-zinc-400">
          一些开源项目、实验和长期维护的个人作品。
        </p>
      </header>

      <div className="grid gap-5 md:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.name}
            className="flex flex-col rounded-3xl border border-zinc-200 bg-white p-6 transition-all hover:-translate-y-1 hover:border-cyan-300 hover:shadow-xl hover:shadow-zinc-200/70 dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-cyan-800 dark:hover:shadow-black/30"
          >
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold tracking-tight">{project.name}</h2>
                <p className="mt-1 text-xs text-zinc-400">
                  {project.year} ·{" "}
                  <span className={`rounded-full px-2 py-0.5 ${statusStyles[project.status]}`}>
                    {project.status}
                  </span>
                </p>
              </div>
              {project.repository && (
                <a
                  href={project.repository}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-zinc-800 dark:hover:text-white"
                  aria-label={`${project.name} 的 GitHub 仓库`}
                >
                  <GitFork className="h-4 w-4" />
                </a>
              )}
            </div>

            <p className="flex-1 text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {project.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-zinc-100 px-2.5 py-1 text-xs text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400"
                >
                  {tag}
                </span>
              ))}
            </div>

            <Link
              href={project.href}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-cyan-700 transition-colors hover:text-cyan-600 dark:text-cyan-300 dark:hover:text-cyan-400"
            >
              访问项目
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
