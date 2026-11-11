export type BlogCategorySlug =
  | "mortgage-education"
  | "homeownership-preparation"
  | "refinance-planning";

export type BlogPost = {
  slug: string;
  title: string;
  category: "Mortgage Education" | "Homeownership Preparation" | "Refinance Planning";
  categorySlug: BlogCategorySlug;
  date: string;
  isoDate: string;
  archive: "2026-09";
  author: string;
  excerpt: string;
  body: readonly string[];
  image: string;
  imageAlt: string;
};

/** Original Century Financial Group educational content for the on-site archive. */
export const blogPosts: readonly BlogPost[] = [
  {
    slug: "a-calmer-way-to-begin-your-mortgage-conversation",
    title: "A calmer way to begin your mortgage conversation",
    category: "Mortgage Education",
    categorySlug: "mortgage-education",
    date: "September 16, 2026",
    isoDate: "2026-09-16",
    archive: "2026-09",
    author: "Century Financial Group",
    excerpt:
      "Mortgage planning becomes more manageable when you start with one clear goal, one unanswered question, and a timeline you can explain in your own words.",
    body: [
      "A mortgage conversation can feel difficult when every question arrives at once. Begin by deciding what outcome you want to understand: purchasing a home, refinancing, exploring home equity, or considering an investment property.",
      "Then choose the one question that would make the next conversation more useful. It may relate to credit, down-payment planning, documentation, timing, or lender selection. Naming that question allows a licensed professional to respond with clearer educational guidance.",
      "The California Mortgage Readiness Assessment is designed for that first step. It is educational only and is not a loan application, prequalification, approval, or commitment to lend.",
    ],
    image: "/images/hero-partnership.webp",
    imageAlt: "A family speaking with a real estate professional at a home transaction",
  },
  {
    slug: "preparing-for-a-first-home-conversation",
    title: "Preparing for a first home conversation",
    category: "Homeownership Preparation",
    categorySlug: "homeownership-preparation",
    date: "September 9, 2026",
    isoDate: "2026-09-09",
    archive: "2026-09",
    author: "Century Financial Group",
    excerpt:
      "Before you begin comparing possibilities, identify the questions you want answered about your timeline, documentation, and available down-payment resources.",
    body: [
      "The first home conversation should begin with your own priorities rather than a checklist that assumes every buyer has the same path. Consider the area you hope to serve, the time horizon that feels realistic, and the questions you want a licensed professional to explain.",
      "It can be helpful to write down the documentation topics that feel unclear and the down-payment questions you want to bring to the conversation. That preparation does not determine eligibility; it simply makes the discussion more focused.",
      "When you are ready, use the mortgage readiness assessment to request an educational response from the Century Financial Group team.",
    ],
    image: "/images/digital-reach.webp",
    imageAlt: "Professionals reviewing planning materials together",
  },
  {
    slug: "refinancing-starts-with-the-outcome-you-want-to-understand",
    title: "Refinancing starts with the outcome you want to understand",
    category: "Refinance Planning",
    categorySlug: "refinance-planning",
    date: "September 2, 2026",
    isoDate: "2026-09-02",
    archive: "2026-09",
    author: "Century Financial Group",
    excerpt:
      "A productive refinance discussion begins by naming what you would like to evaluate, organizing your current-loan questions, and choosing a time to speak with a licensed professional.",
    body: [
      "A refinance conversation becomes clearer when you begin with the outcome you want to evaluate. You may want to understand payments, time horizons, home-equity questions, or the general structure of available options.",
      "Before requesting a response, gather the questions you have about your current loan and write down the changes you would like to discuss. A licensed professional can then help frame the next educational step.",
      "Century Financial Group does not use this blog as a place to make rate promises or approval claims. Each mortgage situation requires an individual, compliant review.",
    ],
    image: "/images/legacy-giving.webp",
    imageAlt: "A key and paperwork on a table after a real estate transaction",
  },
];

export const blogCategories = [
  { label: "Mortgage Education", slug: "mortgage-education" },
  { label: "Homeownership Preparation", slug: "homeownership-preparation" },
  { label: "Refinance Planning", slug: "refinance-planning" },
] as const;

export const blogArchives = [{ label: "September 2026", slug: "2026-09" }] as const;

export function getBlogPost(slug: string | undefined) {
  return blogPosts.find((post) => post.slug === slug);
}

/** Post count per category, derived so the sidebar can never drift from the data. */
export function countPostsInCategory(slug: string) {
  return blogPosts.filter((post) => post.categorySlug === slug).length;
}

export function countPostsInArchive(slug: string) {
  return blogPosts.filter((post) => post.archive === slug).length;
}

export function filterBlogPosts(filters: { category?: string; archive?: string }) {
  return blogPosts.filter(
    (post) =>
      (!filters.category || post.categorySlug === filters.category) &&
      (!filters.archive || post.archive === filters.archive)
  );
}
