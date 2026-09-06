import type { Metadata } from "next";
import { ExperimentsShell } from "@/components/experiments/experiments-shell";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "UI experiments",
  description: "Eight hero studies for deadpine.xyz",
  robots: { index: false, follow: false },
};

export default function UiExperimentsPage() {
  const projects = getProjects();
  return <ExperimentsShell projects={projects} />;
}
