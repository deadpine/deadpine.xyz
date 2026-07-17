"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";

type ProjectImagesProps = {
  projects: Project[];
  selectedId: string;
  onSelect: (slug: string) => void;
  scrollerRef: React.RefObject<HTMLElement | null>;
  sectionRefs: React.MutableRefObject<Map<string, HTMLElement>>;
};

export function ProjectImages({
  projects,
  onSelect,
  scrollerRef,
  sectionRefs,
}: ProjectImagesProps) {
  return (
    <div
      ref={scrollerRef as React.RefObject<HTMLDivElement>}
      className="catalog-scroll h-full overflow-y-auto overscroll-contain"
    >
      <div className="flex flex-col">
        {projects.map((project) => {
          const hasImages = project.images.length > 0;

          return (
            <section
              key={project.slug}
              id={`project-${project.slug}`}
              data-project-id={project.slug}
              ref={(el) => {
                if (el) sectionRefs.current.set(project.slug, el);
                else sectionRefs.current.delete(project.slug);
              }}
            >
              {hasImages ? (
                project.images.map((src) => {
                  const isSvg = src.endsWith(".svg");
                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => onSelect(project.slug)}
                      className="relative block w-full overflow-hidden bg-[#EBE8E4] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
                    >
                      {isSvg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={src}
                          alt={`${project.title} artwork`}
                          className="block h-auto w-full"
                        />
                      ) : (
                        <Image
                          src={src}
                          alt={`${project.title} artwork`}
                          width={1200}
                          height={1500}
                          sizes="(min-width: 1200px) 50vw, 100vw"
                          className="block h-auto w-full"
                        />
                      )}
                    </button>
                  );
                })
              ) : (
                <button
                  type="button"
                  onClick={() => onSelect(project.slug)}
                  aria-label={`${project.title} — image forthcoming`}
                  className="flex min-h-[22rem] w-full items-center justify-center bg-[#F3F1EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
                >
                  <span className="text-[0.75rem] uppercase tracking-[0.12em] text-black/35">
                    Image forthcoming
                  </span>
                </button>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
