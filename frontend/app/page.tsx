export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-8">
      <div className="max-w-4xl text-center">
        {/* Hero Section */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
          Merhaba, ben{" "}
          <span className="text-primary-600 dark:text-primary-400">Azize</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-400">
          DevOps Engineer | CKA & CKAD Certified | AWS Cloud Practitioner
        </p>
        <p className="mt-4 text-base text-gray-500 dark:text-gray-500">
          Linux, Kubernetes, Docker, CI/CD ve Cloud teknolojileri uzerine
          calisiyorum.
        </p>

        {/* Certifications Preview */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="font-semibold">CKA</p>
            <p className="text-sm text-gray-500">Kubernetes Administrator</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="font-semibold">CKAD</p>
            <p className="text-sm text-gray-500">Kubernetes Developer</p>
          </div>
          <div className="rounded-lg border border-gray-200 bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <p className="font-semibold">AWS CCP</p>
            <p className="text-sm text-gray-500">Cloud Practitioner</p>
          </div>
        </div>

        {/* Navigation Links */}
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          <a
            href="/blog"
            className="rounded-lg bg-primary-600 px-6 py-3 text-white hover:bg-primary-700 transition-colors"
          >
            Blog
          </a>
          <a
            href="/certifications"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
          >
            Sertifikalar
          </a>
          <a
            href="/projects"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
          >
            Projeler
          </a>
          <a
            href="/contact"
            className="rounded-lg border border-gray-300 px-6 py-3 hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800 transition-colors"
          >
            Iletisim
          </a>
        </div>
      </div>
    </main>
  );
}
