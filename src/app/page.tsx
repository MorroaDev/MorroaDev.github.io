import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  FileText,
  Rss,
  Search,
  Sparkles,
  Tags,
} from "lucide-react";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { siteConfig, withBase } from "@/lib/site";
import { PostList } from "@/components/PostList";
import { TagBadge } from "@/components/TagBadge";
import { NewsletterForm } from "@/components/NewsletterForm";

const features = [
  {
    title: "Markdown 原生写作",
    description: "把 .md 文件放进 content 下的分类文件夹，即可自动生成文章页。",
    icon: FileText,
  },
  {
    title: "全文搜索",
    description: "按标题、标签和正文模糊搜索，无需后端服务。",
    icon: Search,
  },
  {
    title: "标签与归档",
    description: "按主题浏览，按年份归档，内容组织一目了然。",
    icon: Tags,
  },
  {
    title: "RSS 订阅",
    description: "自动生成 RSS，让读者方便订阅你的更新。",
    icon: Rss,
  },
];

export default function HomePage() {
  const posts = getAllPosts();
  const latestPosts = posts.slice(0, 4);
  const tags = getAllTags().slice(0, 12);

  return (
    <>
      <section className="relative overflow-hidden border-b border-zinc-200 dark:border-zinc-800">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#cffafe_0,transparent_35%),radial-gradient(circle_at_70%_10%,#ede9fe_0,transparent_35%)] dark:bg-[radial-gradient(circle_at_top_left,#164e63_0,transparent_35%),radial-gradient(circle_at_70%_10%,#4c1d95_0,transparent_35%)]" />
        <div className="relative mx-auto grid w-full max-w-6xl gap-10 px-5 py-20 md:grid-cols-[1.15fr_0.85fr] md:items-center md:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-xs font-medium text-cyan-800 dark:border-cyan-900 dark:bg-cyan-950 dark:text-cyan-300">
              <Sparkles className="h-3.5 w-3.5" />
              一个开箱即用的现代博客
            </div>
            <h1 className="max-w-3xl text-4xl font-bold leading-tight tracking-tight text-zinc-950 sm:text-5xl md:text-6xl dark:text-white">
              记录思考，<span className="bg-gradient-to-r from-cyan-600 to-violet-600 bg-clip-text text-transparent">分享代码</span>，连接灵感。
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {siteConfig.description}
              <br />
              你只需专注写作，其余交给 Markdown 和自动化构建。
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={withBase("/blog")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-950 px-6 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
              >
                浏览文章
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={withBase("/about")}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-zinc-200 bg-white/80 px-6 text-sm font-medium text-zinc-700 backdrop-blur transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                关于我
              </Link>
            </div>
          </div>

          <div className="rounded-3xl border border-zinc-200 bg-white/70 p-6 shadow-2xl shadow-zinc-200/60 backdrop-blur dark:border-zinc-800 dark:bg-zinc-900/70 dark:shadow-black/30">
            <div className="mb-5 flex items-center justify-between">
              <span className="text-sm font-semibold">最近更新</span>
              <span className="inline-flex items-center gap-1 text-xs text-zinc-400">
                <CalendarDays className="h-3.5 w-3.5" />
                持续写作
              </span>
            </div>
            <div className="space-y-3">
              {latestPosts.length > 0 ? (
                latestPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={post.href}
                    className="group block rounded-2xl border border-transparent p-3 transition-colors hover:border-zinc-200 hover:bg-white dark:hover:border-zinc-700 dark:hover:bg-zinc-800"
                  >
                    <span className="line-clamp-1 text-sm font-medium text-zinc-800 group-hover:text-cyan-700 dark:text-zinc-200 dark:group-hover:text-cyan-300">
                      {post.title}
                    </span>
                    <span className="mt-1 block text-xs text-zinc-400">
                      {post.date} · {post.readingTime.text}
                    </span>
                  </Link>
                ))
              ) : (
                <p className="text-sm text-zinc-400">暂无文章，先在 content 下的分类文件夹中创建一篇吧。</p>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-5 py-16">
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-3xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <feature.icon className="h-5 w-5 text-cyan-600 dark:text-cyan-400" />
              <h3 className="mt-4 font-semibold">{feature.title}</h3>
              <p className="mt-2 text-sm leading-6 text-zinc-500 dark:text-zinc-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Latest</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">最新文章</h2>
          </div>
          <Link
            href={withBase("/blog")}
            className="inline-flex items-center gap-1 text-sm font-medium text-zinc-600 transition-colors hover:text-cyan-600 dark:text-zinc-400 dark:hover:text-cyan-400"
          >
            查看全部
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <PostList posts={latestPosts} columns={2} />
      </section>

      <section className="border-y border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/40">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1fr_0.75fr] md:items-start">
          <div>
            <p className="text-sm font-semibold text-cyan-600 dark:text-cyan-400">Explore</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight sm:text-3xl">按主题浏览</h2>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {tags.map((tag) => (
                <TagBadge key={tag.name} tag={tag.name} count={tag.count} large />
              ))}
            </div>
            {tags.length === 0 && (
              <p className="text-sm text-zinc-400">暂无标签。</p>
            )}
          </div>
          <NewsletterForm />
        </div>
      </section>
    </>
  );
}
