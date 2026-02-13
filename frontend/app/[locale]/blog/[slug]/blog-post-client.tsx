"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  Calendar,
  Clock,
  Tag,
  ArrowLeft,
  Share2,
  Twitter,
  Linkedin,
  Copy,
  Check,
} from "lucide-react";
import type { BlogPost, BlogPostMeta } from "@/lib/blog";
import { type Locale } from "@/i18n/config";
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/cjs/styles/prism";

// Allow className on code elements for syntax highlighting
const sanitizeSchema = {
  ...defaultSchema,
  attributes: {
    ...defaultSchema.attributes,
    code: [...(defaultSchema.attributes?.code || []), "className"],
  },
};

interface BlogPostClientProps {
  post: BlogPost;
  relatedPosts: BlogPostMeta[];
  locale: Locale;
}

export default function BlogPostClient({ post, relatedPosts, locale }: BlogPostClientProps) {
  const t = useTranslations();
  const [copied, setCopied] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(window.location.href);
    const text = encodeURIComponent(post.title);
    window.open(
      `https://twitter.com/intent/tweet?url=${url}&text=${text}`,
      "_blank"
    );
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(window.location.href);
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      "_blank"
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <div
            className={`transition-all duration-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Back link */}
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("blog.backToBlog")}
            </Link>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog?tag=${tag}`}
                  className="px-3 py-1 text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                >
                  <Tag className="h-3 w-3 inline mr-1" />
                  {tag}
                </Link>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold">
                  {post.author.charAt(0)}
                </div>
                <span className="font-medium">{post.author}</span>
              </div>
              <span className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(post.date).toLocaleDateString(locale === "zh" ? "zh-CN" : locale === "ar" ? "ar-SA" : locale, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                {post.readTime}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <article className="py-12">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div
            className={`transition-all duration-700 delay-200 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Share buttons */}
            <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-200 dark:border-gray-800">
              <span className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                <Share2 className="h-4 w-4" />
                {t("blog.share")}:
              </span>
              <button
                onClick={shareOnTwitter}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                title="Twitter"
              >
                <Twitter className="h-4 w-4" />
              </button>
              <button
                onClick={shareOnLinkedIn}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </button>
              <button
                onClick={copyToClipboard}
                className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
                title={t("blog.copyLink")}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </button>
            </div>

            {/* Markdown content */}
            <div className="blog-content prose prose-lg dark:prose-invert max-w-none">
              <ReactMarkdown
                rehypePlugins={[[rehypeSanitize, sanitizeSchema]]}
                components={{
                  code({ node, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || "");
                    const isInline = !match;
                    return !isInline ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-lg !bg-gray-900 !my-4"
                        {...(props as any)}
                      >
                        {String(children).replace(/\n$/, "")}
                      </SyntaxHighlighter>
                    ) : (
                      <code className={className} {...props}>
                        {children}
                      </code>
                    );
                  },
                }}
              >
                {post.content}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-12 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
          <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold mb-8">{t("blog.relatedPosts")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group p-4 rounded-xl border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 transition-all"
                >
                  <div className="flex flex-wrap gap-1 mb-2">
                    {relatedPost.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h3 className="font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                    {relatedPost.title}
                  </h3>
                  <p className="text-sm text-gray-500 mt-2">
                    {relatedPost.readTime}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
