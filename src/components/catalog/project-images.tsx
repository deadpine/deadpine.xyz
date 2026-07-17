"use client";

import Image from "next/image";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ProjectImagesProps = {
  projects: Project[];
  selectedId: string;
  /** Landing: one cover per project. Detail: all images of one project. */
  mode: "covers" | "gallery";
  onHover?: (slug: string) => void;
  onOpen?: (slug: string) => void;
  onHoverLabel?: (active: boolean) => void;
  scrollerRef?: React.RefObject<HTMLElement | null>;
  sectionRefs?: React.MutableRefObject<Map<string, HTMLElement>>;
};

function ProjectImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  const isSvg = src.endsWith(".svg");
  if (isSvg) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={alt} className="block h-auto w-full" />
    );
  }
  return (
    <Image
      src={src}
      alt={alt}
      width={1200}
      height={1500}
      sizes="(min-width: 1200px) 50vw, 100vw"
      priority={priority}
      className="block h-auto w-full"
    />
  );
}

export function ProjectImages({
  projects,
  mode,
  onHover,
  onOpen,
  onHoverLabel,
  scrollerRef,
  sectionRefs,
}: ProjectImagesProps) {
  return (
    <div
      ref={scrollerRef as React.RefObject<HTMLDivElement> | undefined}
      className="catalog-scroll h-full overflow-y-auto overscroll-contain"
    >
      <div className="flex flex-col">
        {projects.map((project, projectIndex) => {
          const images =
            mode === "covers"
              ? project.images.slice(0, 1)
              : project.images;
          const hasImages = images.length > 0;
          const interactive = mode === "covers";

          return (
            <section
              key={project.slug}
              id={`project-${project.slug}`}
              data-project-id={project.slug}
              ref={(el) => {
                if (!sectionRefs) return;
                if (el) sectionRefs.current.set(project.slug, el);
                else sectionRefs.current.delete(project.slug);
              }}
            >
              {hasImages ? (
                images.map((src, i) => {
                  const content = (
                    <ProjectImage
                      src={src}
                      alt={`${project.title} artwork`}
                      priority={mode === "covers" && projectIndex < 2 && i === 0}
                    />
                  );

                  if (!interactive) {
                    return (
                      <div
                        key={src}
                        className="relative block w-full overflow-hidden bg-[#EBE8E4]"
                      >
                        {content}
                      </div>
                    );
                  }

                  return (
                    <button
                      key={src}
                      type="button"
                      onClick={() => onOpen?.(project.slug)}
                      onMouseEnter={() => {
                        onHover?.(project.slug);
                        onHoverLabel?.(true);
                      }}
                      onMouseLeave={() => onHoverLabel?.(false)}
                      className={cn(
                        "relative block w-full cursor-pointer overflow-hidden bg-[#EBE8E4] text-left",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
                      )}
                    >
                      {content}
                    </button>
                  );
                })
              ) : interactive ? (
                <button
                  type="button"
                  onClick={() => onOpen?.(project.slug)}
                  onMouseEnter={() => {
                    onHover?.(project.slug);
                    onHoverLabel?.(true);
                  }}
                  onMouseLeave={() => onHoverLabel?.(false)}
                  aria-label={`${project.title} — image forthcoming`}
                  className="flex min-h-[22rem] w-full cursor-pointer items-center justify-center bg-[#F3F1EE] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-black/30"
                >
                  <span className="text-[0.75rem] uppercase tracking-[0.12em] text-black/35">
                    Image forthcoming
                  </span>
                </button>
              ) : (
                <div className="flex min-h-[22rem] w-full items-center justify-center bg-[#F3F1EE]">
                  <span className="text-[0.75rem] uppercase tracking-[0.12em] text-black/35">
                    Image forthcoming
                  </span>
                </div>
              )}
            </section>
          );
        })}
      </div>
    </div>
  );
}
