"use client";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";
import { ProjectDescription } from "./project-description";

type ProjectListProps = {
  projects: Project[];
  selectedId: string;
  onSelect: (slug: string) => void;
  listRef: React.RefObject<HTMLElement | null>;
};

export function ProjectList({
  projects,
  selectedId,
  onSelect,
  listRef,
}: ProjectListProps) {
  return (
    <nav
      ref={listRef}
      aria-label="Projects"
      className="catalog-scroll h-full overflow-y-auto overscroll-contain px-4 py-4"
    >
      <ul className="list-none p-0 m-0">
        {projects.map((project) => {
          const isSelected = project.slug === selectedId;
          const tagsLabel = project.tags.join(" · ");

          return (
            <li key={project.slug} id={`list-${project.slug}`}>
              <button
                type="button"
                onClick={() => onSelect(project.slug)}
                aria-current={isSelected ? "true" : undefined}
                className={cn(
                  "grid w-full grid-cols-[3rem_minmax(0,1.3fr)_minmax(0,1fr)_4.5rem] items-baseline gap-x-3 border-b border-black/10 px-2 py-2.5 text-left transition-colors",
                  "hover:bg-black/[0.03]",
                  isSelected && "bg-black/[0.04]"
                )}
              >
                <span className="font-mono text-[0.72rem] tabular-nums text-black/50">
                  {project.number}
                </span>
                <span
                  className={cn(
                    "truncate text-[0.78rem] font-medium uppercase tracking-[0.04em] text-black",
                    isSelected && "text-black"
                  )}
                >
                  {project.title}
                </span>
                <span className="truncate font-serif text-[0.8rem] italic text-black/55">
                  {tagsLabel || "—"}
                </span>
                <span className="text-right font-mono text-[0.72rem] tabular-nums text-black/50">
                  {project.dateLabel}
                </span>
              </button>

              {isSelected ? <ProjectDescription project={project} /> : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
