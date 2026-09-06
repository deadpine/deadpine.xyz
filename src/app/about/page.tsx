import type { Metadata } from "next";
import { AboutCopy } from "@/components/experiments/shared";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";

export const metadata: Metadata = {
  title: "About",
  description: "Product design and brand identity — deadpine.xyz",
};

export default function AboutPage() {
  return (
    <div className="flex min-h-screen min-w-[1200px] flex-col bg-[#F3F1F0] text-black">
      <section
        aria-label="About"
        className="flex min-h-[calc(100svh*2/3)] flex-col px-10 pb-12 pt-7"
      >
        <SiteHeader />
        <div className="mt-20">
          <AboutCopy
            className="max-w-lg space-y-4 text-[18px] leading-[1.5] text-black/70"
            taglineClassName="text-[1.3rem] leading-snug text-black/85"
            showSocials={false}
          />
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
