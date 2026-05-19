import { useState } from "react";

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
    image?: string;
    tags: string[];
    url?: string;
    order: number;
    draft: boolean;
  };
}

export default function ProjectFilter({ projects }: { projects: Project[] }) {
  const allTags = [...new Set(projects.flatMap((p) => p.data.tags))];
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const filtered = activeTag
    ? projects.filter((p) => p.data.tags.includes(activeTag))
    : projects;

  return (
    <div>
      <div className="flex gap-2 flex-wrap mb-6">
        <button
          onClick={() => setActiveTag(null)}
          className={`px-3 py-1 rounded-full text-xs border transition-colors ${
            activeTag === null
              ? "bg-aurora-400/20 text-aurora-200 border-aurora-400/30"
              : "bg-white/5 text-text-muted border-white/10 hover:border-white/20"
          }`}
        >
          全部
        </button>
        {allTags.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`px-3 py-1 rounded-full text-xs border transition-colors ${
              activeTag === tag
                ? "bg-aurora-400/20 text-aurora-200 border-aurora-400/30"
                : "bg-white/5 text-text-muted border-white/10 hover:border-white/20"
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((p) => (
          <a
            key={p.slug}
            href={`/projects/${p.slug}`}
            className="glass-card block overflow-hidden no-underline group"
          >
            {p.data.image ? (
              <div className="h-28 overflow-hidden">
                <img src={p.data.image} alt={p.data.title} className="w-full h-full object-cover" />
              </div>
            ) : (
              <div className="h-28 bg-gradient-to-br from-aurora-400/10 to-aurora-400/5" />
            )}
            <div className="p-4">
              <h3 className="text-text-primary font-bold text-sm mb-1 group-hover:text-aurora-200 transition-colors">
                {p.data.title}
              </h3>
              <p className="text-text-muted text-xs leading-relaxed mb-3">{p.data.description}</p>
              <div className="flex gap-1.5 flex-wrap">
                {p.data.tags.map((tag: string) => (
                  <span key={tag} className="bg-aurora-400/8 text-aurora-300 px-2 py-0.5 rounded-full text-[10px] border border-aurora-400/10">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
