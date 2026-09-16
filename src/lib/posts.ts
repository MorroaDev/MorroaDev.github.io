import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import GithubSlugger from "github-slugger";
import { withBase } from "@/lib/site";

export const POSTS_PER_PAGE = 6;
export const POSTS_DIRECTORY = path.join(process.cwd(), "content", "posts");
export const PAGES_DIRECTORY = path.join(process.cwd(), "content", "pages");

export type Heading = {
  level: number;
  text: string;
  id: string;
};

export type Post = {
  slug: string;
  title: string;
  description: string;
  date: string;
  updated?: string;
  tags: string[];
  author: string;
  cover?: string;
  featured?: boolean;
  draft?: boolean;
  content: string;
  excerpt: string;
  readingTime: {
    text: string;
    minutes: number;
  };
  headings: Heading[];
  href: string;
};

type PostFrontmatter = {
  title: string;
  description?: string;
  date: string;
  updated?: string;
  tags?: string[];
  author?: string;
  cover?: string;
  featured?: boolean;
  draft?: boolean;
};

function slugifyHeading(text: string) {
  const slugger = new GithubSlugger();
  return slugger.slug(text);
}

function stripMarkdown(markdown: string) {
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

function calculateReadingTime(content: string) {
  const plain = stripMarkdown(content);
  const cjkChars = (plain.match(/[\u4e00-\u9fff]/g) || []).length;
  const wordCount = (plain.match(/[A-Za-z0-9]+/g) || []).length;
  const total = Math.max(1, Math.round(cjkChars / 300 + wordCount / 200));
  return {
    text: `${total} 分钟`,
    minutes: total,
  };
}

function extractExcerpt(content: string, description?: string) {
  if (description) {
    return description;
  }

  const plain = stripMarkdown(content);
  return plain.length > 160 ? `${plain.slice(0, 160)}…` : plain;
}

function extractHeadings(content: string): Heading[] {
  const headings: Heading[] = [];

  for (const line of content.split("\n")) {
    const match = /^(#{1,6})\s+(.+)$/.exec(line);
    if (!match) {
      continue;
    }

    const level = match[1].length;
    const text = match[2].replace(/[#*_`~]/g, "").trim();
    headings.push({
      level,
      text,
      id: slugifyHeading(text),
    });
  }

  return headings;
}

function parsePostFile(filePath: string, slug: string): Post {
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(`文章 ${slug} 缺少 title 或 date`);
  }

  const title = frontmatter.title;
  const description = frontmatter.description || "";
  const tags = frontmatter.tags || [];

  return {
    slug,
    title,
    description,
    date: frontmatter.date,
    updated: frontmatter.updated,
    tags,
    author: frontmatter.author || "Morroa",
    cover: frontmatter.cover,
    featured: frontmatter.featured,
    draft: frontmatter.draft,
    content,
    excerpt: extractExcerpt(content, description),
    readingTime: calculateReadingTime(content),
    headings: extractHeadings(content),
    href: withBase(`/blog/${slug}`),
  };
}

export function getAllPosts(options?: { includeDrafts?: boolean }): Post[] {
  if (!fs.existsSync(POSTS_DIRECTORY)) {
    return [];
  }

  const includeDrafts = options?.includeDrafts ?? false;
  const fileNames = fs
    .readdirSync(POSTS_DIRECTORY)
    .filter((name) => name.endsWith(".md"));

  return fileNames
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      return parsePostFile(path.join(POSTS_DIRECTORY, fileName), slug);
    })
    .filter((post) => includeDrafts || !post.draft)
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
}

export function getPostBySlug(slug: string): Post | undefined {
  const safeSlug = slug.replace(/\.md$/, "").replace(/[^a-zA-Z0-9-_]/g, "");
  const filePath = path.join(POSTS_DIRECTORY, `${safeSlug}.md`);

  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const post = parsePostFile(filePath, safeSlug);
  return post.draft ? undefined : post;
}

export function getPostSlugs() {
  return getAllPosts().map((post) => post.slug);
}

export function getAllTags() {
  const counts = new Map<string, number>();

  for (const post of getAllPosts()) {
    for (const tag of post.tags) {
      counts.set(tag, (counts.get(tag) || 0) + 1);
    }
  }

  return Array.from(counts.entries())
    .map(([name, count]) => ({
      name,
      count,
      href: withBase(`/tags/${encodeURIComponent(name)}`),
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getPostsByTag(tag: string) {
  const decodedTag = decodeURIComponent(tag);
  return getAllPosts().filter((post) => post.tags.includes(decodedTag));
}

export function getRelatedPosts(current: Post, limit = 3) {
  const currentTags = new Set(current.tags);

  return getAllPosts()
    .filter((post) => post.slug !== current.slug)
    .map((post) => ({
      post,
      score: post.tags.reduce(
        (score, tag) => score + (currentTags.has(tag) ? 1 : 0),
        0,
      ),
    }))
    .sort(
      (a, b) =>
        b.score - a.score ||
        new Date(b.post.date).getTime() - new Date(a.post.date).getTime(),
    )
    .slice(0, limit)
    .map((item) => item.post);
}

export function getPageContent(slug: string) {
  const filePath = path.join(PAGES_DIRECTORY, `${slug}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const { data, content } = matter(fs.readFileSync(filePath, "utf8"));
  return {
    title: (data.title as string) || slug,
    description: (data.description as string) || "",
    content,
  };
}
