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
      <div className="max-w-md space-y-5 font-serif text-[0.95rem] leading-[1.7] text-black/80">
        <p>
          For 10 years my journey has intertwined product design and brand
          identity with technology, mostly in crypto. With Bitcoin and Ethereum
          I discovered an opportunity to work fostering an open economic system
          based on freedom and responsibility.
        </p>
        <p>
          I&apos;ve collaborated with projects like{" "}
          <a
            href="https://openzeppelin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            OpenZeppelin
          </a>
          ,{" "}
          <a
            href="https://flashbots.net/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Flashbots
          </a>
          ,{" "}
          <a
            href="https://decentraland.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Decentraland
          </a>
          ,{" "}
          <a
            href="https://ethlatam.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            ETHLatam
          </a>
          ,{" "}
          <a
            href="https://forta.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Forta
          </a>
          ,{" "}
          <a
            href="https://app.exact.ly/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Exactly
          </a>
          ,{" "}
          <a
            href="https://mint.ethernautdao.io/#about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Ethernaut DAO
          </a>
          , and{" "}
          <a
            href="https://app.rewilder.xyz/donation/27"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Rewilder
          </a>
          .
        </p>
        <p>
          I also enjoy bringing my designs to life through coding. I have
          experience in frontend development, including HTML, CSS, React, and
          Svelte.
        </p>
        <p>However, not everything is about technology.</p>
        <p>
          Beyond my professional pursuits, I am interested in biology,
          anthropology, behavioral science, color theory, architecture,
          scenography, and ceramics. I&apos;m part of the{" "}
          <a
            href="https://fuegoaustral.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Fuego Austral
          </a>{" "}
          community, bringing art to life and cultivating meaningful offline
          connections.
        </p>
        <p>
          I invite you to email me at{" "}
          <a
            href="mailto:hey@deadpine.xyz"
            className="text-black underline decoration-black/25 underline-offset-3 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            hey@deadpine.xyz
          </a>{" "}
          and discuss shared interests or potential collaborations.
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
