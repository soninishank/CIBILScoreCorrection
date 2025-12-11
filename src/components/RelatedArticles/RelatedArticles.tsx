// src/components/RelatedArticles/RelatedArticles.tsx
import Link from "next/link";
import { PostMeta } from "@/lib/posts";

type Props = {
  articles: PostMeta[];
  lang: "en" | "hi";
};

export default function RelatedArticles({ articles, lang }: Props) {
  if (!articles.length) return null;

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Articles</h2>
      <div className="flex flex-col gap-4">
        {articles.map((article) => {
          const href = lang === "en" ? `/blog/${article.slug}` : `/hi/blog/${article.slug}`;
          return (
            <Link
              key={article.slug}
              href={href}
              className="block p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                {article.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">
                {article.description}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
