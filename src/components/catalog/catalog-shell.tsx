"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { ProjectImages } from "./project-images";
import { ProjectList } from "./project-list";
import { SiteFooter } from "./site-footer";

type CatalogShellProps = {
  projects: Project[];
};

export function CatalogShell({ projects }: CatalogShellProps) {
  const [selectedId, setSelectedId] = useState(projects[0]?.slug ?? "");
  const isProgrammaticScroll = useRef(false);
  const programmaticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const listRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const markProgrammatic = useCallback((ms = 700) => {
    isProgrammaticScroll.current = true;
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    programmaticTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, ms);
  }, []);

  const selectProject = useCallback(
    (slug: string, opts?: { scrollImages?: boolean; scrollList?: boolean }) => {
      setSelectedId(slug);

      if (opts?.scrollImages !== false) {
        const section = sectionRefs.current.get(slug);
        const scroller = imagesRef.current;
        if (section && scroller) {
          markProgrammatic();
          const top =
            section.getBoundingClientRect().top -
            scroller.getBoundingClientRect().top +
            scroller.scrollTop -
            12;
          scroller.scrollTo({ top, behavior: "smooth" });
        }
      }

      if (opts?.scrollList) {
        const row = document.getElementById(`list-${slug}`);
        row?.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    },
    [markProgrammatic]
  );

  // IntersectionObserver: right column scroll → selected project
  useEffect(() => {
    const root = imagesRef.current;
    if (!root || projects.length === 0) return;

    let observer: IntersectionObserver | null = null;

    const attach = () => {
      observer?.disconnect();
      observer = new IntersectionObserver(
        (entries) => {
          if (isProgrammaticScroll.current) return;

          const visible = entries
            .filter((e) => e.isIntersecting)
            .sort(
              (a, b) =>
                (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
            );

          const top = visible[0];
          const id = top?.target.getAttribute("data-project-id");
          if (id) {
            setSelectedId((prev) => (prev === id ? prev : id));
          }
        },
        {
          root,
          threshold: [0.2, 0.35, 0.5, 0.65],
          rootMargin: "-8% 0px -40% 0px",
        }
      );

      sectionRefs.current.forEach((el) => observer?.observe(el));
    };

    // Wait a frame so section refs from children are registered
    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [projects]);

  useEffect(() => {
    return () => {
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    };
  }, []);

  if (projects.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF9] text-black/60">
        No projects found.
      </div>
    );
  }

  return (
    <div className="flex h-screen min-w-[1200px] flex-col overflow-hidden bg-[#FBFAF9] text-black">
      <main className="grid min-h-0 flex-1 grid-cols-2 overflow-hidden">
        {/* Left ~40% */}
        <div className="flex min-h-0 flex-col border-r border-black/10">
          <div className="min-h-0 flex-1 overflow-hidden">
            <ProjectList
              projects={projects}
              selectedId={selectedId}
              onSelect={(slug) =>
                selectProject(slug, { scrollImages: true, scrollList: false })
              }
              listRef={listRef}
            />
          </div>
          <SiteFooter />
        </div>

        {/* Right ~60% */}
        <div className="min-h-0 overflow-hidden">
          <ProjectImages
            projects={projects}
            selectedId={selectedId}
            onSelect={(slug) =>
              selectProject(slug, { scrollImages: false, scrollList: true })
            }
            scrollerRef={imagesRef}
            sectionRefs={sectionRefs}
          />
        </div>
      </main>
    </div>
  );
}
