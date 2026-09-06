import Image from "next/image";
import Link from "next/link";
import {
  CoverImg,
  firstCovers,
  PineconeMask,
} from "@/components/experiments/shared";
import type { Project } from "@/lib/projects";

type HomeHeroProps = {
  projects: Project[];
};

export function HomeHero({ projects }: HomeHeroProps) {
  const cover = firstCovers(projects, 1)[0];

  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[60svh] min-w-[1200px] flex-col px-10 py-7"
    >
      <header className="flex items-center justify-between">
        <Link href="/" className="text-black transition-opacity hover:opacity-70">
          <Image
            src="/img/logo.svg"
            alt="deadpine.xyz"
            width={16}
            height={18}
            className="block"
            priority
          />
        </Link>
        <nav
          aria-label="Site"
          className="flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-black/55"
        >
          <a href="#work" className="transition-colors hover:text-[#EE33FF]">
            work
          </a>
          <Link
            href="/about"
            className="transition-colors hover:text-[#EE33FF]"
          >
            about
          </Link>
        </nav>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 items-center gap-24">
        <div className="max-w-lg">
          <h1 className="font-serif text-[1.25rem] italic leading-snug text-black/85">
            Seeking beauty &amp; untangling complexity.
          </h1>
          <p className="mt-4 font-sans text-[16px] leading-[1.5] text-black/70">
            Designer with 10+ years of experience working at the intersection of
            product design, brand identity, and technology.
          </p>
        </div>

        <div className="flex justify-center">
          {cover ? (
            <Link
              href={`/work/${cover.slug}`}
              aria-label={cover.title}
              className="block"
            >
              <PineconeMask className="h-[16rem] w-[14rem]">
                <CoverImg
                  src={cover.src}
                  alt={cover.title}
                  priority
                  sizes="224px"
                />
              </PineconeMask>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  );
}
