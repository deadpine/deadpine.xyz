import { CatalogShell } from "@/components/catalog/catalog-shell";
import { getProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getProjects();
  return <CatalogShell projects={projects} initialView="work" />;
}
