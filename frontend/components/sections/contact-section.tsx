"use client";

import { useTranslations } from "next-intl";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const socialLinks = [
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/azize-devops",
    color: "hover:text-foreground",
  },
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/azize-dursun-",
    color: "hover:text-blue-600",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://x.com/azize_devops",
    color: "hover:text-sky-500",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:azizecakir16@gmail.com",
    color: "hover:text-red-500",
  },
];

export function ContactSection() {
  const t = useTranslations("contact");
  const { ref: headerRef, isVisible: headerVisible } =
    useScrollAnimation<HTMLDivElement>();
  const { ref: cardRef, isVisible: cardVisible } =
    useScrollAnimation<HTMLDivElement>();

  return (
    <section id="contact" className="py-24 bg-gray-50/50 dark:bg-gray-900/50">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          {/* Section Header */}
          <div
            ref={headerRef}
            className={`transition-all duration-700 ${
              headerVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <Badge variant="outline" className="mb-4">
              {t("badge")}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              {t("title")}{" "}
              <span className="text-blue-600 dark:text-blue-400">
                {t("titleHighlight")}
              </span>
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-12">
              {t("subtitle")}
            </p>
          </div>

          {/* Contact Card */}
          <Card
            ref={cardRef}
            className={`border bg-white dark:bg-gray-900 transition-all duration-700 delay-200 ${
              cardVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-10"
            }`}
          >
            <CardContent className="p-8">
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-5 py-3 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 ${link.color} transition-all duration-300 hover:bg-blue-50 dark:hover:bg-gray-700 hover:scale-105`}
                  >
                    <link.icon className="w-5 h-5" />
                    <span className="font-medium">{link.name}</span>
                  </a>
                ))}
              </div>

              <div className="border-t border-gray-200 dark:border-gray-800 pt-8">
                <p className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                  {t("orSendEmail")}
                </p>
                <Button size="lg" className="gap-2" asChild>
                  <a href="mailto:azizecakir16@gmail.com">
                    <Mail className="w-4 h-4" />
                    azizecakir16@gmail.com
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
