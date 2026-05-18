import { motion } from "framer-motion";
import type { CollectionEntry } from "astro:content";

interface Props {
  posts: {
    slug: string;
    data: CollectionEntry<"posts">["data"];
  }[];
}

export default function Timeline({ posts }: Props) {
  // Group by year
  const grouped = posts.reduce((acc, post) => {
    const year = new Date(post.data.date).getFullYear();
    (acc[year] ??= []).push(post);
    return acc;
  }, {} as Record<number, typeof posts>);

  const years = Object.keys(grouped)
    .map(Number)
    .sort((a, b) => b - a);

  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/8" />

      {years.map((year) => (
        <div key={year} className="mb-10">
          <motion.h2
            className="text-2xl font-bold text-aurora-300 mb-4 pl-10"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            {year}
          </motion.h2>

          {grouped[year].map((post, i) => (
            <motion.a
              key={post.slug}
              href={`/posts/${post.slug}`}
              className="glass-card block p-4 mb-3 no-underline relative ml-10"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
            >
              {/* Dot on timeline */}
              <div className="absolute -left-[1.625rem] top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-aurora-400 border-2 border-bg-start" />

              <time className="text-xs text-aurora-300">
                {new Date(post.data.date).toISOString().slice(0, 10)}
              </time>
              <h3 className="text-text-primary font-medium mt-1">{post.data.title}</h3>
              <p className="text-text-muted text-xs mt-1">{post.data.description}</p>
            </motion.a>
          ))}
        </div>
      ))}
    </div>
  );
}
