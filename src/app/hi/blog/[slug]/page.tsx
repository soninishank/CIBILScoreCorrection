// src/app/hi/blog/[slug]/page.tsx
import { getPostBySlug, getPostSlugs } from "@/lib/posts";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

// Helper: estimate reading time
function estimateReadingTime(htmlContent: string) {
  const text = htmlContent.replace(/<[^>]+>/g, " ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return `${minutes} मिनट पढ़ें`; // "min read" in Hindi
}

// Generate metadata for the Hindi blog post
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolved = await params;
  const post = await getPostBySlug("hi", resolved.slug);
  
  if (!post) {
    return {
      title: "पोस्ट नहीं मिला", // "Post not found"
      description: "अनुरोधित पोस्ट नहीं मिला।", // "The requested post was not found."
    };
  }

  const { meta } = post;
  const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${SITE_URL}/hi/blog/${meta.slug}`;
  const enUrl = `${SITE_URL}/blog/${meta.slug}`;


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
        "en": enUrl,
      },
    },
  };
}

export async function generateStaticParams() {
  const slugs = getPostSlugs("hi");
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPageHi(props: Props) {
  const params = await props.params;
  const post = await getPostBySlug("hi", params.slug);

  if (!post) return notFound();

  const { meta, content } = post;
  const readingTime = estimateReadingTime(content);

  return (
    <div className="min-h-screen bg-gray-50 py-12 font-sans">
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <div className="mb-8">
          <Link href="/hi/blog" className="text-blue-600 font-medium hover:underline">
             &larr; सभी लेखों पर वापस जाएं
          </Link>
        </div>

        <article className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
          
          {/* Header Section */}
          <header className="px-8 pt-12 pb-8 text-center bg-white">
            <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {meta.title}
            </h1>
            
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-500">
               <img src="/myphoto.jpg" className="w-10 h-10 rounded-full mr-2 object-cover" alt="लेखक" />
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

          {/* THE CONTENT */}
          <div className="px-8 py-10 md:px-16">
            <div 
              className="blog-content" 
              dangerouslySetInnerHTML={{ __html: content }} 
            />
            
            {/* CTA Box */}
            <div className="mt-12 p-8 bg-gradient-to-br from-blue-50 to-white border border-blue-100 rounded-2xl shadow-sm text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                अपना सिबिल ठीक करने में मदद चाहिए?
              </h3>
              <p className="text-gray-600 mb-6">
                गलतियों से अकेले न जूझें। मैं गलत प्रविष्टियों पर विवाद करने और आपका स्कोर बढ़ाने में आपकी मदद कर सकता हूं।
              </p>
              <a 
                href="https://wa.me/919530064071" 
                target="_blank"
                className="inline-block px-8 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-700 transition-all shadow-md"
              >
                व्हाट्सएप पर चैट करें
              </a>
            </div>
          </div>

        </article>
      </main>
    </div>
  );
}
