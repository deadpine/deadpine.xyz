import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  number: string;
  title: string;
  date: string;
  endDate?: string;
  ongoing?: boolean;
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

/**
 * Year-only labels:
 * - single year: "2023"
 * - finished range: "2021–2023"
 * - ongoing: "2024–present" (set ongoing: true in frontmatter)
 */
function formatDateLabel(
  startIso: string,
  endIso?: string,
  ongoing?: boolean
): string {
  const startYear = yearFrom(startIso);

  if (ongoing) {
    return `${startYear} – PRESENT`;
  }

  if (!endIso) return startYear;

  const endYear = yearFrom(endIso);
  if (endYear === startYear) return startYear;
  return `${startYear} – ${endYear}`;
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
    const ongoing = data.ongoing === true;

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
      dateLabel: formatDateLabel(date, endDate, ongoing),
      tags,
      images,
      description: content.trim(),
    };
    if (endDate) project.endDate = endDate;
    if (ongoing) project.ongoing = true;
    if (data.link) project.link = String(data.link);
    projects.push(project);
  }

  /**
   * Sort for display:
   * 1. Ongoing projects first
   * 2. Finished projects by end date (newest end first); fall back to start date
   * 3. When still tied, alphabetical by title
   */
  projects.sort((a, b) => {
    const aOngoing = a.ongoing === true;
    const bOngoing = b.ongoing === true;
    if (aOngoing !== bOngoing) return aOngoing ? -1 : 1;

    if (aOngoing && bOngoing) {
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    }

    const aEnd = a.endDate ?? a.date;
    const bEnd = b.endDate ?? b.date;
    if (aEnd !== bEnd) return bEnd.localeCompare(aEnd);

    return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
  });

  // Number in reverse chronological display order (01 = top of list)
  projects.forEach((project, index) => {
    project.number = padNumber(index + 1);
  });

  return projects;
}


