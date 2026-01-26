import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Azize | DevOps Engineer",
    template: "%s | Azize",
  },
  description:
    "DevOps yolculugum, sertifikalarim ve projelerim. CKA, CKAD, AWS sertifikali DevOps muhendisi.",
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
  ],
  authors: [{ name: "Azize" }],
  creator: "Azize",
  openGraph: {
    title: "Azize | DevOps Engineer",
    description: "DevOps yolculugum, sertifikalarim ve projelerim",
    url: "https://azize.dev",
    siteName: "Azize.dev",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Azize | DevOps Engineer",
    description: "DevOps yolculugum, sertifikalarim ve projelerim",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider>
          <div className="flex min-h-screen flex-col bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
