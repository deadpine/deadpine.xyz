"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CursorLabel } from "@/components/experiments/cursor-label";
import { isVideoSrc } from "@/components/home/website-video-frame";
import { HeroNav, Mark } from "@/components/experiments/mark";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type HeroProps = {
  projects: Project[];
};

const HERO_MIN =
  "flex min-h-[calc(100svh-3rem)] min-w-0 scroll-mt-12 flex-col";

function firstCovers(projects: Project[], count: number) {
  const covers: { title: string; src: string; slug: string }[] = [];
  for (const project of projects) {
    const src = project.images.find((image) => !isVideoSrc(image));
    if (!src) continue;
    covers.push({ title: project.title, src, slug: project.slug });
    if (covers.length >= count) break;
  }
  return covers;
}

function CoverImg({
  src,
  alt,
  priority = false,
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
        className="absolute inset-0 h-full w-full object-cover"
      />
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes="(min-width: 1200px) 40vw, 100vw"
      priority={priority}
      className="object-cover"
    />
  );
}

/** 01 — Tagline as the architecture of the first screen. */
export function HeroEditorial() {
  return (
    <section id="editorial" className={cn(HERO_MIN, "bg-[#F3F1F0] text-black")}>
      <header className="flex items-center justify-between px-10 py-5">
        <Mark />
        <HeroNav />
      </header>

      <div className="flex flex-1 flex-col justify-between px-10 pb-10 pt-16">
        <h1 className="max-w-[18ch] font-serif text-[clamp(3.4rem,7.2vw,7.25rem)] italic leading-[0.92] tracking-tight text-black">
          Seeking beauty{" "}
          <span className="not-italic text-[#EE33FF]">&amp;</span> untangling
          complexity.
        </h1>

        <div className="flex items-end justify-between gap-10">
          <p className="max-w-sm font-sans text-sm leading-snug text-black/45">
            Product design, brand identity, and the long way from concept to
            working product.
          </p>
          <p className="font-serif text-base italic text-black/55">
            José Ignacio, Uruguay
          </p>
          <a
            href="mailto:hey@deadpine.xyz"
            className="font-mono text-xs tracking-tight text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            hey@deadpine.xyz
          </a>
        </div>
      </div>
    </section>
  );
}

