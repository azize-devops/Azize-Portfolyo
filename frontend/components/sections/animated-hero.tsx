"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ArrowRight, Award, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";

export function AnimatedHero() {
  const t = useTranslations();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
        <div className="text-center">
          {/* Badge */}
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6 transition-all duration-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <Award className="h-4 w-4" />
            {t("hero.badge")}
          </div>

          {/* Title */}
          <h1
            className={`text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight transition-all duration-700 delay-100 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t("hero.greeting")}{" "}
            <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
              {t("hero.name")}
            </span>
          </h1>

          {/* Subtitle */}
          <p
            className={`mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto transition-all duration-700 delay-200 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t("hero.title")}
          </p>

          {/* Description */}
          <p
            className={`mt-4 text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto transition-all duration-700 delay-300 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            {t("hero.description")}
          </p>

          {/* Buttons */}
          <div
            className={`mt-10 flex flex-wrap justify-center gap-4 transition-all duration-700 delay-[400ms] ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-4"
            }`}
          >
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-all hover:scale-105 hover:shadow-lg"
            >
              <BookOpen className="h-5 w-5" />
              {t("hero.blogPosts")}
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-all hover:scale-105"
            >
              {t("hero.myProjects")}
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
