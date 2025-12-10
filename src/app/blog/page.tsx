// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";

export const metadata = {
  title: "Blog — CIBIL Thik Kare",
  description: "Articles about CIBIL score, credit repair and loan approvals.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta("en");

  return (
    <main className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-6">Blog</h1>

      <div className="space-y-6">
        {posts.map((p) => (
          <article key={p.slug} className="border rounded p-4">
            <Link href={`/blog/${p.slug}`} className="text-xl font-semibold hover:underline">
              {p.title}
            </Link>
            <div className="text-sm text-gray-500 mt-1">{new Date(p.date).toLocaleDateString()}</div>
            <p className="mt-2 text-gray-700">{p.description}</p>
          </article>
        ))}
        {posts.length === 0 && <p>No posts yet.</p>}
      </div>
    </main>
  );
}
