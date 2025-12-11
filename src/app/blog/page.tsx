// src/app/blog/page.tsx
import Link from "next/link";
import { getAllPostsMeta } from "@/lib/posts";
import Image from 'next/image';

export const metadata = {
  title: "Blog — CIBIL Thik Kare",
  description: "Articles about CIBIL score, credit repair and loan approvals.",
};

export default function BlogPage() {
  const posts = getAllPostsMeta("en");

  return (
    <main className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-4xl font-extrabold mb-10 text-center text-gray-800">Our Blog</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((p) => (
          <article key={p.slug} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:-translate-y-1 transition-transform duration-300">
            {p.image && (
              <Link href={`/blog/${p.slug}`}>
                <div className="relative h-56 w-full">
                  <Image src={p.image} alt={p.title} layout="fill" objectFit="cover" />
                </div>
              </Link>
            )}
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-2 text-gray-900">
                <Link href={`/blog/${p.slug}`} className="hover:text-primary-dark transition-colors">
                  {p.title}
                </Link>
              </h2>
              <div className="text-sm text-gray-500 mb-4">{new Date(p.date).toLocaleDateString()}</div>
              <p className="mt-2 text-gray-600 mb-4">{p.description}</p>
              <Link href={`/blog/${p.slug}`} className="font-semibold text-primary hover:text-primary-dark transition-colors">
                Read More &rarr;
              </Link>
            </div>
          </article>
        ))}
        {posts.length === 0 && <p className="col-span-full text-center text-gray-500">No posts yet.</p>}
      </div>
    </main>
  );
}
