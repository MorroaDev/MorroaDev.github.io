export const siteConfig = {
  name: "Morroa",
  legalName: "Morroa Blog",
  title: "Morroa · 记录思考、代码与产品",
  description:
    "记录学习、思考与实践，分享代码、技术与一路上的探索。",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://morroa.com",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  language: "zh-CN",
  locale: "zh_CN",
  author: {
    name: "Morroa",
    url: "https://morroa.com",
    email: "hello@morroa.com",
    bio: "开发者 / 写作者。关注 Web 技术、开源与产品设计。",
    github: "https://github.com/morroa",
    twitter: "https://x.com/morroa",
  },
  nav: [
    { label: "首页", href: "/" },
    { label: "博客", href: "/blog" },
    { label: "标签", href: "/tags" },
    { label: "归档", href: "/archive" },
    { label: "项目", href: "/projects" },
    { label: "关于", href: "/about" },
  ],
  socials: [
    { label: "GitHub", href: "https://github.com/morroa" },
    { label: "X / Twitter", href: "https://x.com/morroa" },
    { label: "RSS", href: "/rss.xml" },
  ],
} as const;

export function withBase(path: string) {
  if (!path.startsWith("/")) {
    path = `/${path}`;
  }

  if (!siteConfig.basePath) {
    return path;
  }

  return `${siteConfig.basePath}${path}`;
}

export function absoluteUrl(path: string) {
  const normalized = withBase(path);
  return new URL(normalized, `${siteConfig.url.replace(/\/$/, "")}/`).toString();
}
