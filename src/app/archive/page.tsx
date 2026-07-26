import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Archive",
  description:
    "Project archive — numbered catalog index and covers · deadpine.xyz",
};

export default function ArchivePage() {
  const projects = getProjects();
  return (
    <CatalogShell
      projects={projects}
      initialView="work"
      workPath="/archive"
    />
  );
}
