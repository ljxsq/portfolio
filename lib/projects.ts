import fs from "node:fs";
import path from "node:path";

import matter from "gray-matter";

export interface Project {
  title: string;
  summary: string;
  period: string;
  role: string;
  background?: string;
  techStack: string[];
  solutions: string[];
  results?: string[];
  previewUrl?: string;
  repoUrl?: string;
  coverImage: string;
  gallery?: string[];
  order?: number;
  draft?: boolean;
}

export interface ProjectDocument {
  frontmatter: Project;
  content: string;
  slug: string;
}

/** 列表项在项目字段之外附带文件名 slug，供卡片跳转使用。 */
export interface ProjectListItem extends Project {
  slug: string;
}

function getProjectsDirectory(): string {
  return path.join(process.cwd(), "content", "projects");
}

function asString(value: unknown): string {
  if (typeof value === "string") return value.trim();
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return "";
}

function asOptionalString(value: unknown): string | undefined {
  const result = asString(value);
  return result === "" ? undefined : result;
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(asString).filter((item) => item !== "");
  }
  if (typeof value === "string" && value.trim() !== "") {
    return [value.trim()];
  }
  return [];
}

function asOptionalNumber(value: unknown): number | undefined {
  const num = typeof value === "number" ? value : Number(value);
  return Number.isFinite(num) ? num : undefined;
}

function asOptionalBoolean(value: unknown): boolean | undefined {
  if (typeof value === "boolean") return value;
  if (value === "true") return true;
  if (value === "false") return false;
  return undefined;
}

/**
 * 把 frontmatter 归一化为 Project：缺失的必填字段降级为空字符串/空数组，
 * 可选字段缺失时保持 undefined，避免因内容不完整而抛错。
 */
function normalizeProject(data: unknown): Project {
  const source = data && typeof data === "object" ? (data as Record<string, unknown>) : {};

  return {
    title: asString(source.title),
    summary: asString(source.summary),
    period: asString(source.period),
    role: asString(source.role),
    background: asOptionalString(source.background),
    techStack: asStringArray(source.techStack),
    solutions: asStringArray(source.solutions),
    results: source.results === undefined ? undefined : asStringArray(source.results),
    previewUrl: asOptionalString(source.previewUrl),
    repoUrl: asOptionalString(source.repoUrl),
    coverImage: asString(source.coverImage),
    gallery: source.gallery === undefined ? undefined : asStringArray(source.gallery),
    order: asOptionalNumber(source.order),
    draft: asOptionalBoolean(source.draft),
  };
}

/**
 * 取 period 的起始时间并换算成月数，便于倒序比较。
 * 支持 "2024.03"、"2024/03"、"2024-03"、"2024年3月" 等写法；
 * 无法解析时返回 -Infinity，让该类项目排在末尾。
 */
function periodStartValue(period: string): number {
  const matched = period.match(/^(\d{4})(?:[年./\-]?(\d{1,2}))?/);
  if (!matched) return Number.NEGATIVE_INFINITY;

  const year = Number(matched[1]);
  const month = matched[2] ? Number(matched[2]) : 0;
  return year * 12 + (month >= 1 && month <= 12 ? month : 0);
}

interface ProjectEntry {
  slug: string;
  project: Project;
}

/**
 * 排序规则（稳定且可预期）：
 * 1. 有 order 的项目整体排在无 order 的项目之前，避免两套排序基准混排导致顺序摇摆；
 * 2. 有 order 的组内按 order 升序，order 相同时按 slug 升序兜底；
 * 3. 无 order 的组内按 period 起始时间倒序（较新的在前），同一时间或无法解析时按 slug 升序兜底。
 */
function compareProjects(a: ProjectEntry, b: ProjectEntry): number {
  const aOrder = a.project.order;
  const bOrder = b.project.order;
  const aHasOrder = aOrder !== undefined;
  const bHasOrder = bOrder !== undefined;

  if (aHasOrder && bHasOrder) {
    if (aOrder !== bOrder) return aOrder - bOrder;
    return a.slug.localeCompare(b.slug);
  }
  if (aHasOrder) return -1;
  if (bHasOrder) return 1;

  const aPeriod = periodStartValue(a.project.period);
  const bPeriod = periodStartValue(b.project.period);
  if (aPeriod !== bPeriod) return bPeriod - aPeriod;

  return a.slug.localeCompare(b.slug);
}

/**
 * 读取 content/projects 下所有 .mdx，排除以 _ 开头的文件与 draft: true 的项目。
 * 目录不存在或为空时返回空数组。
 */
export function getAllProjects(): ProjectListItem[] {
  const directory = getProjectsDirectory();
  if (!fs.existsSync(directory)) return [];

  const fileNames = fs
    .readdirSync(directory)
    .filter((fileName) => fileName.toLowerCase().endsWith(".mdx"))
    .filter((fileName) => !fileName.startsWith("_"));

  const entries: ProjectEntry[] = [];

  for (const fileName of fileNames) {
    const slug = fileName.replace(/\.mdx$/i, "");
    const raw = fs.readFileSync(path.join(directory, fileName), "utf8");
    const parsed = matter(raw);
    const project = normalizeProject(parsed.data);

    if (project.draft === true) continue;

    entries.push({ slug, project });
  }

  entries.sort(compareProjects);
  return entries.map((entry) => ({ ...entry.project, slug: entry.slug }));
}

/**
 * 按文件名（不含 .mdx）读取单个项目；文件不存在或 slug 非法时返回 null。
 */
export function getProjectBySlug(slug: string): ProjectDocument | null {
  if (!slug || slug.includes("..") || /[\\/]/.test(slug)) return null;

  const filePath = path.join(getProjectsDirectory(), `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const parsed = matter(raw);

  return {
    frontmatter: normalizeProject(parsed.data),
    content: parsed.content.trim(),
    slug,
  };
}
