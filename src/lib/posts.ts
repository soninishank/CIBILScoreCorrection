// src/lib/posts.ts
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";

export type PostMeta = {
  title: string;
  date: string;
  description?: string;
  slug: string;
  tags?: string[];
  image?: string;
  faq?: { question: string; answer: string }[];
};

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

async function markdownToHtml(markdown: string) {
  const result = await remark().use(html).process(markdown);
  return result.toString();
}

export function getPostFolder(lang: "en" | "hi") {
  return path.join(CONTENT_ROOT, lang, "blog");
}

export function getPostSlugs(lang: "en" | "hi"): string[] {
  const folder = getPostFolder(lang);
  if (!fs.existsSync(folder)) return [];
  return fs
    .readdirSync(folder)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllPostsMeta(lang: "en" | "hi"): PostMeta[] {
  const folder = getPostFolder(lang);
  if (!fs.existsSync(folder)) return [];
  const files = fs.readdirSync(folder).filter((f) => f.endsWith(".md"));

  const posts = files.map((file) => {
    const full = path.join(folder, file);
    const raw = fs.readFileSync(full, "utf8");
    const { data } = matter(raw);
    const meta: PostMeta = {
      title: String(data.title || ""),
      date: String(data.date || ""),
      description: data.description || "",
      slug: String(data.slug || file.replace(/\.md$/, "")),
      tags: data.tags || [],
      image: data.image || "",
      faq: data.faq || [],
    };
    return meta;
  });

  // sort by date desc
  posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });

  return posts;
}

export async function getPostBySlug(lang: "en" | "hi", slug: string) {
  const folder = getPostFolder(lang);
  const file = path.join(folder, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = fs.readFileSync(file, "utf8");
  const { data, content: rawContent } = matter(raw);

  const htmlContent = await markdownToHtml(rawContent);

  const meta: PostMeta = {
    title: String(data.title || ""),
    date: String(data.date || ""),
    description: data.description || "",
    slug: String(data.slug || slug),
    tags: data.tags || [],
    image: data.image || "",
    faq: data.faq || [],
  };

  return { meta, content: htmlContent, rawContent };
}
