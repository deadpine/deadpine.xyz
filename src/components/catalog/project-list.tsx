"use client";

import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectListProps = {
  projects: Project[];
  selectedId: string;
  onHover: (slug: string) => void;
  onOpen: (slug: string) => void;
  onHoverLabel: (active: boolean) => void;
  listRef: React.RefObject<HTMLElement | null>;
};

export function ProjectList({
  projects,
  selectedId,
  onHover,
  onOpen,
  onHoverLabel,
  listRef,
}: ProjectListProps) {
  return (
    <nav
      ref={listRef}
      aria-label="Projects"
      className="catalog-scroll h-full overflow-y-auto overscroll-contain px-2 py-1.5"
    >
      <ul className="m-0 list-none p-0">
        {projects.map((project) => {
          const isSelected = project.slug === selectedId;
          const tagsLabel = project.tags.join(" · ");

          return (
            <li key={project.slug} id={`list-${project.slug}`}>
              <button
                type="button"
                onClick={() => onOpen(project.slug)}
                onMouseEnter={() => {
                  onHover(project.slug);
                  onHoverLabel(true);
                }}
                onMouseLeave={() => onHoverLabel(false)}
                aria-current={isSelected ? "true" : undefined}
                className={cn(
                  "group grid w-full cursor-pointer grid-cols-[2.25rem_minmax(0,1.3fr)_minmax(0,1fr)_4.75rem] items-baseline gap-x-2 px-1.5 py-1 text-left",
                  "bg-transparent hover:bg-transparent"
                )}
              >
                <span className="font-mono text-[0.62rem] tabular-nums text-black/50">
                  {project.number}
                </span>
                <span className="min-w-0">
                  <span
                    className={cn(
                      "relative inline-block max-w-full font-mono text-[0.68rem] font-normal normal-case tracking-normal text-black",
                      "after:absolute after:bottom-0 after:left-0 after:h-px after:w-full after:origin-left after:scale-x-0 after:bg-black after:transition-transform after:duration-300 after:ease-out after:content-['']",
                      "group-hover:after:scale-x-100",
                      isSelected && "after:scale-x-100"
                    )}
                  >
                    <span className="block truncate">{project.title}</span>
                  </span>
                </span>
                <span className="truncate font-serif text-[0.68rem] italic text-black/55">
                  {tagsLabel || "—"}
                </span>
                <span className="text-right font-mono text-[0.62rem] tabular-nums text-black/50">
                  {project.dateLabel}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
