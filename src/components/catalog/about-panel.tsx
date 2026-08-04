const socials = [
  { href: "mailto:hey@deadpine.xyz", label: "hey@deadpine.xyz" },
  { href: "https://github.com/deadpine", label: "GitHub" },
  { href: "https://store.deadpine.xyz/", label: "Store" },
  { href: "https://goodreads.com/deadpine", label: "Goodreads" },
  { href: "https://x.com/deadpine_xyz", label: "X" },
];

export function AboutPanel() {
  return (
    <div className="catalog-scroll h-full overflow-y-auto overscroll-contain px-6 py-8">
      <div className="max-w-md space-y-2.5 font-sans text-[14px] leading-[1.4] text-black/45">
        <p className="font-serif text-[0.95rem] italic text-black/70">
          Seeking beauty & untangling complexity.
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

      <nav
        aria-label="Social links"
        className="mt-10 flex flex-wrap gap-x-5 gap-y-2 font-mono text-[0.68rem] tracking-wide text-black/55"
      >
        {socials.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
            rel={
              link.href.startsWith("mailto:")
                ? undefined
                : "noopener noreferrer"
            }
            className="transition-colors hover:text-[#EE33FF]"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </div>
  );
}
