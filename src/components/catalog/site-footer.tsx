const links = [
  { href: "mailto:hey@deadpine.xyz", label: "Email" },
  { href: "https://github.com/deadpine", label: "GitHub" },
  { href: "https://store.deadpine.xyz/", label: "Store" },
  { href: "https://goodreads.com/deadpine", label: "Goodreads" },
  { href: "https://x.com/deadpine_xyz", label: "X" },
];

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-black/10 px-6 py-5">
      <div className="flex flex-wrap items-center justify-between gap-3 text-[0.7rem] uppercase tracking-[0.08em] text-black/55">
        <p>Deadpine ✦ {new Date().getFullYear()}</p>
        <nav aria-label="Social links" className="flex flex-wrap gap-4">
          {links.map((link) => (
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
    </footer>
  );
}
