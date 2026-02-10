export interface ProjectFeature {
  key: string;
  icon: string;
}

export interface TechStackItem {
  name: string;
  category: string;
}

export interface Project {
  slug: string;
  key: string;
  tags: string[];
  color: string;
  repoUrl: string;
  liveUrl?: string;
  status: "active" | "completed" | "wip";
  features: ProjectFeature[];
  techStack: TechStackItem[];
}

export const projects: Project[] = [
  {
    slug: "azize-portfolyo",
    key: "azizePortfolyo",
    tags: ["kubernetes", "helmfile", "argocd", "gitea", "docker"],
    color: "from-blue-500 to-cyan-600",
    repoUrl: "https://gitea.azizedursun.com/azize-projects/full-stack-devops-portfolio",
    liveUrl: "https://devops.azizedursun.com",
    status: "active",
    features: [
      { key: "helmfileIac", icon: "Layers" },
      { key: "gitopsArgocd", icon: "RefreshCw" },
      { key: "monitoringStack", icon: "Activity" },
      { key: "distributedStorage", icon: "HardDrive" },
      { key: "automatedTls", icon: "ShieldCheck" },
      { key: "selfHostedGit", icon: "GitBranch" },
    ],
    techStack: [
      { name: "Kubernetes", category: "orchestration" },
      { name: "Helmfile", category: "orchestration" },
      { name: "Kustomize", category: "orchestration" },
      { name: "ArgoCD", category: "cicd" },
      { name: "Gitea", category: "cicd" },
      { name: "Prometheus", category: "monitoring" },
      { name: "Grafana", category: "monitoring" },
      { name: "Loki", category: "monitoring" },
      { name: "Longhorn", category: "storage" },
      { name: "MinIO", category: "storage" },
      { name: "Cilium", category: "networking" },
      { name: "MetalLB", category: "networking" },
      { name: "Ingress-NGINX", category: "networking" },
      { name: "Cert-Manager", category: "networking" },
      { name: "PostgreSQL", category: "database" },
      { name: "Redis", category: "database" },
    ],
  },
];

export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
);
