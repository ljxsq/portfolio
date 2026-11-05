import { evaluate } from "@mdx-js/mdx";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import * as jsxRuntime from "react/jsx-runtime";

import { getAllProjects, getProjectBySlug } from "@/lib/projects";
import { siteConfig } from "@/site.config";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  const projects = getAllProjects();

  if (projects.length === 0) {
    // `output: "export"` 要求至少生成一个参数；占位参数会在页面内触发 notFound。
    return [{ slug: "__placeholder__" }];
  }

  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.frontmatter.draft) {
    return {};
  }

  const { title, summary, coverImage } = project.frontmatter;
  const pageTitle = `${title} · ${siteConfig.name}`;

  return {
    title: { absolute: pageTitle },
    description: summary,
    openGraph: {
      title: pageTitle,
      description: summary,
      type: "article",
      locale: "zh_CN",
      siteName: siteConfig.name,
      url: new URL(`/projects/${slug}`, siteConfig.siteUrl).toString(),
      images: coverImage ? [{ url: coverImage, alt: title }] : undefined,
    },
  };
}

function isLocalPreviewUrl(url: string) {
  try {
    const { hostname } = new URL(url);
    return hostname === "localhost" || hostname === "127.0.0.1";
  } catch {
    return false;
  }
}

function ExternalIcon() {
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
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    </svg>
  );
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

const actionLinkClassName =
  "inline-flex items-center gap-2 rounded-full border border-black/[.08] bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-black/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[.145] dark:hover:bg-white/[.06]";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project || project.frontmatter.draft) {
    notFound();
  }

  const {
    title,
    summary,
    period,
    role,
    background,
    techStack,
    results,
    previewUrl,
    repoUrl,
    coverImage,
    gallery,
  } = project.frontmatter;

  const { default: MdxContent } = await evaluate(project.content, {
    ...jsxRuntime,
  });

  const hasBackgroundHeading = /^##\s*项目背景\s*$/m.test(project.content);
  const showBackground = Boolean(background) && !hasBackgroundHeading;
  const localPreview = Boolean(previewUrl && isLocalPreviewUrl(previewUrl));
  const previewLabel = localPreview ? "进入真实项目" : "在线预览";

  return (
    <article className="w-full">
      <div className="mx-auto w-full max-w-4xl px-6 pb-16 pt-10 md:px-8 md:pb-24 md:pt-14">
        <a
          href="/#projects"
          className="inline-flex items-center gap-1.5 rounded-full text-sm font-medium text-zinc-600 transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:text-zinc-400"
        >
          ← 返回项目列表
        </a>

        <header className="mt-6">
          <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            {title}
          </h1>
          {summary && (
            <p className="mt-3 max-w-prose text-lg leading-8 text-zinc-600 dark:text-zinc-400">
              {summary}
            </p>
          )}

          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-600 dark:text-zinc-400">
              {period && <span>{period}</span>}
              {period && role && (
                <span aria-hidden="true" className="text-zinc-400">
                  ·
                </span>
              )}
              {role && <span>{role}</span>}
            </div>

            {(previewUrl || repoUrl) && (
              <div className="flex flex-col gap-2 sm:items-end">
                <div className="flex flex-wrap gap-2">
                  {previewUrl && (
                    <a
                      href={previewUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${previewLabel}：${title}`}
                      className={actionLinkClassName}
                    >
                      <ExternalIcon />
                      <span>{previewLabel}</span>
                    </a>
                  )}
                  {repoUrl && (
                    <a
                      href={repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`查看源码：${title}`}
                      className={actionLinkClassName}
                    >
                      <GitHubIcon />
                      <span>源码</span>
                    </a>
                  )}
                </div>
                {localPreview && (
                  <p className="text-xs text-zinc-500 dark:text-zinc-500">
                    本地运行版本，仅在本机可访问
                  </p>
                )}
              </div>
            )}
          </div>
        </header>

        {coverImage && (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-2xl border border-black/[.08] bg-zinc-100 dark:border-white/[.145] dark:bg-zinc-900">
            <Image
              src={coverImage}
              alt={title}
              fill
              loading="eager"
              sizes="(max-width: 767px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        )}

        {techStack.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2" aria-label="技术栈">
            {techStack.map((item) => (
              <span
                key={item}
                className="rounded-full border border-black/[.08] bg-black/[.03] px-3 py-1.5 text-sm text-zinc-700 dark:border-white/[.145] dark:bg-white/[.06] dark:text-zinc-300"
              >
                {item}
              </span>
            ))}
          </div>
        )}

        <section className="project-prose mt-10" aria-label="项目正文">
          <MdxContent />
        </section>

        {gallery && gallery.length > 0 && (
          <section className="mt-12" aria-labelledby="gallery-heading">
            <h2
              id="gallery-heading"
              className="text-xl font-semibold tracking-tight"
            >
              项目细节
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {gallery.map((image, index) => (
                <div
                  key={`${image}-${index}`}
                  className="relative aspect-[16/10] overflow-hidden rounded-2xl border border-black/[.08] bg-zinc-100 dark:border-white/[.145] dark:bg-zinc-900"
                >
                  <Image
                    src={image}
                    alt={`${title} 细节图 ${index + 1}`}
                    fill
                    sizes="(max-width: 639px) 100vw, 448px"
                    loading="lazy"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {results && results.length > 0 && (
          <section
            className="mt-12 rounded-2xl border border-black/[.08] bg-black/[.02] p-6 dark:border-white/[.145] dark:bg-white/[.03]"
            aria-labelledby="results-heading"
          >
            <h2
              id="results-heading"
              className="text-xl font-semibold tracking-tight"
            >
              成果与数据
            </h2>
            <ul className="mt-4 space-y-2">
              {results.map((item) => (
                <li
                  key={item}
                  className="flex gap-2 text-sm leading-7 text-zinc-700 dark:text-zinc-300"
                >
                  <span aria-hidden="true" className="text-zinc-400">
                    •
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {showBackground && (
          <section
            className="mt-12 rounded-2xl border border-black/[.08] p-6 dark:border-white/[.145]"
            aria-labelledby="background-heading"
          >
            <h2
              id="background-heading"
              className="text-xl font-semibold tracking-tight"
            >
              项目背景
            </h2>
            <p className="mt-3 max-w-prose text-sm leading-7 text-zinc-600 dark:text-zinc-400">
              {background}
            </p>
          </section>
        )}
      </div>
    </article>
  );
}
