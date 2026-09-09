export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-auto px-5 py-5 md:px-10">
      <div className="font-mono text-xs tracking-wide text-stone-600">
        <span>deadpine ✦ {year}</span>
      </div>
    </footer>
  );
}
