import { notFound } from "next/navigation";
import { locales, type Locale } from "@/i18n/config";
import { getAllSlugs, getPost, getAllPosts } from "@/lib/blog";
import BlogPostClient from "./blog-post-client";

export function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const loc = (locale as Locale) || "tr";
  const post = getPost(slug, loc);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts(loc);

  // Ilgili yazilar (ayni tag'lere sahip, mevcut yazi haric)
  const relatedPosts = allPosts
    .filter(
      (p) => p.slug !== post.slug && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 3);

  return <BlogPostClient post={post} relatedPosts={relatedPosts} locale={loc} />;
}
