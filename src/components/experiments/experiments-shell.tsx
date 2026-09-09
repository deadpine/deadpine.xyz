"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  HeroCatalog,
  HeroEditorial,
  HeroMagenta,
  HeroMarquee,
  HeroMosaic,
  HeroPoster,
  HeroSplit,
  HeroWordmark,
} from "@/components/experiments/heroes";
import {
  HeroCameo,
  HeroFolio,
  HeroStudio,
} from "@/components/experiments/heroes-v2";
import { HERO_VARIANTS } from "@/components/experiments/variants";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

type ExperimentsShellProps = {
  projects: Project[];
};

export function ExperimentsShell({ projects }: ExperimentsShellProps) {
  const [active, setActive] = useState<string>(HERO_VARIANTS[0].id);
  const activeVariant =
    HERO_VARIANTS.find((variant) => variant.id === active) ?? HERO_VARIANTS[0];

  useEffect(() => {
    const previous = document.documentElement.style.scrollBehavior;
    document.documentElement.style.scrollBehavior = "smooth";
    return () => {
      document.documentElement.style.scrollBehavior = previous;
    };
  }, []);

  useEffect(() => {
    const sections = HERO_VARIANTS.map((variant) =>
      document.getElementById(variant.id)
    ).filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        const id = visible?.target.id;
        if (id) setActive(id);
      },
      { threshold: [0.35, 0.55, 0.7], rootMargin: "-12% 0px -12% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen min-w-0 bg-[#F3F1F0] text-black">
      <header className="sticky top-0 z-50 flex h-12 items-center justify-between gap-8 border-b border-stone-200 bg-[#F3F1F0]/92 px-6 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <p className="font-mono text-xs uppercase tracking-widest text-stone-400">
            UI experiments
          </p>
          <span className="text-stone-300" aria-hidden>
            /
          </span>
          <p className="truncate font-serif text-xs italic text-stone-500">
            {activeVariant.number} {activeVariant.name} — {activeVariant.blurb}
          </p>
        </div>

        <nav aria-label="Hero variants" className="flex items-center">
          {HERO_VARIANTS.map((variant) => (
            <a
              key={variant.id}
              href={`#${variant.id}`}
              title={`${variant.number} ${variant.name} — ${variant.blurb}`}
              className={cn(
                "px-1.5 py-1 font-mono text-xs tabular-nums tracking-widest transition-colors duration-300 ease-out",
                active === variant.id
                  ? "text-[#EE33FF]"
                  : "text-stone-400 hover:text-black"
              )}
            >
              {variant.number}
            </a>
          ))}
        </nav>

        <Link
          href="/"
          className="shrink-0 font-mono text-xs uppercase tracking-widest text-stone-500 transition-colors duration-300 ease-out hover:text-[#EE33FF]"
        >
          ← site
        </Link>
      </header>

      <HeroEditorial />
      <HeroWordmark />
      <HeroSplit />
      <HeroCatalog projects={projects} />
      <HeroMosaic projects={projects} />
      <HeroMagenta />
      <HeroMarquee projects={projects} />
      <HeroPoster />

      <HeroFolio />
      <HeroStudio projects={projects} />
      <HeroCameo projects={projects} />
    </div>
  );
}
