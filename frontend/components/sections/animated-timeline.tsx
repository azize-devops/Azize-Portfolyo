"use client";

import { useTranslations } from "next-intl";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useRef, useState } from "react";

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
    threshold: 0.3,
    rootMargin: "-20px",
    triggerOnce: false,
  });

  // Alternate sides: even on left, odd on right
  const isRight = index % 2 === 1;

  return (
    <div
      ref={ref}
      className={`relative flex items-center mb-8 last:mb-0 ${
        isRight ? "flex-row-reverse" : ""
      }`}
    >
      {/* Content card */}
      <div
        className={`w-5/12 transition-all duration-700 ease-out ${
          isVisible
            ? "opacity-100 translate-x-0"
            : isRight
            ? "opacity-0 translate-x-12"
            : "opacity-0 -translate-x-12"
        }`}
        style={{ transitionDelay: `${index * 100}ms` }}
      >
        <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-[1.02] transition-all duration-300">
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

      {/* Center dot and connector */}
      <div className="w-2/12 flex justify-center relative">
        {/* Horizontal connector line */}
        <div
          className={`absolute top-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-500 transition-all duration-500 ${
            isVisible ? "w-full" : "w-0"
          } ${isRight ? "right-1/2 origin-right" : "left-1/2 origin-left"}`}
          style={{ transitionDelay: `${index * 100 + 100}ms` }}
        />
        {/* Center dot */}
        <div
          className={`relative z-10 w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center transition-all duration-500 ${
            isVisible ? "scale-100" : "scale-0"
          }`}
          style={{ transitionDelay: `${index * 100 + 150}ms` }}
        >
          <div
            className={`w-2 h-2 rounded-full bg-white ${
              isVisible ? "animate-ping-slow" : ""
            }`}
          />
          <div className="absolute w-2 h-2 rounded-full bg-white" />
        </div>
      </div>

      {/* Empty space on opposite side */}
      <div className="w-5/12" />
    </div>
  );
}

function useTimelineProgress() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const containerTop = rect.top;
      const containerBottom = rect.bottom;
      const containerHeight = rect.height;

      if (containerBottom < 0 || containerTop > windowHeight) {
        setProgress(containerTop > windowHeight ? 0 : 1);
        return;
      }

      const visibleTop = Math.max(0, windowHeight - containerTop);
      const totalScrollDistance = containerHeight + windowHeight * 0.5;
      const currentProgress = Math.min(1, Math.max(0, visibleTop / totalScrollDistance));

      setProgress(currentProgress);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return { containerRef, progress };
}

export function AnimatedTimeline() {
  const t = useTranslations();
  const { ref: sectionRef, isVisible: sectionVisible } =
    useScrollAnimation<HTMLElement>({
      threshold: 0.05,
      triggerOnce: false,
    });
  const { containerRef, progress } = useTimelineProgress();

  return (
    <section ref={sectionRef} className="py-20 bg-white dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div
          className={`text-center mb-16 transition-all duration-700 ${
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

        <div className="max-w-4xl mx-auto">
          <div className="relative" ref={containerRef}>
            {/* Center vertical line - background */}
            <div className="absolute left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-gray-200 dark:bg-gray-800" />

            {/* Center vertical line - animated gradient */}
            <div
              className="absolute left-1/2 top-0 w-0.5 -translate-x-1/2 bg-gradient-to-b from-blue-500 via-cyan-500 to-blue-600 origin-top transition-transform duration-100"
              style={{
                height: "100%",
                transform: `translateX(-50%) scaleY(${progress})`,
              }}
            />

            {timelineKeys.map((key, index) => (
              <TimelineItem key={key} itemKey={key} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
