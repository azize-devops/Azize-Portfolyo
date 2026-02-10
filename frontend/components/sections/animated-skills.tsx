"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const skills = [
  {
    name: "Kubernetes",
    logo: "/logos/kubernetes.svg",
    level: 90,
    docUrl: "https://kubernetes.io/docs/",
  },
  {
    name: "Docker",
    logo: "/logos/docker.svg",
    level: 95,
    docUrl: "https://docs.docker.com/",
  },
  {
    name: "AWS",
    logo: "/logos/aws.svg",
    level: 35,
    docUrl: "https://docs.aws.amazon.com/",
  },
  {
    name: "Terraform",
    logo: "/logos/terraform.svg",
    level: 30,
    docUrl: "https://developer.hashicorp.com/terraform/docs",
  },
  {
    name: "Linux",
    logo: "/logos/linux.svg",
    level: 90,
    docUrl: "https://www.kernel.org/doc/html/latest/",
  },
  {
    name: "Git",
    logo: "/logos/git.svg",
    level: 95,
    docUrl: "https://git-scm.com/doc",
  },
];

function SkillCard({
  skill,
  index,
}: {
  skill: (typeof skills)[number];
  index: number;
}) {
  const { ref, isVisible } = useScrollAnimation<HTMLAnchorElement>({
    threshold: 0.2,
    triggerOnce: false,
  });

  return (
    <Link
      ref={ref}
      href={skill.docUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-700 ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      {/* Logo */}
      <div
        className={`relative w-12 h-12 mb-3 transition-all duration-500 group-hover:scale-110 ${
          isVisible ? "scale-100 rotate-0" : "scale-0 -rotate-180"
        }`}
        style={{ transitionDelay: `${index * 80 + 150}ms` }}
      >
        <Image
          src={skill.logo}
          alt={`${skill.name} logo`}
          fill
          className="object-contain"
        />
      </div>

      {/* Name */}
      <span className="font-medium text-sm">{skill.name}</span>

      {/* Progress bar */}
      <div className="w-full mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 ease-out"
          style={{
            width: isVisible ? `${skill.level}%` : "0%",
            transitionDelay: `${index * 80 + 300}ms`,
          }}
        />
      </div>

      {/* Level percentage */}
      <span
        className={`text-xs text-gray-500 mt-1 transition-all duration-500 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        style={{ transitionDelay: `${index * 80 + 500}ms` }}
      >
        {skill.level}%
      </span>

      <ExternalLink className="h-3 w-3 mt-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
    </Link>
  );
}

export function AnimatedSkills() {
  const t = useTranslations();
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({
      threshold: 0.1,
      triggerOnce: false,
    });

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold">{t("skills.title")}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {t("skills.subtitle")}
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {skills.map((skill, index) => (
            <SkillCard key={skill.name} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
