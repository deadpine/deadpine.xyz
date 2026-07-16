import type { Project } from "@/lib/projects";

type ProjectDescriptionProps = {
  project: Project;
};

export function ProjectDescription({ project }: ProjectDescriptionProps) {
  const paragraphs = project.description
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div className="border-b border-black/10 bg-[#F3F1EE] px-3 pb-5 pt-3">
      <div className="max-w-prose space-y-3 font-serif text-[0.92rem] leading-[1.65] text-black/80">
        {paragraphs.length > 0 ? (
          paragraphs.map((paragraph) => <p key={paragraph.slice(0, 40)}>{paragraph}</p>)
        ) : (
          <p>
            {project.title}
            {project.tags.length > 0 ? ` — ${project.tags.join(", ")}` : ""}.
          </p>
        )}
      </div>

      {project.link ? (
        <p className="mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[0.8rem] font-medium tracking-wide text-black underline decoration-black/30 underline-offset-4 transition-colors hover:text-[#EE33FF] hover:decoration-[#EE33FF]"
          >
            View project →
          </a>
        </p>
      ) : null}
    </div>
  );
}
