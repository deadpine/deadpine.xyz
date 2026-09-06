import { PineconeOutline } from "@/components/experiments/shared";
import { SiteHeader } from "./site-header";

export function HomeHero() {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[calc(100svh*2/3)] min-w-[1200px] flex-col px-10 pb-12 pt-7"
    >
      <SiteHeader />

      <div className="grid flex-1 grid-cols-2 gap-24">
        <div className="max-w-lg self-center">
          <h1 className="font-serif text-[1.45rem] italic leading-snug text-black/85">
            Seeking beauty &amp; untangling complexity.
          </h1>
          <p className="mt-4 font-sans text-[18px] leading-[1.5] text-black/70">
            Designer with 10+ years of experience working at the intersection of
            product design, brand identity, and technology.
          </p>
        </div>

        <div className="flex items-end justify-end">
          <PineconeOutline className="h-[16rem] w-[14rem]" />
        </div>
      </div>
    </section>
  );
}
