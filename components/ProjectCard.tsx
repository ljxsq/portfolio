import Image from "next/image";
import Link from "next/link";

import type { Project } from "@/lib/projects";

export interface ProjectCardProps {
  project: Project;
  slug: string;
}

function GitHubIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M15 22v-4a4.8 4.8 0 0 1-1.03-3.28c3.15-.35 6.45-1.55 6.45-6.95 0-1.54-.55-2.8-1.45-3.8.15-.36.65-1.8-.15-3.75 0 0-1.35.45-3.7 1.8-1.1-.3-2.3-.45-3.45-.45s-2.35.15-3.45.45c-2.35-1.35-3.7-1.8-3.7-1.8-.8 1.95-.3 3.39-.15 3.75-.9 1-1.45 2.26-1.45 3.8 0 5.4 3.3 6.6 6.45 6.95A4.8 4.8 0 0 1 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <path d="M15 3h6v6" />
      <path d="M10 14 21 3" />
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h6" />
    </svg>
  );
}

const actionLinkClassName =
  "inline-flex h-9 w-9 items-center justify-center rounded-full border border-black/[.08] bg-background/90 text-foreground backdrop-blur-sm transition-colors hover:bg-black/[.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[.145] dark:hover:bg-white/[.12]";

export default function ProjectCard({ project, slug }: ProjectCardProps) {
  const visibleTechStack = project.techStack.slice(0, 6);
  const extraTechCount = Math.max(project.techStack.length - visibleTechStack.length, 0);
  const hasActions = Boolean(project.previewUrl || project.repoUrl);

  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-background shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-within:-translate-y-1 focus-within:shadow-lg dark:border-white/[.145] dark:hover:shadow-black/40 dark:focus-within:shadow-black/40">
      {/* 整卡跳转层：铺满卡片但位于操作图标层之下，避免与图标链接嵌套 */}
      <Link
        href={`/projects/${slug}`}
        aria-label={`查看项目 ${project.title}`}
        className="absolute inset-0 z-10 rounded-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-foreground/60"
      />

      {project.coverImage.trim() !== "" ? (
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-100 dark:bg-zinc-900">
          <Image
            src={project.coverImage}
            alt={project.title}
            fill
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            loading="lazy"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="flex aspect-[16/10] w-full items-center justify-center bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-900 dark:text-zinc-400">
          暂无封面
        </div>
      )}

      <div className="flex flex-col p-5">
        <h3 className="text-lg font-semibold tracking-tight">{project.title}</h3>
        <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          {project.summary}
        </p>

        {visibleTechStack.length > 0 && (
          <ul aria-label="技术栈" className="mt-4 flex flex-wrap items-center gap-1.5">
            {visibleTechStack.map((tech) => (
              <li
                key={tech}
                className="whitespace-nowrap rounded-full border border-black/[.08] bg-black/[.03] px-2.5 py-1 text-xs font-medium text-zinc-700 dark:border-white/[.145] dark:bg-white/[.06] dark:text-zinc-300"
              >
                {tech}
              </li>
            ))}
            {extraTechCount > 0 && (
              <li className="whitespace-nowrap rounded-full border border-dashed border-black/[.12] px-2.5 py-1 text-xs font-medium text-zinc-500 dark:border-white/[.2] dark:text-zinc-400">
                +{extraTechCount}
              </li>
            )}
          </ul>
        )}
      </div>

      {hasActions && (
        <div className="absolute right-3 top-3 z-20 flex items-center gap-2">
          {project.previewUrl && (
            <a
              href={project.previewUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`查看 ${project.title} 在线预览`}
              title="在线预览"
              className={actionLinkClassName}
            >
              <ExternalLinkIcon />
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`查看 ${project.title} 源码仓库`}
              title="源码仓库"
              className={actionLinkClassName}
            >
              <GitHubIcon />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
