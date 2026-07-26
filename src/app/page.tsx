import { ProjectGrid } from "@/components/home/project-grid";
import { getProjects } from "@/lib/projects";

export default function HomePage() {
  const projects = getProjects();
  return <ProjectGrid projects={projects} />;
}
