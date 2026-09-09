import { PineconeOutline } from "@/components/experiments/shared";
import { SiteHeader } from "./site-header";

export function HomeHero() {
  return (
    <section
      aria-label="Introduction"
      className="flex flex-col px-5 pb-10 pt-6 md:min-h-[72svh] md:px-10 md:pb-12 md:pt-7"
    >
      <SiteHeader />

      <div className="mt-12 grid flex-1 grid-cols-1 gap-10 md:mt-0 md:grid-cols-2 md:gap-16 lg:gap-24">
        <div className="max-w-xl self-center">
          <h1 className="font-serif text-xl italic leading-snug tracking-tight">
            Seeking beauty and untangling complexity.
          </h1>
          <p className="mt-4 font-sans text-base leading-normal text-black/70 md:text-lg">
            Designer with 10+ years of experience working at the intersection of
            brand identity, product design, and technology.
          </p>
        </div>

        <div className="flex items-end justify-start md:justify-end">
          <PineconeOutline className="h-[8.5rem] w-[7.4rem] md:h-52 md:w-[11.375rem]" />
        </div>
      </div>
    </section>
  );
}
