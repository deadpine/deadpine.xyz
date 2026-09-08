export function AboutPanel() {
  return (
    <div className="catalog-scroll h-auto overflow-visible px-5 py-8 lg:h-full lg:overflow-y-auto lg:overscroll-contain lg:px-6">
      <div className="max-w-md space-y-2.5 font-sans text-[14px] leading-[1.4] text-black/45">
        <p className="font-serif text-[0.95rem] italic text-black/70">
          Seeking beauty and untangling complexity.
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
          <span
            className="text-black underline decoration-black/25 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            hey@deadpine.xyz
          </span>
        </p>
      </div>
    </div>
  );
}
