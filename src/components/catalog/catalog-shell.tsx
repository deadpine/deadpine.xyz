"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { Project } from "@/lib/projects";
import { AboutPanel } from "./about-panel";
import { CursorLabel } from "./cursor-label";
import { ProjectDetail } from "./project-detail";
import { ProjectImages } from "./project-images";
import { ProjectList } from "./project-list";
import { SiteFooter, type CatalogView } from "./site-footer";

type CatalogShellProps = {
  projects: Project[];
  initialView?: CatalogView;
  initialSlug?: string;
  /** Path for the catalog list (default home; archive uses `/archive`). */
  workPath?: string;
};

export function CatalogShell({
  projects,
  initialView = "work",
  initialSlug,
  workPath = "/",
}: CatalogShellProps) {
  const router = useRouter();
  const [selectedId, setSelectedId] = useState(
    initialSlug && projects.some((p) => p.slug === initialSlug)
      ? initialSlug
      : (projects[0]?.slug ?? "")
  );
  const [view, setView] = useState<CatalogView>(initialView);
  const [labelVisible, setLabelVisible] = useState(false);
  const [animKey, setAnimKey] = useState(0);

  const isProgrammaticScroll = useRef(false);
  const programmaticTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const listRef = useRef<HTMLElement | null>(null);
  const imagesRef = useRef<HTMLElement | null>(null);
  const sectionRefs = useRef<Map<string, HTMLElement>>(new Map());

  const activeProject = useMemo(
    () => projects.find((p) => p.slug === selectedId) ?? projects[0],
    [projects, selectedId]
  );

  const markProgrammatic = useCallback((ms = 100) => {
    isProgrammaticScroll.current = true;
    if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    programmaticTimer.current = setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, ms);
  }, []);

  const scrollToCover = useCallback(
    (slug: string) => {
      const section = sectionRefs.current.get(slug);
      const scroller = imagesRef.current;
      if (!section || !scroller) return;
      markProgrammatic();
      const top =
        section.getBoundingClientRect().top -
        scroller.getBoundingClientRect().top +
        scroller.scrollTop -
        12;
      scroller.scrollTop = top;
    },
    [markProgrammatic]
  );

  const hoverProject = useCallback(
    (slug: string) => {
      if (view !== "work") return;
      setSelectedId(slug);
      scrollToCover(slug);
    },
    [scrollToCover, view]
  );

  const openProject = useCallback(
    (slug: string) => {
      setSelectedId(slug);
      setLabelVisible(false);
      setView("project");
      setAnimKey((k) => k + 1);
      router.push(`/work/${slug}`, { scroll: false });
    },
    [router]
  );

  const showWork = useCallback(() => {
    setView("work");
    setLabelVisible(false);
    setAnimKey((k) => k + 1);
    router.push(workPath, { scroll: false });
  }, [router, workPath]);

  const showAbout = useCallback(() => {
    setView("about");
    setLabelVisible(false);
    setAnimKey((k) => k + 1);
    router.push("/about", { scroll: false });
  }, [router]);

  // Sync from route props when navigating (back/forward, direct load)
  useEffect(() => {
    setView(initialView);
    if (initialSlug && projects.some((p) => p.slug === initialSlug)) {
      setSelectedId(initialSlug);
    }
    setAnimKey((k) => k + 1);
  }, [initialView, initialSlug, projects]);

  // IntersectionObserver: right column scroll → selected project (landing only)
  useEffect(() => {
    if (view !== "work") return;
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

    const raf = requestAnimationFrame(attach);

    return () => {
      cancelAnimationFrame(raf);
      observer?.disconnect();
    };
  }, [projects, view, animKey]);

  useEffect(() => {
    return () => {
      if (programmaticTimer.current) clearTimeout(programmaticTimer.current);
    };
  }, []);

  // Reset image scroller to top when opening a project gallery
  useEffect(() => {
    if (view !== "project") return;
    const scroller = imagesRef.current;
    if (scroller) scroller.scrollTop = 0;
  }, [view, selectedId]);

  if (projects.length === 0) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#EFEDEB] text-black/60">
        No projects found.
      </div>
    );
  }

  const leftPanel =
    view === "work" ? (
      <ProjectList
        projects={projects}
        selectedId={selectedId}
        onHover={hoverProject}
        onOpen={openProject}
        onHoverLabel={setLabelVisible}
        listRef={listRef}
      />
    ) : view === "about" ? (
      <AboutPanel />
    ) : activeProject ? (
      <ProjectDetail project={activeProject} onBack={showWork} />
    ) : null;

  const rightPanel =
    view === "project" && activeProject ? (
      <ProjectImages
        projects={[activeProject]}
        selectedId={selectedId}
        mode="gallery"
        scrollerRef={imagesRef}
      />
    ) : (
      <ProjectImages
        projects={projects}
        selectedId={selectedId}
        mode="covers"
        onHover={hoverProject}
        onOpen={openProject}
        onHoverLabel={setLabelVisible}
        scrollerRef={imagesRef}
        sectionRefs={sectionRefs}
      />
    );

  return (
    <div className="flex h-screen min-w-[1200px] flex-col overflow-hidden bg-[#EFEDEB] text-black">
      <main className="grid min-h-0 flex-1 grid-cols-2 overflow-hidden">
        <div className="flex min-h-0 flex-col border-r border-black/10">
          <div
            key={`left-${view}-${animKey}`}
            className="catalog-view-enter min-h-0 flex-1 overflow-hidden"
          >
            {leftPanel}
          </div>
          <SiteFooter
            view={view}
            onShowAbout={showAbout}
            onShowWork={showWork}
          />
        </div>

        <div
          key={`right-${view}-${animKey}`}
          className="catalog-view-enter min-h-0 overflow-hidden"
        >
          {rightPanel}
        </div>
      </main>

      <CursorLabel visible={labelVisible && view === "work"} />
    </div>
  );
}
