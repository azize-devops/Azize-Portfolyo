export interface Project {
  slug: string;
  key: string;
  tags: string[];
  color: string;
  repoUrl: string;
  liveUrl?: string;
  status: "active" | "completed" | "wip";
}

export const projects: Project[] = [
  {
    slug: "azize-portfolyo",
    key: "azizePortfolyo",
    tags: ["kubernetes", "helmfile", "argocd", "gitea", "docker"],
    color: "from-blue-500 to-cyan-600",
    repoUrl: "https://gitea.azizedursun.com/azize-projects/azize-porfolyo",
    liveUrl: "https://devops.azizedursun.com",
    status: "active",
  },
];

export const allProjectTags = Array.from(
  new Set(projects.flatMap((p) => p.tags))
);
