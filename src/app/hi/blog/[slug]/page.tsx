// src/app/hi/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";

type Props = { params: { slug: string } };

export async function generateStaticParams() {
  const slugs = getPostSlugs("hi");
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPageHi(props: Props) {
  // params might be a promise — await it to access slug safely
  const { params } = props as unknown as { params: Promise<{ slug: string }> } | Props;
  const resolved = (await params) as { slug: string };
  const { slug } = resolved;

  const post = await getPostBySlug("hi", slug);
  if (!post) return notFound();

  const { meta, content } = post;

  return (
    <main className="max-w-3xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold">{meta.title}</h1>
      <div className="text-sm text-gray-500 mt-2">{new Date(meta.date).toLocaleDateString()}</div>

      <article className="prose max-w-none mt-6" dangerouslySetInnerHTML={{ __html: content }} />
    </main>
  );
}
