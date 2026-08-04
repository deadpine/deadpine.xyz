import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ProjectImageLoop } from "./project-image-loop";

type ProjectGridProps = {
  projects: Project[];
};

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="min-h-screen min-w-[1200px] bg-[#EFEDEB] text-black">
      <header className="flex items-center justify-between border-b border-black/10 px-10 py-5">
        <Link
          href="/"
          className="flex items-center gap-2.5 text-black transition-colors hover:text-[#EE33FF]"
        >
          <Image
            src="/img/logo.svg"
            alt=""
            width={16}
            height={18}
            className="block opacity-90"
            aria-hidden
          />
          <span className="font-mono text-[0.8rem] tracking-tight">
            deadpine.xyz
          </span>
        </Link>

        <p className="max-w-md text-right font-serif text-[0.85rem] italic leading-snug text-black/70">
          Seeking beauty & untangling complexity.
        </p>

        <nav
          aria-label="Site"
          className="flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-black/55"
        >
          <Link
            href="/about"
            className="transition-colors hover:text-[#EE33FF]"
          >
            about
          </Link>
        </nav>
      </header>

      <main className="px-10 pb-16">
        <section
          aria-label="About"
          className="max-w-2xl py-24 text-left md:py-32"
        >
          <div className="space-y-2.5 font-sans text-[14px] leading-[1.4] text-black/45">
            <p>
              For 10+ years I&apos;ve worked at the intersection of product
              design, brand identity, and technology— mostly in crypto,
              exploring open economic systems built around freedom and personal
              responsibility.
            </p>
            <p>
              I&apos;m drawn to curious people, unconventional ideas, and the
              messy process of creation.
            </p>
            <p>
              I design and I code, and I like taking things all the way from
              concept to working product.
            </p>
            <p>
              Beyond technology, I&apos;m curious about biology, anthropology,
              architecture, and ceramics. I also run Club del Sur, a social and
              cultural club for the local community of José Ignacio, Uruguay.
            </p>
            <p>
              Email me at{" "}
              <a
                href="mailto:hey@deadpine.xyz"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                hey@deadpine.xyz
              </a>
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1">
          {projects.map((project, index) => {
            const description = project.description
              .split(/\n\n+/)
              .map((p) => p.trim())
              .filter(Boolean);

            return (
              <article
                key={project.slug}
                className="grid w-full grid-cols-2 items-stretch gap-[40px] border-b border-black/10 py-8 last:border-b-0"
              >
                <div className="flex min-h-[440px] min-w-0 max-w-md flex-col justify-between text-left">
                  <div>
                    <h2 className="font-sans text-2xl font-normal tracking-tight text-black md:text-3xl">
                      {project.title}
                    </h2>
                    <p className="mt-1 font-mono text-[0.65rem] tabular-nums text-black/50">
                      {project.dateLabel}
                    </p>
                    {description.length > 0 ? (
                      <div className="mt-4 space-y-2.5 font-sans text-[14px] leading-[1.4] text-black/45">
                        {description.map((paragraph) => (
                          <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                        ))}
                      </div>
                    ) : null}
                  </div>
                  {project.tags.length > 0 ? (
                    <ul className="mt-6 flex list-none flex-wrap gap-1.5 p-0">
                      {project.tags.map((tag) => (
                        <li
                          key={tag}
                          className="rounded-full bg-black/[0.05] px-3 py-1 font-sans text-[0.8rem] tracking-wide text-black/70"
                        >
                          {tag}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                <ProjectImageLoop
                  images={project.images}
                  alt={`${project.title} artwork`}
                  priority={index < 2}
                />
              </article>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-black/10 px-10 py-5">
        <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] tracking-wide text-black/55">
          <div className="flex items-center gap-2 text-black/70">
            <Image
              src="/img/logo.svg"
              alt=""
              width={14}
              height={16}
              className="block opacity-90"
              aria-hidden
            />
            <span>Deadpine ✦ {new Date().getFullYear()}</span>
          </div>
          <nav className="flex gap-5 uppercase tracking-[0.08em]">
            <Link
              href="/about"
              className="transition-colors hover:text-[#EE33FF]"
            >
              about
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
