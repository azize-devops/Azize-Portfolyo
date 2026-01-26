import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import "../globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { locales, isRtlLocale, type Locale } from "@/i18n/config";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    default: "Ops Chronicle | DevOps Engineer",
    template: "%s | Ops Chronicle",
  },
  description:
    "DevOps journey, certifications and projects. CKA, CKAD, AWS certified DevOps engineer.",
  keywords: [
    "DevOps",
    "Kubernetes",
    "AWS",
    "Docker",
    "CI/CD",
    "CKA",
    "CKAD",
    "Cloud",
    "Linux",
    "Terraform",
    "Ops Chronicle",
  ],
  authors: [{ name: "Ops Chronicle" }],
  creator: "Ops Chronicle",
  openGraph: {
    title: "Ops Chronicle | DevOps Engineer",
    description: "DevOps journey, certifications and projects",
    url: "https://opschronicle.dev",
    siteName: "Ops Chronicle",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ops Chronicle | DevOps Engineer",
    description: "DevOps journey, certifications and projects",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const messages = await getMessages();
  const isRtl = isRtlLocale(locale as Locale);

  return (
    <html lang={locale} dir={isRtl ? "rtl" : "ltr"} suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider>
            <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
