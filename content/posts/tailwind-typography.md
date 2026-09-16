---
title: "用 Tailwind Typography 提升文章可读性"
description: "借助 prose 排版插件，让 Markdown 渲染出的长文拥有更好的视觉节奏。"
date: "2026-08-28"
tags: ["Tailwind CSS", "设计"]
featured: false
cover: "/images/tailwind-typography.svg"
---

长文章最怕阅读疲劳。字号、行高、段落间距、标题节奏，都会影响读者的阅读体验。

## 使用 Typography 插件

在 Tailwind CSS v4 中，只需在全局样式中加入：

```css
@import "tailwindcss";
@plugin "@tailwindcss/typography";
```

然后在 Markdown 容器上使用 `prose` 类：

```tsx
<div className="prose prose-zinc dark:prose-invert">
  <MarkdownRenderer content={content} />
</div>
```

## 调整细节

默认排版已经不错，但博客还可以进一步定制：

```css
.prose :where(a) {
  word-break: break-word;
}

.prose :where(code):not(:where(pre code)) {
  border-radius: 0.4rem;
}
```

## 保持克制的设计

好的排版往往不是“更显眼”，而是让内容自然流动。

- 控制每行字符数，避免过宽
- 增加段落之间的呼吸感
- 让代码块拥有稳定、独立的视觉区域
- 深色模式下保持足够的对比度

写完内容后再回来审视一次排版，通常会有新的发现。
