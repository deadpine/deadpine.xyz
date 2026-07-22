import type { Metadata } from "next";
import { CatalogShell } from "@/components/catalog/catalog-shell";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "About",
  description:
    "Product design and brand identity — deadpine.xyz",
};

export default function AboutPage() {
  const projects = getProjects();
  return <CatalogShell projects={projects} initialView="about" />;
}
