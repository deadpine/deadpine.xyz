import { PineconeOutline } from "@/components/experiments/shared";
import { SiteHeader } from "./site-header";

export function HomeHero() {
  return (
    <section
      aria-label="Introduction"
      className="flex min-h-[72svh] min-w-[1200px] flex-col px-10 pb-12 pt-7"
    >
      <SiteHeader />

      <div className="grid flex-1 grid-cols-2 gap-24">
        <div className="max-w-xl self-center">
          <h1 className="font-serif text-[1.3rem] italic leading-snug tracking-tight">
            Seeking beauty and untangling complexity.
          </h1>
          <p className="mt-4 font-sans text-[18px] leading-[1.5] text-black/70">
            Designer with 10+ years of experience working at the intersection of
            product design, brand identity, and technology.
          </p>
        </div>

        <div className="flex items-end justify-end">
          <PineconeOutline className="h-[13rem] w-[11.375rem]" />
        </div>
      </div>
    </section>
  );
}
