import type { Metadata } from "next";
import { AboutCopy, PineconeOutline } from "@/components/experiments/shared";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Product design and brand identity — deadpine.xyz",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#F3F1F0] text-black">
      <section
        aria-label="About"
        className="flex min-h-[calc(100svh*2/3)] flex-1 flex-col px-5 pb-3 pt-6 md:px-10 md:pt-7"
      >
        <SiteHeader />
        <div className="mt-12 flex flex-1 flex-col md:mt-20">
          <AboutCopy
            className="max-w-lg space-y-4 text-sm leading-normal text-stone-600 md:text-base"
            showSocials={false}
            showTagline={false}
          />
          <div className="mt-12 flex flex-1 items-end justify-end">
            <PineconeOutline className="h-[8.5rem] w-[7.4rem] md:h-52 md:w-[11.375rem]" />
          </div>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
