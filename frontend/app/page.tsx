import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Award, BookOpen, ExternalLink } from "lucide-react";
import { ContactSection } from "@/components/sections/contact-section";

const certifications = [
  {
    name: "CKA",
    fullName: "Certified Kubernetes Administrator",
    issuer: "CNCF / Linux Foundation",
    date: "Ocak 2026",
    color: "from-blue-500 to-blue-600",
    badge: "/badges/cka-badge.svg",
    credlyUrl: "", // Credly link will be added later
  },
  {
    name: "CKAD",
    fullName: "Certified Kubernetes Application Developer",
    issuer: "CNCF / Linux Foundation",
    date: "Ocak 2026",
    color: "from-cyan-500 to-cyan-600",
    badge: "/badges/ckad-badge.svg",
    credlyUrl: "", // Credly link will be added later
  },
  {
    name: "AWS CCP",
    fullName: "AWS Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "Ocak 2026",
    color: "from-orange-500 to-orange-600",
    badge: "/badges/aws-ccp-badge.svg",
    credlyUrl: "", // Credly link will be added later
  },
];

const skills = [
  {
    name: "Kubernetes",
    logo: "/logos/kubernetes.svg",
    level: 90,
    docUrl: "https://kubernetes.io/docs/",
  },
  {
    name: "Docker",
    logo: "/logos/docker.svg",
    level: 95,
    docUrl: "https://docs.docker.com/",
  },
  {
    name: "AWS",
    logo: "/logos/aws.svg",
    level: 75,
    docUrl: "https://docs.aws.amazon.com/",
  },
  {
    name: "Terraform",
    logo: "/logos/terraform.svg",
    level: 70,
    docUrl: "https://developer.hashicorp.com/terraform/docs",
  },
  {
    name: "Linux",
    logo: "/logos/linux.svg",
    level: 90,
    docUrl: "https://www.kernel.org/doc/html/latest/",
  },
  {
    name: "Git",
    logo: "/logos/git.svg",
    level: 95,
    docUrl: "https://git-scm.com/doc",
  },
];

const timeline = [
  {
    date: "Ocak 2025",
    title: "Linux Temelleri",
    description: "Bandit Games ile Linux yolculuguna basladim",
  },
  {
    date: "2025",
    title: "Docker & Containerization",
    description: "Container teknolojilerini ogrendim",
  },
  {
    date: "2025",
    title: "Kubernetes",
    description: "Container orchestration dunyasina girdim",
  },
  {
    date: "Ocak 2026",
    title: "CKA & CKAD",
    description: "Kubernetes sertifikalarimi aldim",
  },
  {
    date: "Ocak 2026",
    title: "AWS Cloud",
    description: "Cloud yolculugum devam ediyor",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-gray-900 dark:to-gray-950" />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
              <Award className="h-4 w-4" />
              CKA & CKAD Certified
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Merhaba, ben{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Azize
              </span>
            </h1>

            <p className="mt-6 text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              DevOps Engineer | Kubernetes, Docker, AWS & CI/CD
            </p>

            <p className="mt-4 text-lg text-gray-500 dark:text-gray-500 max-w-2xl mx-auto">
              Linux temelleriyle baslayan yolculugum, Kubernetes ve Cloud
              teknolojileriyle devam ediyor. Bu site, ogrenme surecimi ve
              projelerimi paylastigim platformdur.
            </p>

            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <BookOpen className="h-5 w-5" />
                Blog Yazilari
              </Link>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium transition-colors"
              >
                Projelerim
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Sertifikalarim</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Aldigim profesyonel sertifikalar
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert) => {
              const CardContent = (
                <div className="group relative overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-6 hover:shadow-lg hover:scale-[1.02] transition-all">
                  <div
                    className={`absolute top-0 left-0 w-full h-1 bg-gradient-to-r ${cert.color}`}
                  />
                  <div className="flex flex-col items-center text-center h-full">
                    {/* Badge Image */}
                    <div className="relative w-28 h-28 mb-4">
                      <Image
                        src={cert.badge}
                        alt={`${cert.name} certification badge`}
                        fill
                        className="object-contain"
                      />
                    </div>

                    <h3 className="text-xl font-bold">{cert.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                      {cert.fullName}
                    </p>

                    <div className="mt-auto pt-4">
                      <p className="text-xs text-gray-400">{cert.issuer}</p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {cert.date}
                      </p>
                    </div>

                    {cert.credlyUrl && (
                      <span className="mt-3 text-xs text-blue-500 group-hover:underline flex items-center gap-1">
                        Credly&apos;de Dogrula
                        <ExternalLink className="h-3 w-3" />
                      </span>
                    )}
                  </div>
                </div>
              );

              if (cert.credlyUrl) {
                return (
                  <Link
                    key={cert.name}
                    href={cert.credlyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {CardContent}
                  </Link>
                );
              }

              return <div key={cert.name}>{CardContent}</div>;
            })}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/certifications"
              className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
            >
              Tum sertifikalar
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Teknolojiler</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Calistigim teknolojiler ve araclar
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {skills.map((skill) => (
              <Link
                key={skill.name}
                href={skill.docUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center p-6 rounded-xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:shadow-md hover:border-blue-300 dark:hover:border-blue-600 transition-all"
              >
                <div className="relative w-12 h-12 mb-3 group-hover:scale-110 transition-transform">
                  <Image
                    src={skill.logo}
                    alt={`${skill.name} logo`}
                    fill
                    className="object-contain"
                  />
                </div>
                <span className="font-medium text-sm">{skill.name}</span>
                <div className="w-full mt-3 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full transition-all"
                    style={{ width: `${skill.level}%` }}
                  />
                </div>
                <ExternalLink className="h-3 w-3 mt-2 text-gray-400 group-hover:text-blue-500 transition-colors" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-white dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Yolculugum</h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              DevOps ogrenme sureci
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="relative">
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-800" />

              {timeline.map((item, index) => (
                <div key={index} className="relative pl-12 pb-8 last:pb-0">
                  <div className="absolute left-0 w-8 h-8 rounded-full bg-blue-600 dark:bg-blue-500 flex items-center justify-center">
                    <div className="w-3 h-3 rounded-full bg-white" />
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 border border-gray-200 dark:border-gray-800">
                    <span className="text-sm text-blue-600 dark:text-blue-400 font-medium">
                      {item.date}
                    </span>
                    <h3 className="text-lg font-semibold mt-1">{item.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
