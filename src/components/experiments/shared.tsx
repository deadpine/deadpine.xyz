import Image from "next/image";
import type { ReactNode } from "react";
import { isVideoSrc } from "@/components/home/website-video-frame";
import type { Project } from "@/lib/projects";
import { cn } from "@/lib/utils";

export const HERO_MIN =
  "flex min-h-[calc(100svh-3rem)] min-w-[1200px] scroll-mt-12 flex-col";

export type Cover = {
  title: string;
  src: string;
  slug: string;
  dateLabel: string;
};

export function firstCovers(projects: Project[], count: number): Cover[] {
  const covers: Cover[] = [];
  for (const project of projects) {
    const src = project.images.find((image) => !isVideoSrc(image));
    if (!src) continue;
    covers.push({
      title: project.title,
      src,
      slug: project.slug,
      dateLabel: project.dateLabel,
    });
    if (covers.length >= count) break;
  }
  return covers;
}

export function CoverImg({
  src,
  alt,
  priority = false,
  sizes = "(min-width: 1200px) 40vw, 100vw",
}: {
  src: string;
  alt: string;
  priority?: boolean;
  sizes?: string;
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
      sizes={sizes}
      priority={priority}
      className="object-cover"
    />
  );
}

const ABOUT_SOCIALS = [
  { href: "mailto:hey@deadpine.xyz", label: "hey@deadpine.xyz" },
  { href: "https://github.com/deadpine", label: "GitHub" },
  { href: "https://store.deadpine.xyz/", label: "Store" },
  { href: "https://goodreads.com/deadpine", label: "Goodreads" },
  { href: "https://x.com/deadpine_xyz", label: "X" },
];

/** Mirrors the about panel — tagline, body, email, socials. */
export function AboutCopy({
  className,
  taglineClassName,
  showSocials = true,
}: {
  className?: string;
  taglineClassName?: string;
  showSocials?: boolean;
}) {
  return (
    <div>
      <div
        className={cn(
          "max-w-md space-y-2.5 font-sans text-[14px] leading-[1.4] text-black/45",
          className
        )}
      >
        <p
          className={cn(
            "font-serif text-[0.95rem] italic text-black/70",
            taglineClassName
          )}
        >
          Seeking beauty &amp; untangling complexity.
        </p>
        <p>
          For 10+ years I&apos;ve worked at the intersection of product design,
          brand identity, and technology— mostly in crypto, exploring open
          economic systems built around freedom and personal responsibility.
        </p>
        <p>
          I&apos;m drawn to curious people, unconventional ideas, and the messy
          process of creation.
        </p>
        <p>
          I design and I code, and I like taking things all the way from concept
          to working product.
        </p>
        <p>
          Beyond technology, I&apos;m curious about biology, anthropology,
          architecture, and ceramics. I also run Club del Sur, a social and
          cultural club for the local community of José Ignacio, Uruguay.
        </p>
        <p>
          Email me at{" "}
          <a
            href="mailto:hey@deadpine.xyz"
            className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            hey@deadpine.xyz
          </a>
        </p>
      </div>
      {showSocials ? <AboutSocials /> : null}
    </div>
  );
}

