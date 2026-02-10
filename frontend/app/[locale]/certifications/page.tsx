"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowLeft, ExternalLink, Award, Calendar } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import {
  certifications,
  categories,
  type Certification,
  type Category,
} from "@/lib/certifications-data";

function CertificationDetailCard({
  cert,
  index,
}: {
  cert: Certification;
  index: number;
}) {
  const t = useTranslations();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <Link
        href={cert.credlyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full"
      >
        <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
          {/* Gradient top bar */}
          <div
            className={`h-1.5 bg-gradient-to-r ${cert.color}`}
          />

          <div className="p-6 flex flex-col h-full">
            {/* Badge image */}
            <div className="flex justify-center mb-5">
              <div
                className={`relative w-32 h-32 transition-all duration-500 ${
                  isVisible ? "scale-100 rotate-0" : "scale-0 rotate-12"
                }`}
                style={{ transitionDelay: `${index * 100 + 200}ms` }}
              >
                <Image
                  src={cert.badge}
                  alt={`${cert.name} certification badge`}
                  fill
                  className="object-contain drop-shadow-lg"
                />
              </div>
            </div>

            {/* Cert info */}
            <div className="text-center flex-1 flex flex-col">
              <h3 className="text-xl font-bold mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {cert.name}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                {t(`certifications.${cert.key}.fullName`)}
              </p>

              {/* Issuer */}
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">
                {t(`certifications.${cert.key}.issuer`)}
              </p>

              {/* Date */}
              <div className="mt-auto pt-4 flex items-center justify-center gap-1.5 text-sm">
                <Calendar className="h-3.5 w-3.5 text-gray-400" />
                <span className="text-gray-500 dark:text-gray-400">
                  {t("certifications.earnedOn")}:
                </span>
                <span className="font-medium text-blue-600 dark:text-blue-400">
                  {cert.date}
                </span>
              </div>

              {/* Verify link */}
              <div className="mt-3 flex items-center justify-center gap-1 text-xs text-blue-500 group-hover:underline">
                {t("common.verifyOnCredly")}
                <ExternalLink className="h-3 w-3" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default function CertificationsPage() {
  const t = useTranslations();
  const [activeCategory, setActiveCategory] = useState<Category | "all">("all");

  const { ref: headerRef, isVisible: headerVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
    });

  const filteredCerts =
    activeCategory === "all"
      ? certifications
      : certifications.filter((c) => c.category === activeCategory);

  const categoryLabels: Record<Category | "all", string> = {
    all: t("certifications.allCategories"),
    kubernetes: t("certifications.categoryKubernetes"),
    cloud: t("certifications.categoryCloud"),
    linux: t("certifications.categoryLinux"),
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div
          ref={headerRef}
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
        >
          <div
            className={`transition-all duration-700 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {/* Back link */}
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("certifications.backHome")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Award className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                {t("certifications.title")}
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {t("certifications.pageSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            {(["all", ...categories] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}

            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {t("certifications.totalCerts", { count: filteredCerts.length })}
            </span>
          </div>
        </div>
      </section>

      {/* Certifications Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCerts.map((cert, index) => (
              <CertificationDetailCard
                key={cert.key}
                cert={cert}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
