export interface Certification {
  name: string;
  key: string;
  date: string;
  color: string;
  badge: string;
  credlyUrl: string;
  category: "kubernetes" | "cloud" | "linux";
}

export const certifications: Certification[] = [
  {
    name: "CKA",
    key: "cka",
    date: "Ocak 2026",
    color: "from-blue-500 to-blue-600",
    badge: "/badges/cka-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/81a41ad1-87a9-47aa-a9cb-9dc2c87c3da9/public_url",
    category: "kubernetes",
  },
  {
    name: "CKAD",
    key: "ckad",
    date: "Ocak 2026",
    color: "from-cyan-500 to-cyan-600",
    badge: "/badges/ckad-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/06c5a9b5-202c-4569-998d-e5f993ea28e4/public_url",
    category: "kubernetes",
  },
  {
    name: "LFS158",
    key: "lfs158",
    date: "2025",
    color: "from-purple-500 to-purple-600",
    badge: "/badges/lfs158-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/18921f02-d1cc-4922-a653-f1c071f6d0b7/public_url",
    category: "linux",
  },
  {
    name: "AWS GenAI",
    key: "awsGenai",
    date: "Şubat 2026",
    color: "from-green-500 to-green-600",
    badge: "/badges/aws-genai-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/09090929-953a-413c-88bf-712bd07fb375/public_url",
    category: "cloud",
  },
  {
    name: "AWS Cloud 101",
    key: "awsCloud101",
    date: "Şubat 2026",
    color: "from-orange-500 to-orange-600",
    badge: "/badges/aws-cloud101-badge.png",
    credlyUrl:
      "https://www.credly.com/badges/6f46a887-390e-49e3-9862-1e5f64eb1c55/public_url",
    category: "cloud",
  },
];

export const categories = ["kubernetes", "cloud", "linux"] as const;
export type Category = (typeof categories)[number];
