import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./i18n/config";

export default createMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    // Root
    "/",
    // Locale prefixed routes
    "/(tr|en|ru|zh|de|fr|ar|es)/:path*",
    // Non-prefixed routes (blog, projects, certifications, etc.)
    "/(blog|projects|certifications|contact)/:path*",
    "/blog",
    "/projects",
    "/certifications",
    "/contact",
  ],
};
