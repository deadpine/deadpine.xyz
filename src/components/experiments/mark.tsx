import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

type MarkProps = {
  className?: string;
  logoClassName?: string;
  wordmarkClassName?: string;
  href?: string;
};

export function Mark({
  className,
  logoClassName,
  wordmarkClassName,
  href = "/",
}: MarkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-2.5 text-black transition-colors duration-300 ease-out hover:text-[#EE33FF]",
        className
      )}
    >
      <Image
        src="/img/logo.svg"
        alt=""
        width={16}
        height={18}
        className={cn("block opacity-90", logoClassName)}
        aria-hidden
      />
      <span
        className={cn(
          "font-mono text-xs tracking-tight",
          wordmarkClassName
        )}
      >
        deadpine.xyz
      </span>
    </Link>
  );
}

export function HeroNav({
  className,
  linkClassName,
}: {
  className?: string;
  linkClassName?: string;
}) {
  const link = cn(
    "transition-colors duration-300 ease-out hover:text-[#EE33FF]",
    linkClassName
  );

  return (
    <nav
      aria-label="Site"
      className={cn(
        "flex items-center gap-5 font-mono text-xs uppercase tracking-widest text-stone-500",
        className
      )}
    >
      <Link href="/" className={link}>
        work
      </Link>
      <Link href="/about" className={link}>
        about
      </Link>
      <a href="mailto:hey@deadpine.xyz" className={link}>
        email
      </a>
    </nav>
  );
}
