export type SkillGroups = Record<string, string[]>;

export interface SiteConfigShape {
  name: string;
  title: string;
  email: string;
  github: string;
  linkedin: string;
  resumeUrl: string;
  siteUrl: string;
  skills: SkillGroups;
  about: string;
}

export const siteConfig: SiteConfigShape = {
  name: "陈明远",
  title: "前端开发工程师 · 3 年经验",
  email: "chenmingyuan@example.com",
  github: "https://github.com/chenmingyuan",
  linkedin: "https://www.linkedin.com/in/chenmingyuan",
  resumeUrl: "/resume/resume.pdf",
  siteUrl: "https://portfolio-alpha-wheat-17.vercel.app",
  skills: {
    语言: ["TypeScript", "JavaScript", "HTML / CSS", "Python"],
    框架: ["React", "Next.js", "Vue 3", "Tailwind CSS"],
    工具: ["Git", "Vite", "Figma", "Docker"],
  },
  about:
    "你好，我是一名专注 Web 前端开发的三年前端工程师，喜欢把复杂的产品需求拆解成清晰、可维护的界面实现。日常主要使用 React 与 Next.js 构建项目，也热衷于打磨交互细节和性能体验。工作之余会写一些技术笔记，并参与开源社区的组件与文档贡献。",
};

export type SiteConfig = typeof siteConfig;
