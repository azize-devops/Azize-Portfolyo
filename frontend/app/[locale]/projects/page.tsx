"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Server,
  Tag,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useState } from "react";
import {
  projects,
  allProjectTags,
  type Project,
} from "@/lib/projects-data";

const iconMap: Record<string, typeof Server> = {
  Server,
};

function StatusBadge({ status, t }: { status: Project["status"]; t: ReturnType<typeof useTranslations> }) {
  const config = {
    active: {
      label: t("projects.statusActive"),
      classes: "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
    },
    completed: {
      label: t("projects.statusCompleted"),
      classes: "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
    },
    wip: {
      label: t("projects.statusWip"),
      classes: "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-300",
    },
  };

  const { label, classes } = config[status];

  return (
    <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${classes}`}>
      {label}
    </span>
  );
}

function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const t = useTranslations();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.1,
    triggerOnce: false,
  });

  const Icon = iconMap[project.slug] || Server;

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 hover:shadow-xl hover:scale-[1.02] transition-all duration-300 h-full">
        {/* Gradient top bar */}
        <div className={`h-1.5 bg-gradient-to-r ${project.color}`} />

        <div className="p-6 flex flex-col h-full">
          {/* Icon + Status */}
          <div className="flex items-start justify-between mb-4">
            <div
              className={`w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white transition-all duration-500 ${
                isVisible ? "scale-100 rotate-0" : "scale-0 rotate-12"
              }`}
              style={{ transitionDelay: `${index * 100 + 200}ms` }}
            >
              <Icon className="h-6 w-6" />
            </div>
            <StatusBadge status={project.status} t={t} />
          </div>

          {/* Name + Description */}
          <h3 className="text-xl font-bold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {t(`projects.${project.key}.name`)}
          </h3>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 flex-1">
            {t(`projects.${project.key}.description`)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-0.5 text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Links */}
          <div className="flex items-center gap-3 pt-4 border-t border-gray-100 dark:border-gray-800">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              {t("projects.viewRepo")}
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                <ExternalLink className="h-4 w-4" />
                {t("projects.viewLive")}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  const t = useTranslations();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const { ref: headerRef, isVisible: headerVisible } =
    useScrollAnimation<HTMLDivElement>({
      threshold: 0.1,
    });

  const filteredProjects = activeTag
    ? projects.filter((p) => p.tags.includes(activeTag))
    : projects;

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
              {t("projects.backHome")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <Server className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              <h1 className="text-4xl sm:text-5xl font-bold">
                {t("projects.title")}
              </h1>
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl">
              {t("projects.subtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Tag Filter */}
      <section className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-16 z-40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setActiveTag(null)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !activeTag
                  ? "bg-blue-600 text-white shadow-md"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {t("projects.allCategories")}
            </button>
            {allProjectTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveTag(tag)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${
                  activeTag === tag
                    ? "bg-blue-600 text-white shadow-md"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }`}
              >
                <Tag className="h-3 w-3" />
                {tag}
              </button>
            ))}

            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {t("projects.totalProjects", { count: filteredProjects.length })}
            </span>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <ProjectCard
                key={project.slug}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
