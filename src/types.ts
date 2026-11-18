export interface Project {
  id: string;
  title: string;
  badge?: string;
  subtitle: string;
  summary: string;
  techStack: string[];
  featuredTag?: string;
  links: {
    github?: string;
    demo?: string;
    docs?: string;
  };
  metrics?: { label: string; value: string }[];
  modalDetails: {
    overview: string;
    architectureOverview: string;
    architectureHighlights: string[];
    codeSnippet?: {
      language: string;
      filename: string;
      code: string;
    };
    techBreakdown: { category: string; items: string[] }[];
  };
}

export interface Milestone {
  id: string;
  year: string;
  title: string;
  institution: string;
  description: string;
  badges: string[];
  highlight?: string;
}

export interface SkillCategory {
  title: string;
  skills: {
    name: string;
    level: string;
    icon?: string;
    highlight?: boolean;
  }[];
}
