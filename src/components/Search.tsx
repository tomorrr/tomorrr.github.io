import { useState, useMemo } from "react";
import type { CollectionEntry } from "astro:content";

interface Props {
  posts: {
    slug: string;
    data: CollectionEntry<"posts">["data"];
  }[];
}

export default function Search({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return posts.filter(
      (p) =>
        p.data.title.toLowerCase().includes(q) ||
        p.data.description.toLowerCase().includes(q) ||
        p.data.tags.some((t: string) => t.toLowerCase().includes(q))
    ).slice(0, 8);
  }, [query, posts]);

  return (
    <div className="relative w-full max-w-sm">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="搜索文章..."
        className="w-full bg-white/5 border border-white/10 rounded-lg py-2 px-4 text-sm text-text-primary placeholder:text-text-muted focus:outline-none focus:border-aurora-400/30 transition-colors"
      />

      {filtered.length > 0 && (
        <div className="absolute top-full mt-2 w-full glass p-2 z-20 flex flex-col gap-1">
          {filtered.map((p) => (
            <a
              key={p.slug}
              href={`/posts/${p.slug}`}
              className="block p-2 rounded-lg hover:bg-white/5 transition-colors no-underline"
            >
              <div className="text-sm text-text-primary font-medium">{p.data.title}</div>
              <div className="text-xs text-text-muted mt-0.5">{p.data.description}</div>
            </a>
          ))}
        </div>
      )}

      {query && filtered.length === 0 && (
        <div className="absolute top-full mt-2 w-full glass p-4 z-20 text-center text-sm text-text-muted">
          没有找到相关文章
        </div>
      )}
    </div>
  );
}
