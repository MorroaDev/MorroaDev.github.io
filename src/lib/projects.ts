export type Project = {
  name: string;
  description: string;
  tags: string[];
  href: string;
  repository?: string;
  status: "进行中" | "维护中" | "已归档";
  year: string;
};

export const projects: Project[] = [
  {
    name: "Morroa Blog",
    description: "你现在看到的这个博客。基于 Next.js 与 Markdown 构建，支持静态导出和双平台部署。",
    tags: ["Next.js", "TypeScript", "Tailwind CSS"],
    href: "https://github.com/morroa/morroa.com",
    repository: "https://github.com/morroa/morroa.com",
    status: "进行中",
    year: "2026",
  },
  {
    name: "Open Source Notes",
    description: "一个关于 Web 开发、工程效率和开源协作的个人知识库。",
    tags: ["Notes", "Open Source"],
    href: "https://github.com/morroa",
    status: "维护中",
    year: "2025",
  },
  {
    name: "Tiny Toolbox",
    description: "一组轻量、无依赖的前端工具函数集合。",
    tags: ["JavaScript", "Utilities"],
    href: "https://github.com/morroa",
    repository: "https://github.com/morroa",
    status: "已归档",
    year: "2024",
  },
];
