import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import {
  getProjectBySlug,
  getProjectSlugs,
  getProjects,
} from "@/lib/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.title,
    description:
      project.description.split("\n\n")[0]?.slice(0, 160) ||
      `${project.title} — deadpine.xyz`,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const projects = getProjects();
  return (
    <CatalogShell
      projects={projects}
      initialView="project"
      initialSlug={slug}
    />
  );
}
