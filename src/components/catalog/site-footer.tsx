import Image from "next/image";
import Link from "next/link";

export type CatalogView = "work" | "about" | "project";

type SiteFooterProps = {
  view: CatalogView;
  onShowAbout: () => void;
  onShowWork: () => void;
};

export function SiteFooter({ view, onShowAbout, onShowWork }: SiteFooterProps) {
  return (
    <footer className="mt-auto shrink-0 border-t border-black/10 px-4 py-4">
      <div className="flex items-center justify-between gap-3 font-mono text-[0.68rem] tracking-wide text-black/55">
        <div className="flex items-center gap-2 text-black/70">
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

        <nav aria-label="Site" className="flex items-center gap-4">
          {view === "work" ? (
            <>
              <button
                type="button"
                onClick={onShowAbout}
                className="cursor-pointer bg-transparent uppercase tracking-[0.08em] text-black/55 transition-colors hover:text-[#EE33FF]"
              >
                about
              </button>
              <Link
                href="/"
                className="uppercase tracking-[0.08em] text-black/55 transition-colors hover:text-[#EE33FF]"
              >
                grid
              </Link>
            </>
          ) : (
            <button
              type="button"
              onClick={onShowWork}
              className="cursor-pointer bg-transparent uppercase tracking-[0.08em] text-black/55 transition-colors hover:text-[#EE33FF]"
            >
              work
            </button>
          )}
        </nav>
      </div>
    </footer>
  );
}
