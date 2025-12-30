// src/app/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs, getAllPostsMeta } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link"; // This was missing
import type { Metadata } from "next";
import RelatedArticles from "@/components/RelatedArticles/RelatedArticles";

type Props = { params: Promise<{ slug: string }> };

// Helper: get word count
function getWordCount(textContent: string) {
  return textContent.trim().split(/\s+/).filter(Boolean).length;
}

// Helper: estimate reading time
function estimateReadingTime(textContent: string) {
  const words = getWordCount(textContent);
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} min read`;
}

// Generate metadata
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const post = await getPostBySlug("en", resolved.slug);

  if (!post) {
    return {
      title: "Post not found",
      description: "The requested post was not found.",
    };
  }

  const { meta } = post;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${SITE_URL}/blog/${meta.slug}`;
  const hiUrl = `${SITE_URL}/hi/blog/${meta.slug}`;

  return {
    title: meta.title, // Title template will be applied from layout
    description: meta.description || "",
    openGraph: {
      title: meta.title,
      description: meta.description || "",
      url,
      images: meta.image ? [{ url: `${SITE_URL}${meta.image}`, width: 1200, height: 630 }] : undefined,
      type: "article",
    },
    alternates: {
      canonical: url,
      languages: {
        "hi": hiUrl,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description || "",
      images: meta.image ? [`${SITE_URL}${meta.image}`] : [],
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("en");
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage(props: Props) {
  const params = await props.params;
  const post = await getPostBySlug("en", params.slug);

  if (!post) return notFound();

  const { meta, content, rawContent } = post;
  const readingTime = estimateReadingTime(rawContent);
  const wordCount = getWordCount(rawContent);

  // Get related articles
  const allPosts = getAllPostsMeta("en");
  const numberOfRelatedArticles = Math.max(3, Math.floor(wordCount / 100));
  const relatedArticles = allPosts
    .filter((p) => p.slug !== meta.slug)
    .slice(0, numberOfRelatedArticles);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": meta.title,
    "description": meta.description,
    "image": meta.image ? [`${process.env.NEXT_PUBLIC_SITE_URL || ''}${meta.image}`] : [],
    "datePublished": meta.date,
    "author": {
      "@type": "Person",
      "name": "CA Anurag Tripathi"
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-2/3">
            {/* Back Link */}
            <div className="mb-8">
              <Link href="/blog" className="text-blue-600 font-medium hover:underline">
                &larr; Back to articles
              </Link>
            </div>

            <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">

              {/* Header Section */}
              <header className="px-8 pt-12 pb-8 text-center bg-white">
                <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
                  {meta.title}
                </h1>

                <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
                  {/* Replace with your actual image path if available, or remove img tag if not */}
                  <img src="/myphoto.jpg" className="w-10 h-10 rounded-full mr-2 object-cover" alt="Author" />
                  <span className="font-semibold text-gray-900">CA Anurag Tripathi</span>
                  <span>•</span>
                  <time>{new Date(meta.date).toLocaleDateString()}</time>
                  <span>•</span>
                  <span>{readingTime}</span>
                </div>
              </header>

              {/* Featured Image */}
              {meta.image && (
                <div className="w-full h-auto bg-gray-100">
                  <img src={meta.image} alt={meta.title} className="w-full object-cover max-h-[500px]" />
                </div>
              )}

              {/* THE CONTENT - Apply the custom class here */}
              <div className="px-8 py-10 md:px-16">
                <div
                  className="blog-content"
                  dangerouslySetInnerHTML={{ __html: content }}
                />

                {/* CTA Box */}
                <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl shadow-sm text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3">
                    Need help fixing your CIBIL?
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Don't struggle with errors alone. I can help you dispute incorrect entries and boost your score.
                  </p>
                  <a
                    href="https://wa.me/918290264071"
                    target="_blank"
                    className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md"
                  >
                    Chat on WhatsApp
                  </a>
                </div>
              </div>

            </article>
          </div>
          <aside className="w-full lg:w-1/3 lg:sticky top-24 h-full">
            <RelatedArticles articles={relatedArticles} lang="en" />
          </aside>
        </div>
      </main>
    </div>
  );
}