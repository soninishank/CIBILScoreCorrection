import type { MetadataRoute } from "next";
import { getAllPostsMeta } from "@/lib/posts";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.cibilthikkare.in";

  const enPosts = getAllPostsMeta("en").map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const hiPosts = getAllPostsMeta("hi").map((post) => ({
    url: `${siteUrl}/hi/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const staticPages = [
    {
      url: `${siteUrl}/`,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/hi`,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily",
      priority: 1.0,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/hi/blog`,
      lastModified: new Date(),
      changeFrequency: "daily" as "daily",
      priority: 0.9,
    },
  ];

  return [...staticPages, ...enPosts, ...hiPosts];
}
