import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const root = process.cwd();
const postsDirectory = path.join(root, "content", "posts");
const publicDirectory = path.join(root, "public");
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
const baseUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://morroa.com").replace(/\/$/, "");

function withBase(pathname) {
  if (!pathname.startsWith("/")) {
    pathname = `/${pathname}`;
  }

  return basePath ? `${basePath}${pathname}` : pathname;
}

function absoluteUrl(pathname) {
  return new URL(withBase(pathname), `${baseUrl}/`).toString();
}

function stripMarkdown(markdown) {
  return markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/[*_~>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function safeCdata(value) {
  return `<![CDATA[${String(value).replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function readPosts() {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }

  return fs
    .readdirSync(postsDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const raw = fs.readFileSync(path.join(postsDirectory, fileName), "utf8");
      const { data, content } = matter(raw);
      const title = String(data.title || slug);
      const description = String(data.description || "");
      const date = String(data.date || new Date().toISOString().slice(0, 10));
      const tags = Array.isArray(data.tags) ? data.tags.map(String) : [];
      const draft = Boolean(data.draft);

      return {
        slug,
        title,
        description,
        date,
        tags,
        draft,
        content,
        excerpt: description || stripMarkdown(content).slice(0, 180),
        href: withBase(`/blog/${slug}`),
      };
    })
    .filter((post) => !post.draft)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function generateSearchIndex(posts) {
  const items = posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    tags: post.tags,
    date: post.date,
    content: stripMarkdown(post.content),
    href: post.href,
  }));

  fs.writeFileSync(
    path.join(publicDirectory, "search-index.json"),
    JSON.stringify(items, null, 2),
    "utf8",
  );
}

function generateRss(posts) {
  const channelLink = absoluteUrl("/");
  const items = posts
    .map(
      (post) => `
    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${absoluteUrl(post.href)}</link>
      <guid isPermaLink="true">${absoluteUrl(post.href)}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
      <content:encoded>${safeCdata(post.content)}</content:encoded>
    </item>`,
    )
    .join("");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>${escapeXml("Morroa Blog")}</title>
    <link>${channelLink}</link>
    <description>${escapeXml("一个支持 Markdown 文章、标签、归档、搜索、RSS 与深色模式的现代静态博客。")}</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${absoluteUrl("/rss.xml")}" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>`;

  fs.writeFileSync(path.join(publicDirectory, "rss.xml"), rss, "utf8");
}

function main() {
  fs.mkdirSync(publicDirectory, { recursive: true });
  const posts = readPosts();
  generateSearchIndex(posts);
  generateRss(posts);
  console.log(`Generated search index and RSS for ${posts.length} posts.`);
}

main();
