"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ArrowRight, ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const certifications = [
  {
    name: "CKA",
    key: "cka",
    date: "Ocak 2026",
    color: "from-blue-500 to-blue-600",
    badge:
      "https://images.credly.com/images/8b8ed108-e77d-4396-ac59-2504583b9d54/cka_from_cncfsite__281_29.png",
    credlyUrl:
      "https://www.credly.com/badges/81a41ad1-87a9-47aa-a9cb-9dc2c87c3da9/public_url",
  },
  {
    name: "CKAD",
    key: "ckad",
    date: "Ocak 2026",
    color: "from-cyan-500 to-cyan-600",
    badge:
      "https://images.credly.com/images/cc8adc83-1dc6-4d57-8e20-22171247e052/blob",
    credlyUrl:
      "https://www.credly.com/badges/06c5a9b5-202c-4569-998d-e5f993ea28e4/public_url",
  },
  {
    name: "LFS158",
    key: "lfs158",
    date: "2025",
    color: "from-purple-500 to-purple-600",
    badge:
      "https://images.credly.com/images/4b5a8636-c554-482d-bbdc-7925fb3624c3/blob",
    credlyUrl:
      "https://www.credly.com/badges/18921f02-d1cc-4922-a653-f1c071f6d0b7/public_url",
  },
  {
    name: "AWS GenAI",
    key: "awsGenai",
    date: "2025",
    color: "from-green-500 to-green-600",
    badge:
      "https://images.credly.com/images/e50c657a-edd9-4c93-b1cf-2b6634b54abf/blob",
    credlyUrl:
      "https://www.credly.com/badges/09090929-953a-413c-88bf-712bd07fb375/public_url",
  },
];

function CertificationCard({
  cert,
  index,
}: {
  cert: (typeof certifications)[number];
  index: number;
}) {
  const t = useTranslations();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    triggerOnce: false,
  });

  const CardContent = (
    <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-lg hover:scale-[1.02] transition-all h-full">
      <div
        className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cert.color}`}
      />
      <div className="flex flex-col items-center text-center h-full">
        <div
          className={`relative w-28 h-28 mb-4 transition-all duration-500 ${
            isVisible ? "scale-100 rotate-0" : "scale-0 rotate-12"
          }`}
          style={{ transitionDelay: `${index * 100 + 200}ms` }}
        >
          <Image
            src={cert.badge}
            alt={`${cert.name} certification badge`}
            fill
            className="object-contain"
          />
        </div>

        <h3 className="text-xl font-bold">{cert.name}</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          {t(`certifications.${cert.key}.fullName`)}
        </p>

        <div className="mt-auto pt-4">
          <p className="text-xs text-gray-400">
            {t(`certifications.${cert.key}.issuer`)}
          </p>
          <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
            {cert.date}
          </p>
        </div>

        {cert.credlyUrl && (
          <span className="mt-3 text-xs text-blue-500 group-hover:underline flex items-center gap-1">
            {t("common.verifyOnCredly")}
            <ExternalLink className="h-3 w-3" />
          </span>
        )}
      </div>
    </div>
  );

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {cert.credlyUrl ? (
        <Link href={cert.credlyUrl} target="_blank" rel="noopener noreferrer">
          {CardContent}
        </Link>
      ) : (
        CardContent
      )}
    </div>
  );
}

export function AnimatedCertifications() {
  const t = useTranslations();
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({
      threshold: 0.1,
      triggerOnce: false,
    });

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold">{t("certifications.title")}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {t("certifications.subtitle")}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {certifications.map((cert, index) => (
            <CertificationCard key={cert.name} cert={cert} index={index} />
          ))}
        </div>

        {/* View All Link */}
        <div
          className={`text-center mt-8 transition-all duration-700 delay-500 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-4"
          }`}
        >
          <Link
            href="/certifications"
            className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("certifications.viewAll")}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