/** 02 — The name at display scale. */
export function HeroWordmark() {
  return (
    <section
      id="wordmark"
      className={cn(HERO_MIN, "overflow-hidden bg-[#F3F1F0] text-black")}
    >
      <header className="flex items-center justify-between px-10 py-5">
        <span className="font-mono text-xs uppercase tracking-widest text-black/45">
          Selected work, 2016–present
        </span>
        <HeroNav />
      </header>

      <div className="flex flex-1 flex-col justify-end px-10 pb-10">
        <div className="flex items-end gap-6">
          <Image
            src="/img/logo.svg"
            alt=""
            width={72}
            height={82}
            className="mb-[0.12em] block opacity-90"
            aria-hidden
          />
          <p className="font-sans text-[clamp(5.5rem,18vw,16rem)] font-normal leading-[0.78] tracking-tighter text-black">
            deadpine
            <span className="text-[#EE33FF]">.</span>
            <span className="font-mono text-[0.18em] tracking-tight text-black/40">
              xyz
            </span>
          </p>
        </div>

        <div className="mt-8 flex items-baseline justify-between gap-8 border-t border-black/10 pt-5">
          <p className="font-serif text-lg italic leading-snug text-black/70">
            Seeking beauty &amp; untangling complexity.
          </p>
          <ul className="flex gap-8 font-mono text-xs uppercase tracking-widest text-black/50">
            <li>Product design</li>
            <li>Brand identity</li>
            <li>Frontend</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

/** 03 — Catalog two-column language, used as a manifesto. */
export function HeroSplit() {
  return (
    <section id="split" className={cn(HERO_MIN, "bg-[#F3F1F0] text-black")}>
      <div className="grid min-h-0 flex-1 grid-cols-2">
        <div className="flex flex-col border-r border-black/10">
          <header className="px-10 py-5">
            <Mark />
          </header>
          <div className="flex flex-1 flex-col justify-end px-10 pb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-black/40">
              01
            </p>
            <h1 className="mt-4 font-serif text-[clamp(3.2rem,6vw,6.5rem)] italic leading-[0.9] tracking-tight">
              Seeking
              <br />
              beauty
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <header className="flex justify-end px-10 py-5">
            <HeroNav />
          </header>
          <div className="flex flex-1 flex-col justify-end px-10 pb-12">
            <p className="font-mono text-xs uppercase tracking-widest text-black/40">
              02
            </p>
            <h1 className="mt-4 font-sans text-[clamp(2.4rem,4.4vw,4.4rem)] font-normal leading-[0.95] tracking-tight">
              untangling
              <br />
              complexity<span className="text-[#EE33FF]">.</span>
            </h1>
            <p className="mt-10 max-w-sm font-sans text-sm leading-snug text-black/45">
              For 10+ years I&apos;ve worked at the intersection of product
              design, brand identity, and technology. I design and I code, and
              I like taking things all the way from concept to working product.
            </p>
            <a
              href="mailto:hey@deadpine.xyz"
              className="mt-6 w-fit font-mono text-xs tracking-tight text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
            >
              hey@deadpine.xyz
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 04 — A printed catalog title page. */
export function HeroCatalog({ projects }: HeroProps) {
  const listed = projects.slice(0, 8);

  return (
    <section id="catalog" className={cn(HERO_MIN, "bg-[#F3F1F0] p-4 text-black")}>
      <div className="flex min-h-0 flex-1 flex-col border border-black/15 p-3">
        <div className="flex min-h-0 flex-1 flex-col border border-black/15 px-10 py-7">
          <header className="flex items-baseline justify-between font-mono text-xs uppercase tracking-widest text-black/50">
            <span>Catalog</span>
            <span>Selected work</span>
            <span>2016—present</span>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center py-8">
            <Image
              src="/img/logo.svg"
              alt=""
              width={84}
              height={96}
              className="block opacity-90"
              aria-hidden
            />
            <p className="mt-6 font-mono text-sm tracking-tight">
              deadpine.xyz
            </p>
            <p className="mt-2 font-serif text-base italic text-black/65">
              Seeking beauty &amp; untangling complexity.
            </p>
          </div>

          <ol className="grid grid-cols-2 gap-x-16 border-t border-black/10 pt-5">
            {listed.map((project, index) => (
              <li key={project.slug}>
                <Link
                  href="/#work"
                  className="group grid grid-cols-[2rem_minmax(0,1fr)_auto] items-baseline gap-3 py-1.5"
                >
                  <span className="font-mono text-xs tabular-nums text-black/40">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="truncate font-mono text-xs text-black transition-colors group-hover:text-[#EE33FF]">
                    {project.title}
                  </span>
                  <span className="font-mono text-xs tabular-nums text-black/40">
                    {project.dateLabel}
                  </span>
                </Link>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/** 05 — Work images carry the first impression. */
export function HeroMosaic({ projects }: HeroProps) {
  const covers = firstCovers(projects, 6);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("view project");

  return (
    <section id="mosaic" className={cn(HERO_MIN, "bg-[#F3F1F0] text-black")}>
      <header className="flex items-center justify-between px-10 py-5">
        <Mark />
        <HeroNav />
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(280px,0.85fr)_1.35fr] items-center gap-12 px-10 pb-10">
        <div>
          <h1 className="font-serif text-[clamp(2rem,3.4vw,3.25rem)] italic leading-[1.05] tracking-tight">
            Seeking beauty &amp; untangling complexity.
          </h1>
          <p className="mt-6 max-w-sm font-sans text-sm leading-snug text-black/45">
            A selection of product, brand, and editorial work — mostly in
            crypto, plus a cultural club on the Atlantic coast.
          </p>
          <a
            href="mailto:hey@deadpine.xyz"
            className="mt-8 inline-block font-mono text-xs tracking-tight text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            hey@deadpine.xyz
          </a>
        </div>

        <ul className="grid grid-cols-3 grid-rows-2 gap-2.5">
          {covers.map((cover, index) => (
            <li key={cover.slug}>
              <Link
                href="/#work"
                className="relative block aspect-[4/3] overflow-hidden rounded-xl bg-[#EBE8E4]"
                onMouseEnter={() => {
                  setLabel(cover.title);
                  setHovering(true);
                }}
                onMouseLeave={() => setHovering(false)}
              >
                <CoverImg
                  src={cover.src}
                  alt={cover.title}
                  priority={index < 3}
                />
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <CursorLabel visible={hovering} label={label} />
    </section>
  );
}

/** 06 — The accent becomes the surface. */
export function HeroMagenta() {
  return (
    <section
      id="magenta"
      className={cn(HERO_MIN, "bg-[#EE33FF] text-black")}
    >
      <header className="flex items-center justify-between px-10 py-5">
        <Mark className="hover:text-white" />
        <HeroNav
          className="text-black/60"
          linkClassName="hover:text-white"
        />
      </header>

      <div className="relative flex flex-1 flex-col justify-between overflow-hidden px-10 pb-10 pt-8">
        <Image
          src="/img/logo.svg"
          alt=""
          width={420}
          height={480}
          className="pointer-events-none absolute -right-8 top-1/2 w-[min(42vw,28rem)] -translate-y-1/2 opacity-20"
          aria-hidden
        />

        <p className="font-mono text-xs uppercase tracking-widest text-black/55">
          Product design &amp; brand identity
        </p>

        <h1 className="font-sans text-[clamp(4.5rem,14vw,12rem)] font-normal leading-[0.8] tracking-tighter">
          deadpine
        </h1>

        <div className="flex items-end justify-between gap-10">
          <p className="max-w-md font-serif text-xl italic leading-snug">
            Seeking beauty &amp; untangling complexity.
          </p>
          <a
            href="mailto:hey@deadpine.xyz"
            className="border border-black/80 px-4 py-2 font-mono text-xs uppercase tracking-widest text-black transition-colors hover:bg-black hover:text-[#EE33FF]"
          >
            hey@deadpine.xyz
          </a>
        </div>
      </div>
    </section>
  );
}

/** 07 — Work titles as a kinetic field. */
export function HeroMarquee({ projects }: HeroProps) {
  const titles = projects.map((project) => project.title);
  const tags = Array.from(new Set(projects.flatMap((project) => project.tags)));
  const titleLoop = [...titles, ...titles];
  const tagLoop = [...tags, ...tags];

  return (
    <section
      id="marquee"
      className={cn(
        HERO_MIN,
        "exp-marquee-track relative overflow-hidden bg-[#F3F1F0] text-black"
      )}
    >
      <div className="flex flex-1 flex-col justify-center gap-6 py-16">
        <div className="overflow-hidden">
          <ul className="exp-marquee flex w-max gap-10 pr-10">
            {titleLoop.map((title, index) => (
              <li
                key={`${title}-${index}`}
                className="shrink-0 font-serif text-[clamp(2.8rem,6vw,5.5rem)] italic leading-none tracking-tight text-black/85"
              >
                {title}
                <span className="mx-4 text-[#EE33FF]">✦</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="overflow-hidden">
          <ul className="exp-marquee-reverse flex w-max gap-8 pr-8">
            {tagLoop.map((tag, index) => (
              <li
                key={`${tag}-${index}`}
                className="shrink-0 font-mono text-xs uppercase tracking-widest text-black/35"
              >
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="pointer-events-auto w-[min(28rem,86vw)] border border-black/10 bg-[#F3F1F0]/90 px-10 py-10 text-center shadow-[0_12px_40px_rgba(0,0,0,0.06)] backdrop-blur-md">
          <Image
            src="/img/logo.svg"
            alt=""
            width={28}
            height={32}
            className="mx-auto block opacity-90"
            aria-hidden
          />
          <p className="mt-4 font-mono text-xs tracking-tight">
            deadpine.xyz
          </p>
          <p className="mt-3 font-serif text-lg italic leading-snug text-black/70">
            Seeking beauty &amp; untangling complexity.
          </p>
          <div className="mt-8 flex justify-center gap-6 font-mono text-xs uppercase tracking-widest text-black/55">
            <Link href="/" className="transition-colors hover:text-[#EE33FF]">
              work
            </Link>
            <Link
              href="/about"
              className="transition-colors hover:text-[#EE33FF]"
            >
              about
            </Link>
            <a
              href="mailto:hey@deadpine.xyz"
              className="transition-colors hover:text-[#EE33FF]"
            >
              email
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/** 08 — A poster: mixed type, numbered stanzas. */
export function HeroPoster() {
  return (
    <section
      id="poster"
      className={cn(HERO_MIN, "relative bg-[#F3F1F0] text-black")}
    >
      <div
        aria-hidden
        className="absolute bottom-0 left-0 top-0 w-1.5 bg-[#EE33FF]"
      />

      <header className="flex items-center justify-between px-10 py-5 pl-12">
        <Mark />
        <HeroNav />
      </header>

      <div className="flex flex-1 flex-col justify-center px-10 pl-12 pb-8">
        <p className="font-mono text-xs uppercase tracking-widest text-black/40">
          01
        </p>
        <p className="mt-2 font-sans text-[clamp(3.6rem,9vw,8.5rem)] font-normal leading-[0.82] tracking-tighter">
          SEEKING
        </p>
        <p className="font-serif text-[clamp(2.6rem,6.5vw,6rem)] italic leading-[0.9] tracking-tight text-black/80">
          beauty
        </p>

        <p className="mt-8 font-mono text-xs uppercase tracking-widest text-black/40">
          02
        </p>
        <p className="mt-2 font-sans text-[clamp(3.2rem,8vw,7.5rem)] font-normal leading-[0.82] tracking-tighter">
          UNTANGLING
        </p>
        <p className="font-serif text-[clamp(2.6rem,6.5vw,6rem)] italic leading-[0.9] tracking-tight text-black/80">
          complexity<span className="text-[#EE33FF]">.</span>
        </p>
      </div>

      <footer className="flex items-center justify-between border-t border-black/10 px-10 py-5 pl-12 font-mono text-xs uppercase tracking-widest text-black/50">
        <span>Product design · Brand identity · Code</span>
        <span>José Ignacio, UY</span>
        <a
          href="mailto:hey@deadpine.xyz"
          className="normal-case tracking-tight text-black transition-colors hover:text-[#EE33FF]"
        >
          hey@deadpine.xyz
        </a>
      </footer>
    </section>
  );
}
