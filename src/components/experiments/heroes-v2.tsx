"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { CursorLabel } from "@/components/catalog/cursor-label";
import { HeroNav, Mark } from "@/components/experiments/mark";
import {
  AboutCopy,
  CoverImg,
  firstCovers,
  HERO_MIN,
  PineconeMask,
} from "@/components/experiments/shared";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type HeroProps = {
  projects: Project[];
};

/** 09 — 04’s catalog page, with the about as the colophon. */
export function HeroFolio() {
  return (
    <section id="folio" className={cn(HERO_MIN, "bg-[#F3F1F0] p-4 text-black")}>
      <div className="flex min-h-0 flex-1 flex-col border border-black/15 p-3">
        <div className="flex min-h-0 flex-1 flex-col border border-black/15 px-10 py-7">
          <header className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-black/50">
            <span>Catalog</span>
            <span>deadpine.xyz</span>
            <span>2016—present</span>
          </header>

          <div className="flex flex-1 flex-col items-center justify-center">
            <Image
              src="/img/logo.svg"
              alt=""
              width={120}
              height={137}
              className="block opacity-90"
              aria-hidden
            />
          </div>

          <div className="border-t border-black/10 pt-8">
            <AboutCopy />
          </div>
        </div>
      </div>
    </section>
  );
}

/** 10 — 05’s split: about on the left, selected work on the right. */
export function HeroStudio({ projects }: HeroProps) {
  const covers = firstCovers(projects, 6);
  const [hovering, setHovering] = useState(false);
  const [label, setLabel] = useState("view project");

  return (
    <section id="studio" className={cn(HERO_MIN, "bg-[#F3F1F0] text-black")}>
      <header className="flex items-center justify-between px-10 py-5">
        <Mark />
        <HeroNav />
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[minmax(280px,0.85fr)_1.35fr] items-center gap-16 px-10 pb-10">
        <AboutCopy />

        <ul className="grid grid-cols-3 grid-rows-2 gap-3">
          {covers.map((cover, index) => (
            <li key={cover.slug}>
              <Link
                href={`/work/${cover.slug}`}
                className="relative block aspect-[4/3] overflow-hidden rounded-[12px] bg-[#EBE8E4]"
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

/** 11 — One project seen through the pinecone. */
export function HeroCameo({ projects }: HeroProps) {
  const cover = firstCovers(projects, 1)[0];

  return (
    <section id="cameo" className={cn(HERO_MIN, "bg-[#F5F4F0] px-10 py-7 text-black")}>
      <header className="flex items-baseline justify-between font-mono text-[0.68rem] uppercase tracking-[0.14em] text-black/50">
        <span>deadpine.xyz</span>
        <span>Selected work</span>
        <span>2016—present</span>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-2 items-center gap-24">
        <AboutCopy
          showSocials={false}
          className="max-w-lg text-[16px] leading-[1.5] text-black/70"
          taglineClassName="text-[1.1rem] text-black/85"
        />

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
