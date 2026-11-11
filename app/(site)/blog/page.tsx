import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight } from "lucide-react";
import { PostMeta } from "@/components/blog/post-meta";
import { defaultOgImage } from "@/lib/site";
import { BlogFooter } from "@/components/site-footers";
import {
  blogArchives,
  blogCategories,
  countPostsInArchive,
  countPostsInCategory,
  filterBlogPosts,
} from "@/lib/content/blog";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Mortgage education, homeownership preparation, and refinance planning articles from Century Financial Group.",
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Century Financial Group Blog",
    description: "Educational mortgage articles from Century Financial Group.",
    url: "/blog",
    images: [defaultOgImage],
  },
};

type Filters = { category?: string; archive?: string };

export default function BlogPage({ searchParams }: PageProps<"/blog">) {
  return (
    <div className="min-h-screen bg-white text-[#2e3430]">
      <main id="main-content">
        {/* The unfiltered archive is prerendered; category/archive filters stream in per request. */}
        <Suspense fallback={<BlogArchive filters={{}} />}>
          <FilteredBlogArchive searchParams={searchParams} />
        </Suspense>
      </main>
      <BlogFooter />
    </div>
  );
}

async function FilteredBlogArchive({
  searchParams,
}: {
  searchParams: PageProps<"/blog">["searchParams"];
}) {
  const params = await searchParams;
  const single = (value: string | string[] | undefined) =>
    Array.isArray(value) ? value[0] : value;
  return (
    <BlogArchive
      filters={{
        category: single(params.category),
        archive: single(params.archive),
      }}
    />
  );
}

function BlogArchive({ filters }: { filters: Filters }) {
  const visiblePosts = filterBlogPosts(filters);
  const categoryLabel = blogCategories.find(
    item => item.slug === filters.category
  )?.label;
  const archiveLabel = blogArchives.find(
    item => item.slug === filters.archive
  )?.label;
  const heading = categoryLabel || archiveLabel || "Blog";

  return (
    <>
      <section className="border-b border-[#e6eae6] bg-[#f6f8f6] px-5 py-5 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1280px] flex-wrap items-center justify-between gap-4">
          <h1 className="text-sm font-bold tracking-[0.08em] text-[#263e2f] uppercase">
            {heading}
          </h1>
          <nav aria-label="Breadcrumb" className="text-sm text-[#6b746d]">
            <ol className="flex flex-wrap items-center gap-1">
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
                  aria-current={heading === "Blog" ? "page" : undefined}
                >
                  Blog
                </Link>
              </li>
              {heading !== "Blog" && (
                <>
                  <li aria-hidden="true">›</li>
                  <li aria-current="page">{heading}</li>
                </>
              )}
            </ol>
          </nav>
        </div>
      </section>

      <section className="px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,1fr)_285px] lg:gap-16">
          <div className="divide-y divide-[#edf0ed]">
            {visiblePosts.map((post, index) => (
              <article
                id={`article-${index + 1}`}
                key={post.slug}
                className="grid gap-7 py-9 first:pt-0 sm:grid-cols-[280px_minmax(0,1fr)] sm:gap-9"
              >
                <div className="relative h-[220px] w-full sm:h-[245px]">
                  <Image
                    src={post.image}
                    alt={post.imageAlt}
                    fill
                    sizes="(min-width: 640px) 280px, 100vw"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="font-serif text-4xl leading-[1.02] font-bold text-forest-ink sm:text-[2.7rem]">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-forest"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  <PostMeta
                    date={post.date}
                    isoDate={post.isoDate}
                    author={post.author}
                    category={post.category}
                  />
                  <p className="mt-5 max-w-[620px] text-base leading-7 text-[#5a645c]">
                    {post.excerpt}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="mt-6 inline-flex items-center gap-2 bg-forest px-4 py-2.5 text-sm font-bold text-white transition-colors hover:bg-forest-dark"
                  >
                    Read more<span className="sr-only">: {post.title}</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
            {visiblePosts.length === 0 && (
              <p className="py-10 text-lg leading-8 text-[#5a645c]">
                No posts match this selection.{" "}
                <Link
                  href="/blog"
                  className="font-bold text-forest hover:underline"
                >
                  View all posts
                </Link>
                .
              </p>
            )}
          </div>

          <aside className="border-t border-[#edf0ed] pt-8 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-10">
            <SidebarList
              title="Categories"
              items={blogCategories.map(item => ({
                label: `${item.label} (${countPostsInCategory(item.slug)})`,
                href: `/blog?category=${item.slug}`,
              }))}
            />
            <SidebarList
              title="Archives"
              className="mt-12"
              items={blogArchives.map(item => ({
                label: `${item.label} (${countPostsInArchive(item.slug)})`,
                href: `/blog?archive=${item.slug}`,
              }))}
            />
            <div className="mt-12 border-l-2 border-forest bg-[#f6f8f6] p-5">
              <p className="text-xs font-bold tracking-[0.14em] text-forest uppercase">
                Start here
              </p>
              <p className="mt-3 font-serif text-2xl leading-7 font-bold text-forest-ink">
                A clearer mortgage conversation begins with the right questions.
              </p>
              <Link
                href="/mortgage-readiness#assessment"
                className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-forest hover:underline"
              >
                Explore readiness{" "}
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function SidebarList({
  title,
  items,
  className = "",
}: {
  title: string;
  items: { label: string; href: string }[];
  className?: string;
}) {
  const headingId = `${title.toLowerCase()}-heading`;
  return (
    <section className={className} aria-labelledby={headingId}>
      <h2 id={headingId} className="text-xl font-bold text-[#263e2f]">
        {title}
      </h2>
      <ul className="mt-5 space-y-3">
        {items.map(item => (
          <li key={item.href}>
            <Link
              href={item.href}
              className="text-sm text-[#5a645c] transition-colors hover:text-forest"
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