export function AboutSocials({ className }: { className?: string }) {
  return (
    <nav
      aria-label="Social links"
      className={cn(
        "mt-8 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-wide text-black/55",
        className
      )}
    >
      {ABOUT_SOCIALS.map((link) => (
        <a
          key={link.href}
          href={link.href}
          target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          rel={
            link.href.startsWith("mailto:") ? undefined : "noopener noreferrer"
          }
          className="transition-colors hover:text-[#EE33FF]"
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
}

const PINE_PATH =
  "M20.9985 16.175C20.9354 15.8558 20.5681 15.6372 20.2623 15.7765C19.7656 15.2727 18.8757 15.5286 18.2285 15.574C18.256 15.5562 18.5844 15.0783 18.5844 15.0783C18.6249 14.5194 18.5084 13.9832 18.366 13.4487C18.8854 13.5377 20.2445 13.6139 20.3254 13.6106C21.1069 13.5669 20.6959 11.4967 19.9743 11.4529C19.9743 11.4529 17.2383 11.8547 17.0457 11.8271C17.8774 10.9329 19.2138 10.5555 19.8724 9.52199C20.916 8.60512 18.7737 8.01872 18.1411 7.70121C18.6281 7.49386 19.0391 7.37075 19.5374 7.24602H19.5423L19.5455 7.2444L19.6507 7.21686L19.6119 7.14558C20.45 6.32591 18.777 4.82101 17.9518 5.41228C17.2415 5.59857 16.5814 5.92741 15.9471 6.29189C16.5716 5.5111 17.2544 4.62014 17.5861 3.68222L17.5489 3.66602C17.4826 3.05531 17.159 0.76314 16.2367 1.59415C16.5328 0.601149 15.3614 -0.654281 14.6074 0.39866C14.3453 0.94133 14.0298 1.4759 13.7919 2.03639C13.7887 1.66705 14.2304 0.597909 13.889 0.303086C13.3227 -0.0176565 12.1982 0.562271 12.1869 1.23291C12.3309 1.91328 12.3212 3.45867 12.2662 3.49269C12.1739 3.551 12.0817 3.61418 11.9814 3.67736C11.9911 3.55586 11.8519 2.44947 11.674 2.1676C11.1319 1.30905 9.79547 1.53584 9.26477 2.73457C9.00103 4.0791 9.63691 5.77028 9.6094 7.2525C9.05281 6.06996 8.96382 4.46139 7.97199 3.57854C7.97199 3.57854 4.92692 3.71462 5.5822 5.09964C5.86374 5.54511 7.09827 6.96253 7.2633 7.212C7.2633 7.212 6.38959 6.43606 5.99479 6.36641C5.46085 6.27407 4.89941 6.49438 4.91074 7.10185C5.01591 7.2687 5.09842 7.49872 5.4204 7.5457C5.33303 7.98146 5.91389 8.31192 6.13394 8.65534C5.33141 8.20501 3.9723 5.71844 3.10181 6.67419C2.28311 7.2282 1.60517 7.95554 1.08417 8.79465C1.79771 9.31626 2.7588 9.6937 3.60987 9.86541C3.69724 10.1068 3.98848 10.2882 4.17455 10.4729C3.25552 10.0339 1.58737 10.5895 2.68275 11.6911C2.51772 11.5777 1.23303 10.5247 0.862506 10.0549C0.3496 10.528 -0.452926 12.6128 0.47095 12.8687C0.550232 13.1295 0.857652 13.2364 1.08741 13.3434C-1.20368 13.528 0.63275 15.8072 1.97083 15.6938C2.24589 15.6712 2.49992 15.5464 2.69246 15.2808C2.73129 15.3326 2.77983 15.3763 2.83484 15.4071C2.71997 15.5027 2.59215 15.7262 2.62774 15.9125C2.50963 15.8672 2.38019 15.8558 2.25075 15.885H2.24428C1.72975 15.953 1.22979 16.1766 0.7541 16.3564C0.73792 17.7771 1.8058 19.384 3.20537 19.7031C2.38828 20.4062 4.25221 21.4526 4.8088 21.8349L4.78777 21.8317C6.14041 22.653 7.48821 24.4462 9.2405 23.8776L9.0965 23.6346C9.98154 23.6476 10.8067 24.0915 11.7031 23.9829L11.6319 23.7885C12.5914 23.7399 14.2272 24.0202 14.5993 22.8749L14.6543 22.9948C15.1899 23.1373 16.4293 22.7162 16.3031 22.0374C17.1816 22.1362 16.9373 21.1529 16.439 20.8128C17.6072 22.0633 18.6119 21.0088 19.1701 19.7809C19.1701 19.7809 18.9339 19.4925 18.9339 19.4844C17.8952 19.2528 16.837 18.8883 15.7626 19.0908L16.1671 18.7798C16.1671 18.7798 16.3888 18.6194 16.4891 18.5708C16.4891 18.5708 19.6636 18.6696 20.1604 18.7668C20.4775 17.9358 21.0584 17.1015 20.9952 16.1814L20.9985 16.175Z";

/** Project imagery clipped to the pinecone, with a hairline outline. */
export function PineconeMask({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <div className="pine-mask absolute inset-0 overflow-hidden bg-[#EBE8E4]">
        {children}
      </div>
      <svg
        viewBox="0 0 21 24"
        className="pointer-events-none absolute inset-0 h-full w-full overflow-visible text-[#101010]"
        aria-hidden
      >
        <path
          d={PINE_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.14"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}
