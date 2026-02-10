"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";
import {
  ArrowLeft,
  ExternalLink,
  GitBranch,
  Layers,
  RefreshCw,
  Activity,
  HardDrive,
  ShieldCheck,
  Server,
} from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { projects, type Project } from "@/lib/projects-data";

const featureIconMap: Record<string, typeof Server> = {
  Layers,
  RefreshCw,
  Activity,
  HardDrive,
  ShieldCheck,
  GitBranch,
};

const categoryColors: Record<string, string> = {
  orchestration:
    "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300",
  cicd: "bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300",
  monitoring:
    "bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300",
  storage:
    "bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300",
  networking:
    "bg-cyan-100 dark:bg-cyan-900/30 text-cyan-700 dark:text-cyan-300",
  database:
    "bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300",
};

function StatusBadge({
  status,
  t,
}: {
  status: Project["status"];
  t: ReturnType<typeof useTranslations>;
}) {
  const config = {
    active: {
      label: t("projects.statusActive"),
      classes:
        "bg-white/20 text-white border border-white/30",
    },
    completed: {
      label: t("projects.statusCompleted"),
      classes:
        "bg-white/20 text-white border border-white/30",
    },
    wip: {
      label: t("projects.statusWip"),
      classes:
        "bg-white/20 text-white border border-white/30",
    },
  };

  const { label, classes } = config[status];

  return (
    <span className={`px-3 py-1 text-sm font-medium rounded-full ${classes}`}>
      {label}
    </span>
  );
}

export default function ProjectDetailPage() {
  const params = useParams();
  const t = useTranslations();
  const slug = params.slug as string;
  const project = projects.find((p) => p.slug === slug);

  const { ref: heroRef, isVisible: heroVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: aboutRef, isVisible: aboutVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: featuresRef, isVisible: featuresVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });
  const { ref: techRef, isVisible: techVisible } =
    useScrollAnimation<HTMLDivElement>({ threshold: 0.1 });

  if (!project) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">404</h1>
          <Link
            href="/projects"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            {t("projects.backToProjects")}
          </Link>
        </div>
      </main>
    );
  }

  const techByCategory = project.techStack.reduce(
    (acc, item) => {
      if (!acc[item.category]) acc[item.category] = [];
      acc[item.category].push(item);
      return acc;
    },
    {} as Record<string, typeof project.techStack>
  );

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero */}
      <section
        className={`relative overflow-hidden bg-gradient-to-br ${project.color}`}
      >
        <div className="absolute inset-0 bg-black/20" />
        <div
          ref={heroRef}
          className="relative mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16 sm:py-24"
        >
          <div
            className={`transition-all duration-700 ${
              heroVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 text-white/80 hover:text-white mb-8 transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              {t("projects.backToProjects")}
            </Link>

            <div className="flex items-center gap-3 mb-4">
              <StatusBadge status={project.status} t={t} />
            </div>

            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
              {t(`projects.${project.key}.name`)}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mb-8">
              {t(`projects.${project.key}.description`)}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium backdrop-blur-sm transition-all border border-white/20"
              >
                <GitBranch className="h-5 w-5" />
                {t("projects.viewRepo")}
              </a>
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-gray-900 rounded-xl font-medium hover:bg-white/90 transition-all"
                >
                  <ExternalLink className="h-5 w-5" />
                  {t("projects.viewLive")}
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="py-16">
        <div
          ref={aboutRef}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <div
            className={`transition-all duration-700 ${
              aboutVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-3xl font-bold mb-6">
              {t("projects.about")}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              {t(`projects.${project.key}.longDescription`)}
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white dark:bg-gray-900">
        <div
          ref={featuresRef}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <h2
            className={`text-3xl font-bold mb-10 transition-all duration-700 ${
              featuresVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {t("projects.keyFeatures")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {project.features.map((feature, index) => {
              const Icon = featureIconMap[feature.icon] || Server;
              return (
                <div
                  key={feature.key}
                  className={`flex gap-4 p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950 transition-all duration-700 ${
                    featuresVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 100}ms` }}
                >
                  <div
                    className={`flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br ${project.color} flex items-center justify-center text-white`}
                  >
                    <Icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1">
                      {t(
                        `projects.${project.key}.features.${feature.key}.title`
                      )}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {t(
                        `projects.${project.key}.features.${feature.key}.description`
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16">
        <div
          ref={techRef}
          className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8"
        >
          <h2
            className={`text-3xl font-bold mb-10 transition-all duration-700 ${
              techVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {t("projects.techStack")}
          </h2>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700 ${
              techVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            {Object.entries(techByCategory).map(([category, items]) => (
              <div
                key={category}
                className="p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900"
              >
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400 mb-4">
                  {t(
                    `projects.category${category.charAt(0).toUpperCase() + category.slice(1)}`
                  )}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <span
                      key={item.name}
                      className={`px-3 py-1.5 text-sm font-medium rounded-lg ${categoryColors[category]}`}
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
