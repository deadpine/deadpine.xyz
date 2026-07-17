import type { Project } from "@/lib/projects";

type ProjectDetailProps = {
  project: Project;
};

export function ProjectDetail({ project }: ProjectDetailProps) {
  const paragraphs = project.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="catalog-scroll h-full overflow-y-auto overscroll-contain px-6 py-8">
      <header className="mb-8 space-y-2 border-b border-black/10 pb-6">
        <p className="font-mono text-[0.62rem] tabular-nums text-black/45">
          {project.number}
          <span className="mx-2 text-black/25">·</span>
          {project.dateLabel}
        </p>
        <h2 className="font-mono text-lg font-normal tracking-tight text-black">
          {project.title}
        </h2>
        {project.tags.length > 0 ? (
          <p className="font-serif text-[0.85rem] italic text-black/55">
            {project.tags.join(" · ")}
          </p>
        ) : null}
      </header>

      <div className="max-w-md space-y-4 font-serif text-[0.95rem] leading-[1.7] text-black/80">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 48)}>{paragraph}</p>
          ))
        ) : (
          <p>
            {project.title}
            {project.tags.length > 0 ? ` — ${project.tags.join(", ")}` : ""}.
          </p>
        )}
      </div>

      {project.link ? (
        <p className="mt-8">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono text-[0.72rem] tracking-wide text-black underline decoration-black/30 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            Open project →
          </a>
        </p>
      ) : null}
    </div>
  );
}
