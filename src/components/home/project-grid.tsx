import type { Project } from "@/lib/projects";
import { HomeHero } from "./home-hero";
import { ProjectImageLoop } from "./project-image-loop";
import { SiteFooter } from "./site-footer";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#F3F1F0] text-black">
      <HomeHero />

      <main id="work" className="px-5 pb-12 md:px-10 md:pb-16">
        <div className="grid grid-cols-1 items-start gap-x-5 gap-y-12 md:grid-cols-2 md:gap-y-16">
          {projects.map((project, index) => {
            const description = project.description
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean);

            return (
              <article key={project.slug} className="flex min-w-0 flex-col">
                <ProjectImageLoop
                  images={project.images}
                  alt={`${project.title} artwork`}
                  priority={index < 2}
                />

                <div className="mt-5">
                  <div className="flex items-baseline justify-between gap-x-3 gap-y-1">
                    <h2 className="min-w-0 font-sans text-xl font-normal tracking-tight text-black md:text-2xl">
                      {project.title}
                    </h2>
                    <p className="shrink-0 font-mono text-xs tabular-nums text-stone-400">
                      {project.dateLabel}
                    </p>
                  </div>
                  {description.length > 0 ? (
                    <div className="py-1 font-sans text-sm leading-snug text-stone-500">
                      {description.map((paragraph) => (
                        <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                      ))}
                    </div>
                  ) : null}
                  {project.tags.length > 0 ? (
                    <ul className="mt-2.5 flex list-none flex-wrap gap-1.5 p-0">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full border border-stone-300 px-3 py-1 font-sans text-xs tracking-wide text-stone-500 transition-colors duration-200 ease-out hover:border-stone-400 hover:text-stone-700"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            );
          })}
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
