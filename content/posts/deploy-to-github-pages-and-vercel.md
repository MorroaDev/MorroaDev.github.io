---
title: "把 Next.js 博客部署到 GitHub Pages 和 Vercel"
description: "一份面向静态博客的部署清单：静态导出、环境变量、自定义域名与自动化发布。"
date: "2026-09-06"
tags: ["部署", "GitHub Pages", "Vercel", "Next.js"]
featured: false
cover: "/images/deploy-blog.svg"
---

这个博客使用 Next.js 的静态导出能力，因此可以同时部署到 GitHub Pages 和 Vercel，而不需要运行 Node.js 服务。

## 为什么选择静态导出

静态站点没有服务器状态，访问快、维护成本低，也更容易做内容分发。

在 `next.config.ts` 中开启：

```ts
const nextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};
```

## 部署到 Vercel

Vercel 会自动识别 Next.js 项目：

1. 将仓库导入 Vercel
2. 框架预设选择 Next.js
3. 执行 `pnpm run build`
4. 输出目录保持默认即可

如果使用了项目子路径，请设置 `NEXT_PUBLIC_BASE_PATH`。

## 部署到 GitHub Pages

GitHub Pages 需要先构建出 `out` 目录，再由 Actions 发布。

这个项目已经提供了 `.github/workflows/deploy.yml`：

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: pnpm/action-setup@v4
  - uses: actions/setup-node@v4
    with:
      node-version: 22
      cache: pnpm
  - run: pnpm install --frozen-lockfile
  - run: pnpm run build
  - uses: actions/upload-pages-artifact@v3
    with:
      path: out
  - uses: actions/deploy-pages@v4
```

## 自定义域名

如果你使用自己的域名，例如 `morroa.com`：

- 在域名服务商添加 CNAME 或 A 记录
- 在 GitHub Pages 设置中填写域名
- 将 `NEXT_PUBLIC_SITE_URL` 设置为 `https://你的域名`

## 验证发布结果

构建完成后，检查这几个文件：

- `sitemap.xml`
- `rss.xml`
- `search-index.json`
- 所有文章的静态 HTML 页面

如果内容正常，你的博客已经可以对外发布了。
