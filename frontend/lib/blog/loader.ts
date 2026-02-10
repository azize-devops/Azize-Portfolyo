import fs from "fs";
import path from "path";
import { parseFrontmatter } from "./frontmatter";
import type { BlogPost, BlogPostMeta } from "./types";
import type { Locale } from "@/i18n/config";

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

export function getAllSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);
}

export function getPost(slug: string, locale: Locale): BlogPost | null {
  const dir = path.join(CONTENT_DIR, slug);
  if (!fs.existsSync(dir)) return null;

  // Locale fallback: istenen -> en -> tr
  const candidates: Locale[] = [locale, "en", "tr"];
  let filePath: string | null = null;

  for (const loc of candidates) {
    const candidate = path.join(dir, `${loc}.md`);
    if (fs.existsSync(candidate)) {
      filePath = candidate;
      break;
    }
  }

  if (!filePath) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content } = parseFrontmatter(raw);

  return {
    slug,
    title: (data.title as string) || slug,
    excerpt: (data.excerpt as string) || "",
    content,
    date: (data.date as string) || "",
    readTime: (data.readTime as string) || "",
    tags: (data.tags as string[]) || [],
    author: (data.author as string) || "Azize",
  };
}

export function getAllPosts(locale: Locale): BlogPostMeta[] {
  const slugs = getAllSlugs();
  const posts: BlogPostMeta[] = [];

  for (const slug of slugs) {
    const post = getPost(slug, locale);
    if (!post) continue;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { content, ...meta } = post;
    posts.push(meta);
  }

  // Tarihe gore sirala (yeniden eskiye)
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return posts;
}

export function getAllTags(): string[] {
  const slugs = getAllSlugs();
  const tagSet = new Set<string>();

  for (const slug of slugs) {
    const filePath = path.join(CONTENT_DIR, slug, "tr.md");
    if (!fs.existsSync(filePath)) continue;

    const raw = fs.readFileSync(filePath, "utf-8");
    const { data } = parseFrontmatter(raw);

    if (Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        tagSet.add(tag);
      }
    }
  }

  return Array.from(tagSet);
}
