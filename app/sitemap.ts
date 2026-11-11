import type { MetadataRoute } from "next";
import { blogPosts } from "@/lib/content/blog";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: siteConfig.url, changeFrequency: "monthly", priority: 1 },
    {
      url: `${siteConfig.url}/mortgage-readiness`,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    { url: `${siteConfig.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    {
      url: `${siteConfig.url}/disclosures`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/privacy`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/accessibility`,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
  const posts: MetadataRoute.Sitemap = blogPosts.map(post => ({
    url: `${siteConfig.url}/blog/${post.slug}`,
    lastModified: post.isoDate,
    changeFrequency: "yearly",
    priority: 0.6,
  }));
  return [...pages, ...posts];
}
