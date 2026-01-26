"use client";

import { useTranslations } from "next-intl";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const timelineKeys = ["linux", "docker", "kubernetes", "certs", "aws"] as const;

function TimelineItem({
  itemKey,
  index,
}: {
  itemKey: (typeof timelineKeys)[number];
  index: number;
}) {
  const t = useTranslations();
  const { ref, isVisible } = useScrollAnimation<HTMLDivElement>({
    threshold: 0.2,
    rootMargin: "-50px",
  });

  return (
    <div
      ref={ref}
      className={`relative pl-12 pb-8 last:pb-0 transition-all duration-700 ease-out ${
        isVisible
          ? "opacity-100 translate-x-0"
          : "opacity-0 -translate-x-8"
      }`}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Timeline dot with pulse animation */}
      <div
        className={`absolute left-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center transition-all duration-500 ${
          isVisible ? "scale-100" : "scale-0"
        }`}
        style={{ transitionDelay: `${index * 150 + 200}ms` }}
      >
        <div
          className={`w-3 h-3 rounded-full bg-white ${
            isVisible ? "animate-ping-slow" : ""
          }`}
        />
        <div className="absolute w-3 h-3 rounded-full bg-white" />
      </div>

      {/* Content card */}
      <div
        className={`bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 transition-all duration-500 hover:shadow-lg hover:scale-[1.02] ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
        style={{ transitionDelay: `${index * 150 + 100}ms` }}
      >
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {t(`timeline.items.${itemKey}.date`)}
        </span>
        <h3 className="text-lg font-semibold mt-1">
          {t(`timeline.items.${itemKey}.title`)}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
          {t(`timeline.items.${itemKey}.description`)}
        </p>
      </div>
    </div>
  );
}

export function AnimatedTimeline() {
  const t = useTranslations();
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({
      threshold: 0.1,
    });

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header with fade-in */}
        <div
          className={`text-center mb-12 transition-all duration-700 ${
            sectionVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-3xl font-bold">{t("timeline.title")}</h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400">
            {t("timeline.subtitle")}
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Animated timeline line */}
            <div
              className={`absolute left-4 top-0 w-0.5 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600 transition-all duration-1000 ease-out origin-top ${
                sectionVisible ? "h-full scale-y-100" : "h-0 scale-y-0"
              }`}
              style={{ transitionDelay: "200ms" }}
            />
            {/* Background line */}
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

            {timelineKeys.map((key, index) => (
              <TimelineItem key={key} itemKey={key} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
