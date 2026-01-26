"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const timelineItems = [
  { key: "linux", tag: "linux" },
  { key: "docker", tag: "docker" },
  { key: "kubernetes", tag: "kubernetes" },
  { key: "certs", tag: "certifications" },
  { key: "aws", tag: "aws" },
] as const;

function TimelineItem({
  item,
  index,
}: {
  item: (typeof timelineItems)[number];
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

  const CardContent = (
    <div className="group bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800 hover:shadow-lg hover:scale-[1.02] hover:border-blue-300 dark:hover:border-blue-600 transition-all duration-300 cursor-pointer">
      <div className="flex items-start justify-between">
        <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          {t(`timeline.items.${item.key}.date`)}
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
      </div>
      <h3 className="text-lg font-semibold mt-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
        {t(`timeline.items.${item.key}.title`)}
      </h3>
      <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
        {t(`timeline.items.${item.key}.description`)}
      </p>
      <span className="inline-block mt-2 text-xs text-blue-500 group-hover:underline">
        {t("timeline.viewPosts")}
      </span>
    </div>
  );

  return (
    <div
      ref={ref}
      className="relative flex items-center mb-12 last:mb-0"
    >
      {/* Left side content */}
      <div className={`w-[calc(50%-20px)] ${isRight ? "pr-6" : "pr-6"}`}>
        {!isRight && (
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-12"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link href={`/blog?tag=${item.tag}`}>
              {CardContent}
            </Link>
          </div>
        )}
      </div>

      {/* Center dot */}
      <div className="relative z-10 flex items-center justify-center w-10 h-10">
        {/* Horizontal connector line - left */}
        <div
          className={`absolute right-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-l from-blue-500 to-cyan-400 transition-all duration-500 origin-right ${
            isVisible && !isRight ? "w-6" : "w-0"
          }`}
          style={{ transitionDelay: `${index * 100 + 100}ms` }}
        />
        {/* Horizontal connector line - right */}
        <div
          className={`absolute left-1/2 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500 origin-left ${
            isVisible && isRight ? "w-6" : "w-0"
          }`}
          style={{ transitionDelay: `${index * 100 + 100}ms` }}
        />
        {/* Dot */}
        <div
          className={`w-5 h-5 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center transition-all duration-500 ${
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

      {/* Right side content */}
      <div className={`w-[calc(50%-20px)] ${isRight ? "pl-6" : "pl-6"}`}>
        {isRight && (
          <div
            className={`transition-all duration-700 ease-out ${
              isVisible
                ? "opacity-100 translate-x-0"
                : "opacity-0 translate-x-12"
            }`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <Link href={`/blog?tag=${item.tag}`}>
              {CardContent}
            </Link>
          </div>
        )}
      </div>
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

            {timelineItems.map((item, index) => (
              <TimelineItem key={item.key} item={item} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
