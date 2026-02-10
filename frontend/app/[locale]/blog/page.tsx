import { Suspense } from "react";
import { locales, type Locale } from "@/i18n/config";
import { getAllPosts, getAllTags } from "@/lib/blog";
import BlogPageClient from "./blog-page-client";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const loc = (locale as Locale) || "tr";
  const posts = getAllPosts(loc);
  const tags = getAllTags();

  return (
    <Suspense>
      <BlogPageClient posts={posts} tags={tags} locale={loc} />
    </Suspense>
  );
}
