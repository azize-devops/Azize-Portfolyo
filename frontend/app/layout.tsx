import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Azize | DevOps Engineer",
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
  ],
  authors: [{ name: "Azize" }],
  openGraph: {
    title: "Azize | DevOps Engineer",
    description: "DevOps yolculugum, sertifikalarim ve projelerim",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <body className="min-h-screen bg-[var(--background)] text-[var(--foreground)] antialiased">
        {children}
      </body>
    </html>
  );
}
