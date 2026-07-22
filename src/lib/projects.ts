import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  number: string;
  title: string;
  date: string;
  endDate?: string;
  dateLabel: string;
  tags: string[];
  link?: string;
  images: string[];
  description: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

function normalizeDate(value: unknown): string | undefined {
  if (value == null || value === "") return undefined;

  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, "0");
    const d = String(value.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const raw = String(value).trim();
  const iso = raw.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];

  const yearOnly = raw.match(/^(\d{4})$/);
  if (yearOnly) return `${yearOnly[1]}-01-01`;

  return undefined;
}

function yearFrom(isoDate: string): string {
  return isoDate.slice(0, 4);
}

/** Single year, or "YYYY-YYYY" when end year differs. */
function formatDateLabel(startIso: string, endIso?: string): string {
  const startYear = yearFrom(startIso);
  if (!endIso) return startYear;
  const endYear = yearFrom(endIso);
  if (endYear === startYear) return startYear;
  return `${startYear}-${endYear}`;
}

function padNumber(n: number): string {
  return String(n).padStart(2, "0");
}

function isHidden(data: Record<string, unknown>): boolean {
  return data.hidden === true || data.draft === true || data.published === false;
}

export function getProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const projects: Project[] = [];

  for (const file of files) {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    if (isHidden(data as Record<string, unknown>)) continue;

    const slug =
      typeof data.slug === "string"
        ? data.slug
        : file.replace(/\.mdx?$/, "");

    const title = String(data.title ?? slug);
    const date = normalizeDate(data.date) ?? "1970-01-01";
    const endDate = normalizeDate(data.endDate ?? data.end_date);

    let tags: string[] = [];
    if (Array.isArray(data.tags)) {
      tags = data.tags.map(String);
    } else if (typeof data.tags === "string") {
      tags = data.tags.split(/\s+/).filter(Boolean);
    }

    let images: string[] = [];
    if (Array.isArray(data.images)) {
      images = data.images.map(String);
    } else if (typeof data.image === "string" && data.image) {
      images = [data.image];
    }

    const project: Project = {
      slug,
      number: "",
      title,
      date,
      dateLabel: formatDateLabel(date, endDate),
      tags,
      images,
      description: content.trim(),
    };
    if (endDate) project.endDate = endDate;
    if (data.link) project.link = String(data.link);
    projects.push(project);
  }

  // Oldest → newest for numbering (01 = oldest)
  projects.sort((a, b) => {
    if (a.date === b.date) return a.title.localeCompare(b.title);
    return a.date.localeCompare(b.date);
  });

  projects.forEach((project, index) => {
    project.number = padNumber(index + 1);
  });

  // Newest first for display
  return projects.slice().reverse();
}

/** Visible catalog project by slug (includes number). */
export function getProjectBySlug(slug: string): Project | null {
  return getProjects().find((project) => project.slug === slug) ?? null;
}

export function getProjectSlugs(): string[] {
  return getProjects().map((project) => project.slug);
}
