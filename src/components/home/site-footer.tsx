export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-5 pb-5 pt-2 md:px-10">
      <div className="font-mono text-xs tracking-wide text-stone-600">
        <span>deadpine ✦ {year}</span>
      </div>
    </footer>
  );
}
