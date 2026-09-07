import Image from "next/image";
import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/" className="text-black transition-opacity hover:opacity-70">
        <Image
          src="/img/logo.svg"
          alt="deadpine.xyz"
          width={16}
          height={18}
          className="block"
          priority
        />
      </Link>
      <nav
        aria-label="Site"
        className="flex items-center gap-5 font-mono text-[0.68rem] uppercase tracking-[0.08em] text-black/55"
      >
        <Link href="/#work" className="transition-colors hover:text-[#EE33FF]">
          work
        </Link>
        <Link href="/about" className="transition-colors hover:text-[#EE33FF]">
          about
        </Link>
      </nav>
    </header>
  );
}
