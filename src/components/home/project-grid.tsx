import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

type ProjectGridProps = {
  projects: Project[];
};

function CoverImage({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  if (src.endsWith(".svg")) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="100vw"
      priority={priority}
      className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
    />
  );
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div className="min-h-screen min-w-[1200px] bg-[#FBFAF9] text-black">
      <header className="flex items-center justify-between border-b border-black/10 px-8 py-5">
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
          seeking beauty while striving to understand the complexities of this
          world
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

      <main className="px-6 pb-16">
        <section
          aria-label="About"
          className="mx-auto max-w-2xl px-4 py-24 md:py-32"
        >
          <div className="space-y-6 font-serif text-[1.05rem] leading-[1.75] text-black/75">
            <p>
              For 10 years my journey has intertwined product design and brand
              identity with technology, mostly in crypto. With Bitcoin and
              Ethereum I discovered an opportunity to work fostering an open
              economic system based on freedom and responsibility.
            </p>
            <p>
              I&apos;ve collaborated with projects like{" "}
              <a
                href="https://openzeppelin.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                OpenZeppelin
              </a>
              ,{" "}
              <a
                href="https://flashbots.net/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Flashbots
              </a>
              ,{" "}
              <a
                href="https://decentraland.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Decentraland
              </a>
              ,{" "}
              <a
                href="https://ethlatam.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                ETHLatam
              </a>
              ,{" "}
              <a
                href="https://forta.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Forta
              </a>
              ,{" "}
              <a
                href="https://app.exact.ly/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Exactly
              </a>
              ,{" "}
              <a
                href="https://mint.ethernautdao.io/#about"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Ethernaut DAO
              </a>
              , and{" "}
              <a
                href="https://app.rewilder.xyz/donation/27"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Rewilder
              </a>
              .
            </p>
            <p>
              I also enjoy bringing my designs to life through coding. I have
              experience in frontend development, including HTML, CSS, React,
              and Svelte.
            </p>
            <p>However, not everything is about technology.</p>
            <p>
              Beyond my professional pursuits, I am interested in biology,
              anthropology, behavioral science, color theory, architecture,
              scenography, and ceramics. I&apos;m part of the{" "}
              <a
                href="https://fuegoaustral.org/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                Fuego Austral
              </a>{" "}
              community, bringing art to life and cultivating meaningful offline
              connections.
            </p>
            <p>
              I invite you to email me at{" "}
              <a
                href="mailto:hey@deadpine.xyz"
                className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
              >
                hey@deadpine.xyz
              </a>{" "}
              and discuss shared interests or potential collaborations.
            </p>
          </div>
        </section>

        <div className="grid grid-cols-1 p-32">
          {projects.map((project, index) => {
            const cover = project.images[0];

            return (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className="group flex w-full cursor-pointer items-center justify-between gap-16 border-b border-black/10 py-6 last:border-b-0"
              >
                <div className="min-w-0 max-w-[16rem] shrink-0 text-left">
                  <p className="font-mono text-[0.65rem] tabular-nums text-black/50">
                    {project.number}
                    <span className="mx-2 text-black/25">·</span>
                    {project.dateLabel}
                  </p>
                  <h2 className="mt-1 font-mono text-lg font-normal tracking-tight text-black md:text-xl">
                    {project.title}
                  </h2>
                  {project.tags.length > 0 ? (
                    <p className="mt-0.5 font-serif text-[0.85rem] italic text-black/55">
                      {project.tags.slice(0, 3).join(" · ")}
                    </p>
                  ) : null}
                </div>

                <div className="relative aspect-video h-[400px] w-auto max-w-full shrink-0 overflow-hidden rounded-[12px] bg-[#EBE8E4] transition-[border-radius] duration-500 ease-out group-hover:rounded-[200px]">
                  {cover ? (
                    <CoverImage
                      src={cover}
                      alt={`${project.title} cover`}
                      priority={index < 2}
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#F3F1EE]">
                      <span className="font-mono text-[0.7rem] uppercase tracking-[0.12em] text-black/35">
                        Image forthcoming
                      </span>
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </main>

      <footer className="border-t border-black/10 px-8 py-5">
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
