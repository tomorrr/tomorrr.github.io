import { useState } from "react";

interface Post {
  slug: string;
  data: {
    title: string;
    date: string;
    category: string;
    tags: string[];
    description: string;
    draft: boolean;
  };
}

export default function PostList({ posts }: { posts: Post[] }) {
  const categories = ["全部", ...new Set(posts.map((p) => p.data.category))];
  const [active, setActive] = useState("全部");

  const filtered = active === "全部" ? posts : posts.filter((p) => p.data.category === active);

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-baseline justify-between gap-3 mb-6">
        <h2 className="text-2xl font-bold text-text-primary">最新文章</h2>
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-3 py-1.5 rounded-full text-xs transition-colors ${
                active === cat
                  ? "bg-aurora-400/20 text-aurora-200 border border-aurora-400/30"
                  : "bg-white/5 text-text-muted border border-white/10 hover:border-white/20"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {filtered.map((post) => (
          <a
            key={post.slug}
            href={`/posts/${post.slug}`}
            className="glass-card flex flex-col h-full no-underline group"
          >
            <div className="p-5 flex flex-col flex-1">
              <div className="flex items-center gap-2 text-xs text-aurora-300 mb-3">
                <time>{post.data.date}</time>
                <span className="text-text-muted">·</span>
                <span>{post.data.category}</span>
              </div>
              <h3 className="text-text-primary font-bold text-base mb-3 group-hover:text-aurora-200 transition-colors leading-snug flex-1">
                {post.data.title}
              </h3>
              <p className="text-text-muted text-sm line-clamp-2 leading-relaxed mb-3">
                {post.data.description}
              </p>
              {post.data.tags.length > 0 && (
                <div className="flex gap-1.5 flex-wrap mt-auto">
                  {post.data.tags.slice(0, 3).map((tag: string) => (
                    <span className="bg-aurora-400/10 text-aurora-300 px-2 py-0.5 rounded-full text-[10px]">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
