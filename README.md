# Morroa Blog

一个使用 Next.js、TypeScript、Tailwind CSS 和 Markdown 构建的现代静态博客。支持同时部署到 GitHub Pages 和 Vercel。

## 功能

- Markdown / GFM 文章渲染，支持 Frontmatter、代码高亮、任务列表和表格
- 自动生成文章目录、阅读进度和“相关文章”
- 标签页、归档页、全文搜索
- 深色 / 浅色模式、响应式导航
- RSS、sitemap、robots、SEO 与 JSON-LD
- 可选的 Giscus 评论和邮件订阅
- 静态导出，无服务器依赖

## 本地开发

```bash
pnpm install
pnpm run dev
```

打开 [http://localhost:3000](http://localhost:3000)。

## 写作

文章放在 `content` 目录下的任意子文件夹中（`content/pages` 除外），文件夹名会作为文章分类，文件名就是文章 slug。例如 `content/first/my-first-post.md`：

```md
---
title: "我的第一篇文章"
description: "文章简介"
date: "2026-09-14"
updated: "2026-09-15"
tags: ["写作", "Next.js"]
author: "Morroa"
cover: "/images/my-cover.svg"
featured: true
draft: false
---

这里是 Markdown 正文。
```

关于页面位于 `content/pages/about.md`。

## 构建与预览

```bash
pnpm run build
pnpm start
```

构建产物输出到 `out` 目录。

## 部署到 Vercel

1. 将仓库导入 Vercel。
2. Framework Preset 选择 **Next.js**。
3. Build Command 使用 `pnpm run build`。
4. 如果需要，在环境变量中设置 `NEXT_PUBLIC_SITE_URL`。

Vercel 不需要设置 `NEXT_PUBLIC_BASE_PATH`，除非你把它部署在子路径。

## 部署到 GitHub Pages

仓库已包含 `.github/workflows/deploy.yml`。默认分支推送到 `main` 后会自动构建并发布。

如果使用 **自定义域名**，通常保持 `NEXT_PUBLIC_BASE_PATH` 为空。如果部署到 **项目子路径**，例如 `https://username.github.io/repo-name`，请在仓库的 Actions Variables 中设置：

```text
NEXT_PUBLIC_BASE_PATH=/repo-name
NEXT_PUBLIC_SITE_URL=https://username.github.io/repo-name
```

并在 GitHub 仓库的 **Settings → Pages** 中选择 `GitHub Actions` 作为 Source。

## 可选功能

### Giscus 评论

在 `.env.local` 或部署平台环境变量中配置：

```text
NEXT_PUBLIC_GISCUS_REPO=your-name/your-repo
NEXT_PUBLIC_GISCUS_REPO_ID=your-repo-id
NEXT_PUBLIC_GISCUS_CATEGORY=Announcements
NEXT_PUBLIC_GISCUS_CATEGORY_ID=your-category-id
```

### 邮件订阅

设置 `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` 指向你的表单服务 endpoint。

## 项目结构

```text
content/                Markdown 文章（可按文件夹分类）
content/pages/          静态页面
public/images/          图片与文章封面
scripts/                搜索索引和 RSS 生成脚本
src/app/                App Router 页面
src/components/         网站组件
src/lib/                站点配置与内容读取
```
