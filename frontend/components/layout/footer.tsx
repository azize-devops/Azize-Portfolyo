"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Github, Linkedin, Mail, Terminal } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/azize-devops",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/azize-dursun-",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:azizecakir16@gmail.com",
    icon: Mail,
  },
];

export function Footer() {
  const t = useTranslations("common");
  const tFooter = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: t("blog"), href: "/blog" },
    { name: t("certifications"), href: "/certifications" },
    { name: t("projects"), href: "/projects" },
    { name: t("contact"), href: "/contact" },
  ];

  return (
    <footer className="border-t border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Terminal className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Ops Chronicle
              </span>
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {tFooter("description")}
              <br />
              {tFooter("techStack")}
            </p>
          </div>

          {/* Links */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("pages")}
            </h3>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              {t("followMe")}
            </h3>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-gray-200 hover:bg-gray-300 dark:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
                  aria-label={link.name}
                >
                  <link.icon className="h-5 w-5 text-gray-700 dark:text-gray-300" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-800">
          <p className="text-center text-sm text-gray-500 dark:text-gray-500">
            &copy; {currentYear} Ops Chronicle. {t("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
