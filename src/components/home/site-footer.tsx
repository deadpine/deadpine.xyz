import Image from "next/image";

export function SiteFooter() {
  return (
    <footer className="mt-auto px-10 py-5">
      <div className="flex items-center gap-2 font-mono text-[0.68rem] tracking-wide text-black/70">
        <Image
          src="/img/logo.svg"
          alt=""
          width={14}
          height={16}
          className="block opacity-90"
          aria-hidden
        />
        <span>Deadpine ✦ {new Date().getFullYear()}</span>
      </div>
    </footer>
  );
}
