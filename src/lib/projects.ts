import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Project = {
  slug: string;
  number: string;
  title: string;
  date: string;
  dateLabel: string;
  tags: string[];
  link?: string;
  images: string[];
  description: string;
};

const CONTENT_DIR = path.join(process.cwd(), "content/projects");

function normalizeDate(value: unknown): string {
  if (value instanceof Date && !Number.isNaN(value.getTime())) {
    // YAML dates often parse as UTC midnight — use UTC parts
    const y = value.getUTCFullYear();
    const m = String(value.getUTCMonth() + 1).padStart(2, "0");
    const d = String(value.getUTCDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  const raw = String(value ?? "").trim();
  const iso = raw.match(/(\d{4}-\d{2}-\d{2})/);
  if (iso) return iso[1];

  return "1970-01-01";
}

function formatDateLabel(isoDate: string): string {
  const [year, month] = isoDate.split("-");
  if (!year || !month) return isoDate;
  return `${month}-${year}`;
}

function padNumber(n: number): string {
  return `p.${String(n).padStart(2, "0")}`;
}

export function getProjects(): Project[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  const files = fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md") || file.endsWith(".mdx"));

  const projects = files.map((file) => {
    const raw = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
    const { data, content } = matter(raw);

    const slug =
      typeof data.slug === "string"
        ? data.slug
        : file.replace(/\.mdx?$/, "");

    const title = String(data.title ?? slug);
    const date = normalizeDate(data.date);

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

    const description = content.trim();

    return {
      slug,
      number: "",
      title,
      date,
      dateLabel: formatDateLabel(date),
      tags,
      link: data.link ? String(data.link) : undefined,
      images,
      description,
    } satisfies Project;
  });

  // Oldest → newest for numbering (p.01 = oldest)
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
