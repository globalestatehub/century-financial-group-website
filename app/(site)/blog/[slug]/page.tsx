import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { BlogFooter } from "@/components/site-footers";
import { blogPosts, getBlogPost } from "@/lib/content/blog";
import { defaultOgImage, siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return blogPosts.map(post => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return { title: "Article not found", robots: { index: false } };

  return {
    title: post.title,
    description: post.excerpt,
    authors: [{ name: post.author }],
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.excerpt,
      url: `/blog/${post.slug}`,
      publishedTime: post.isoDate,
      authors: [post.author],
      section: post.category,
      images: [defaultOgImage],
    },
  };
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.isoDate,
    image: `${siteConfig.url}${post.image}`,
    author: { "@type": "Organization", name: post.author },
    publisher: { "@type": "Organization", name: siteConfig.legalName },
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
  };

  return (
    <div className="min-h-screen bg-white text-[#2e3430]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <main id="main-content">
        <nav
          aria-label="Breadcrumb"
          className="border-b border-[#e6eae6] bg-[#f6f8f6] px-5 py-5 sm:px-8 lg:px-12"
        >
          <ol className="mx-auto flex max-w-[980px] flex-wrap items-center gap-1 text-sm text-[#6b746d]">
            <li>
              <Link href="/" className="transition-colors hover:text-forest">
                Home
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li>
              <Link
                href="/blog"
                className="transition-colors hover:text-forest"
              >
                Blog
              </Link>
            </li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{post.title}</li>
          </ol>
        </nav>
        <article className="mx-auto max-w-[980px] px-5 py-14 sm:px-8 lg:py-20">
          <p className="text-xs font-bold tracking-[0.15em] text-forest uppercase">
            {post.category}
          </p>
          <h1 className="mt-5 max-w-4xl font-serif text-5xl leading-[.98] font-bold text-forest-ink sm:text-7xl">
            {post.title}
          </h1>
          <PostMeta
            date={post.date}
            isoDate={post.isoDate}
            author={post.author}
            category={post.category}
            large
          />
          <div className="relative mt-10 h-[300px] w-full sm:h-[460px]">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              preload
              sizes="(min-width: 1024px) 920px, 100vw"
              className="object-cover"
            />
          </div>
          <div className="mx-auto mt-10 max-w-3xl text-lg leading-9 text-[#4f5d53]">
            {post.body.map(paragraph => (
              <p key={paragraph} className="mt-6 first:mt-0">
                {paragraph}
              </p>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4 border-t border-[#edf0ed] pt-8">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 border border-forest px-4 py-3 text-sm font-bold text-forest transition-colors hover:bg-mint"
            >
              <ArrowLeft className="h-4 w-4" aria-hidden="true" /> Back to Blog
            </Link>
            <Link
              href="/mortgage-readiness#assessment"
              className="inline-flex items-center gap-2 bg-forest px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
            >
              Explore readiness{" "}
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </article>
      </main>
      <BlogFooter />
    </div>
  );
}
