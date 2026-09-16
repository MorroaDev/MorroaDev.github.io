import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { absoluteUrl, withBase } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    withBase("/"),
    withBase("/blog"),
    withBase("/tags"),
    withBase("/archive"),
    withBase("/projects"),
    withBase("/about"),
  ].map((path) => ({
    url: absoluteUrl(path),
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(post.href),
    lastModified: new Date(post.updated || post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const tagRoutes = getAllTags().map((tag) => ({
    url: absoluteUrl(tag.href),
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...postRoutes, ...tagRoutes];
}
