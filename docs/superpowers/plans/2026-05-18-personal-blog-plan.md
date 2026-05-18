# Personal Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a glass-morphism personal blog with Astro + React islands, deploy to GitHub Pages.

**Architecture:** Astro static site with React islands for interactive features. Content managed via Markdown files with type-safe collections. Styling via Tailwind CSS with custom glass-morphism utilities. GitHub Actions deploys to GitHub Pages on push to main.

**Tech Stack:** Astro 5, Tailwind CSS 4, React 19, Framer Motion, TypeScript, Vitest

---

### Task 1: Project Scaffold

**Files:**
- Create: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/env.d.ts`, `tailwind.config.mjs` (or postcss config)

- [ ] **Step 1: Create Astro project**

```bash
npm create astro@latest blog -- --template basics --typescript strict --install --git false
# Move contents from blog/ up to project root
```

Since we already have a directory structure, run:

```bash
cd e:/Bloger
npm create astro@latest . -- --template basics --typescript strict --install --git false --skip-houston
```

- [ ] **Step 2: Add React and Tailwind integrations**

```bash
cd e:/Bloger
npx astro add react tailwind --yes
```

- [ ] **Step 3: Install additional dependencies**

```bash
npm install framer-motion
```

- [ ] **Step 4: Verify Tailwind config exists and configure content paths**

Read `tailwind.config.mjs` (Astro 5 may use Vite plugin). Ensure it scans `src/**/*.{astro,ts,tsx}`.

Create `src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-glass-bg: rgba(255, 255, 255, 0.04);
  --color-glass-border: rgba(255, 255, 255, 0.08);
  --color-glass-hover: rgba(255, 255, 255, 0.08);
  --color-aurora-100: #e0f2fe;
  --color-aurora-200: #bae6fd;
  --color-aurora-300: #7dd3fc;
  --color-aurora-400: #60a5fa;
  --color-aurora-500: #93c5fd;
  --color-bg-start: #0f172a;
  --color-bg-end: #1e293b;
  --color-text-primary: #f0f9ff;
  --color-text-body: #cbd5e1;
  --color-text-muted: #94a3b8;
}

body {
  background: linear-gradient(135deg, var(--color-bg-start), var(--color-bg-end));
  color: var(--color-text-body);
  min-height: 100vh;
}
```

- [ ] **Step 5: Run build to verify scaffold works**

```bash
npm run build
```
Expected: Build succeeds with no errors.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: scaffold Astro project with React and Tailwind"
```

---

### Task 2: Content Collections Schema

**Files:**
- Create: `src/content/config.ts`
- Create: `src/content/about.md`
- Create: `src/content/posts/hello-world.md`
- Create: `src/content/projects/demo-project.md`

- [ ] **Step 1: Write content collection schemas**

Create `src/content/config.ts`:

```typescript
import { defineCollection, z } from "astro:content";

const posts = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string(),
    tags: z.array(z.string()).default([]),
    description: z.string(),
    draft: z.boolean().default(false),
  }),
});

const projects = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()).default([]),
    url: z.string().optional(),
    order: z.number().default(0),
    draft: z.boolean().default(false),
  }),
});

export const collections = { posts, projects };
```

- [ ] **Step 2: Create sample content**

Create `src/content/posts/hello-world.md`:

```markdown
---
title: "Hello World"
date: 2026-05-18
category: "随想"
tags: ["博客", "Astro"]
description: "第一篇博客文章，记录搭建这个博客的过程和想法。"
---

## 为什么写博客

一直想有一个自己的空间来记录思考和成长。GitHub Pages 免费、Astro 够快、Markdown 够简单——三者的组合让我没有理由再拖延。

## 这个博客用什么搭建

- **Astro** — 静态站点框架，零 JavaScript 输出
- **Tailwind CSS** — 原子化样式，玻璃拟态很容易实现
- **React + Framer Motion** — 只在需要动效的地方嵌入
- **GitHub Pages** — 免费托管，自动部署

后续会陆续写一些关于前端开发、工具使用和个人项目的文章。Stay tuned.
```

Create `src/content/projects/demo-project.md`:

```markdown
---
title: "示例项目"
description: "这是一个示例项目，展示项目卡片的样式。"
tags: ["Astro", "React", "Tailwind"]
url: "https://github.com"
order: 1
---

这个项目的详细介绍会出现在项目详情页。
```

Create `src/content/about.md`:

```markdown
---
title: "关于我"
---

你好，我是一名开发者。

这里记录我的学习过程、项目成果和一些随想。

### 技能
- 前端开发：React, TypeScript, Tailwind CSS
- 工具链：VS Code, Git, Node.js

### 联系
- GitHub: [github.com/yourname](https://github.com)
- Email: yourname@example.com
```

- [ ] **Step 3: Verify collections are valid**

```bash
npx astro sync
```
Expected: No type errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add content collections schema and sample content"
```

---

### Task 3: Global Styles and Glass Theme

**Files:**
- Create: `src/styles/global.css` (update existing)
- Create: `src/styles/glass.css`

- [ ] **Step 1: Write the glass-morphism CSS utilities**

Create `src/styles/glass.css`:

```css
@layer components {
  .glass {
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid rgba(255, 255, 255, 0.08);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-radius: 12px;
  }

  .glass-hover {
    transition: transform 0.2s ease, border-color 0.2s ease, background 0.2s ease;
  }

  .glass-hover:hover {
    transform: translateY(-2px);
    border-color: rgba(147, 197, 253, 0.25);
    background: rgba(255, 255, 255, 0.06);
  }

  .glass-card {
    @apply glass glass-hover;
  }

  .text-gradient {
    background: linear-gradient(135deg, #bae6fd, #93c5fd, #60a5fa);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .glow-dot {
    position: absolute;
    border-radius: 50%;
    filter: blur(40px);
    pointer-events: none;
  }

  .prose {
    color: #cbd5e1;
    line-height: 1.8;
  }

  .prose h2 {
    color: #f0f9ff;
    font-size: 1.5rem;
    font-weight: 700;
    margin-top: 2.5rem;
    margin-bottom: 1rem;
  }

  .prose h3 {
    color: #e0f2fe;
    font-size: 1.2rem;
    font-weight: 600;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
  }

  .prose p {
    margin-bottom: 1.25rem;
  }

  .prose code {
    background: rgba(147, 197, 253, 0.12);
    color: #bae6fd;
    padding: 2px 6px;
    border-radius: 4px;
    font-size: 0.9em;
  }

  .prose pre {
    background: rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(255, 255, 255, 0.06);
    border-radius: 10px;
    padding: 16px 20px;
    overflow-x: auto;
    margin: 1.5rem 0;
  }

  .prose pre code {
    background: none;
    padding: 0;
    font-size: 0.85rem;
    color: #cbd5e1;
  }

  .prose blockquote {
    border-left: 2px solid rgba(147, 197, 253, 0.3);
    padding: 12px 16px;
    margin: 1.5rem 0;
    background: rgba(147, 197, 253, 0.04);
    border-radius: 0 8px 8px 0;
  }

  .prose blockquote p {
    margin: 0;
  }

  .prose ul, .prose ol {
    margin-bottom: 1.25rem;
    padding-left: 1.5rem;
  }

  .prose li {
    margin-bottom: 0.5rem;
  }

  .prose a {
    color: #7dd3fc;
    text-decoration: underline;
    text-underline-offset: 2px;
  }

  .prose a:hover {
    color: #bae6fd;
  }

  .prose strong {
    color: #e2e8f0;
  }

  .prose img {
    border-radius: 10px;
    margin: 1.5rem 0;
  }
}
```

- [ ] **Step 2: Update global.css to import glass utilities**

Add to `src/styles/global.css` after the `@import "tailwindcss"` and theme:

```css
/* ... existing tailwind import and theme ... */

@import "./glass.css";
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add glass-morphism theme and prose styles"
```

---

### Task 4: BaseLayout and Navigation

**Files:**
- Create: `src/components/Nav.astro`
- Create: `src/components/Footer.astro`
- Create: `src/layouts/BaseLayout.astro`

- [ ] **Step 1: Write Nav component**

Create `src/components/Nav.astro`:

```astro
---
const navItems = [
  { href: "/", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/archive", label: "归档" },
  { href: "/friends", label: "友链" },
  { href: "/about", label: "关于" },
];
const currentPath = Astro.url.pathname;
---

<nav class="flex items-center justify-between py-4 mb-12">
  <a href="/" class="text-white font-bold text-lg tracking-tight">
    <span class="text-gradient">BLOG</span>
  </a>
  <div class="flex gap-6 text-sm">
    {navItems.map((item) => (
      <a
        href={item.href}
        class={
          currentPath === item.href
            ? "text-aurora-200 font-medium"
            : "text-text-muted hover:text-aurora-200 transition-colors"
        }
      >
        {item.label}
      </a>
    ))}
  </div>
</nav>
```

- [ ] **Step 2: Write Footer component**

Create `src/components/Footer.astro`:

```astro
<footer class="text-center pt-10 pb-8 border-t border-white/5 mt-20">
  <div class="flex justify-center gap-5 mb-3">
    <a href="https://github.com" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors">GitHub</a>
    <a href="/rss.xml" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors">RSS</a>
    <a href="mailto:you@example.com" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors">Email</a>
  </div>
  <p class="text-text-muted text-xs">&copy; {new Date().getFullYear()} — Built with Astro</p>
</footer>
```

- [ ] **Step 3: Write BaseLayout**

Create `src/layouts/BaseLayout.astro`:

```astro
---
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";
import "../styles/global.css";

export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description || title} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen font-sans antialiased">
    <!-- Background glow orbs -->
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="glow-dot w-96 h-96 bg-aurora-400/10 -top-48 -right-48"></div>
      <div class="glow-dot w-64 h-64 bg-aurora-400/8 bottom-0 left-1/4"></div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-4">
      <Nav />
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </body>
</html>
```

- [ ] **Step 4: Update the homepage to use BaseLayout**

Edit `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---

<BaseLayout title="My Blog" description="个人博客 — 记录思考与创造">
  <h1 class="text-4xl font-bold text-text-primary">Hello World</h1>
</BaseLayout>
```

- [ ] **Step 5: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: add BaseLayout with Nav and Footer"
```

---

### Task 5: Homepage with Hero and Post List

**Files:**
- Create: `src/components/PostCard.astro`
- Create: `src/utils/posts.ts`
- Modify: `src/pages/index.astro`

- [ ] **Step 1: Write post utility functions**

Create `src/utils/posts.ts`:

```typescript
import { getCollection } from "astro:content";

export async function getPublishedPosts() {
  const posts = await getCollection("posts");
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}

export function readingTime(text: string): number {
  const wordsPerMinute = 300;
  const chineseChars = (text.match(/[一-鿿]/g) || []).length;
  const englishWords = (text.match(/[a-zA-Z]+/g) || []).length;
  const totalWords = chineseChars + englishWords;
  return Math.max(1, Math.ceil(totalWords / wordsPerMinute));
}

export function formatDate(date: Date): string {
  return date.toISOString().slice(0, 10);
}
```

- [ ] **Step 2: Write PostCard component**

Create `src/components/PostCard.astro`:

```astro
---
import type { CollectionEntry } from "astro:content";
import { formatDate, readingTime } from "../utils/posts";

const { post } = Astro.props as { post: CollectionEntry<"posts"> };
const { title, date, category, tags } = post.data;
const body = post.body || "";
const minutes = readingTime(body);
---

<a
  href={`/posts/${post.slug}`}
  class="glass-card block p-5 no-underline group"
>
  <div class="flex items-center gap-2 text-xs text-aurora-300 mb-2">
    <time datetime={formatDate(date)}>{formatDate(date)}</time>
    <span class="text-text-muted">·</span>
    <span>{category}</span>
    <span class="text-text-muted">·</span>
    <span>{minutes} 分钟阅读</span>
  </div>
  <h3 class="text-text-primary font-bold text-lg mb-2 group-hover:text-aurora-200 transition-colors">
    {title}
  </h3>
  <p class="text-text-muted text-sm line-clamp-2">{post.data.description}</p>
</a>
```

- [ ] **Step 3: Write the homepage**

Rewrite `src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PostCard from "../components/PostCard.astro";
import { getPublishedPosts } from "../utils/posts";

const posts = await getPublishedPosts();
---

<BaseLayout title="My Blog" description="个人博客 — 记录思考与创造">
  <!-- Hero -->
  <section class="text-center mb-16 pt-8">
    <div class="w-20 h-20 rounded-full mx-auto mb-5 bg-aurora-400/10 border-2 border-aurora-400/20 flex items-center justify-center">
      <span class="text-3xl">👋</span>
    </div>
    <h1 class="text-4xl font-bold text-text-primary mb-3">
      Hi, 我是 <span class="text-gradient">[你的名字]</span>
    </h1>
    <p class="text-text-muted max-w-md mx-auto leading-relaxed">
      前端开发者 / 写点东西 / 做些项目<br />
      这里记录我的想法、成长和创造。
    </p>
  </section>

  <!-- Post list -->
  <section>
    <div class="flex items-baseline justify-between mb-6">
      <h2 class="text-xl font-bold text-text-primary">最新文章</h2>
      {posts.length > 5 && (
        <a href="/archive" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors">
          查看全部 &rarr;
        </a>
      )}
    </div>
    <div class="flex flex-col gap-4">
      {posts.slice(0, 5).map((post) => (
        <PostCard post={post} />
      ))}
    </div>
  </section>
</BaseLayout>
```

- [ ] **Step 4: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add homepage with hero and post list"
```

---

### Task 6: StarField Canvas Animation

**Files:**
- Create: `src/components/StarField.tsx`

- [ ] **Step 1: Write the StarField component**

Create `src/components/StarField.tsx`:

```tsx
import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  r: number;
  opacity: number;
  speed: number;
  drift: number;
  phase: number;
}

export default function StarField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let stars: Star[] = [];
    let animId: number;

    function resize() {
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    function createStars() {
      const count = Math.floor((canvas!.width * canvas!.height) / 6000);
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * canvas!.width,
        y: Math.random() * canvas!.height,
        r: Math.random() * 1.5 + 0.3,
        opacity: Math.random() * 0.6 + 0.1,
        speed: Math.random() * 0.3 + 0.05,
        drift: (Math.random() - 0.5) * 0.15,
        phase: Math.random() * Math.PI * 2,
      }));
    }
    createStars();
    window.addEventListener("resize", createStars);

    let frame = 0;
    function draw() {
      frame++;
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      for (const s of stars) {
        const flicker = Math.sin(frame * 0.02 + s.phase) * 0.3 + 0.7;
        const alpha = s.opacity * flicker;

        ctx!.beginPath();
        ctx!.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(186, 230, 253, ${alpha})`;
        ctx!.fill();

        // Add subtle glow for larger stars
        if (s.r > 1) {
          ctx!.beginPath();
          ctx!.arc(s.x, s.y, s.r * 3, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(186, 230, 253, ${alpha * 0.12})`;
          ctx!.fill();
        }

        s.y -= s.speed;
        s.x += s.drift;

        if (s.y < -5) s.y = canvas!.height + 5;
        if (s.x < -5) s.x = canvas!.width + 5;
        if (s.x > canvas!.width + 5) s.x = -5;
      }

      animId = requestAnimationFrame(draw);
    }
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("resize", createStars);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      class="fixed inset-0 pointer-events-none -z-5"
      style={{ zIndex: -5 }}
    />
  );
}
```

- [ ] **Step 2: Add StarField to the homepage**

Edit `src/pages/index.astro`, add after `BaseLayout` opening tag (inside it, before Hero):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import PostCard from "../components/PostCard.astro";
import StarField from "../components/StarField";
import { getPublishedPosts } from "../utils/posts";

const posts = await getPublishedPosts();
---

<BaseLayout title="My Blog" description="个人博客 — 记录思考与创造">
  <StarField client:load />
  <!-- Hero -->
  <section class="text-center mb-16 pt-8">
    ...rest unchanged...
  </section>
  ...
</BaseLayout>
```

Note: Add `client:load` to make the React island hydrate on page load.

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds, canvas component is bundled.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add star field canvas animation to homepage"
```

---

### Task 7: Post Detail Page

**Files:**
- Create: `src/pages/posts/[...slug].astro`

- [ ] **Step 1: Write the post detail page**

Create `src/pages/posts/[...slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import { formatDate, readingTime } from "../../utils/posts";

export async function getStaticPaths() {
  const posts = await getCollection("posts");
  return posts
    .filter((p) => !p.data.draft)
    .map((p) => ({ params: { slug: p.slug } }));
}

const { slug } = Astro.params;
const posts = await getCollection("posts");
const post = posts.find((p) => p.slug === slug);

if (!post) {
  return Astro.rewrite("/404");
}

const { Content } = await post.render();
const { title, date, category, tags } = post.data;
const minutes = readingTime(post.body || "");

// Previous and next posts
const published = posts
  .filter((p) => !p.data.draft)
  .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
const currentIdx = published.findIndex((p) => p.slug === slug);
const prevPost = currentIdx > 0 ? published[currentIdx - 1] : null;
const nextPost = currentIdx < published.length - 1 ? published[currentIdx + 1] : null;
---

<BaseLayout title={title} description={post.data.description}>
  <article class="max-w-prose mx-auto">
    <a href="/" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors mb-6 inline-block">
      &larr; 返回文章列表
    </a>

    <header class="mb-8">
      <div class="flex items-center gap-2 text-xs text-aurora-300 mb-3 flex-wrap">
        <time datetime={formatDate(date)}>{formatDate(date)}</time>
        <span class="text-text-muted">·</span>
        <span>{category}</span>
        <span class="text-text-muted">·</span>
        <span>{minutes} 分钟阅读</span>
      </div>
      <h1 class="text-3xl font-bold text-text-primary leading-snug mb-4">{title}</h1>
      <div class="flex gap-2 flex-wrap">
        {tags.map((tag: string) => (
          <span class="bg-aurora-400/10 text-aurora-300 px-3 py-1 rounded-full text-xs border border-aurora-400/15">
            {tag}
          </span>
        ))}
      </div>
    </header>

    <div class="prose">
      <Content />
    </div>

    <!-- Prev/Next navigation -->
    <nav class="mt-16 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
      <div>
        {prevPost && (
          <a href={`/posts/${prevPost.slug}`} class="glass block p-4 no-underline group">
            <span class="text-xs text-text-muted">&larr; 上一篇</span>
            <p class="text-text-primary text-sm font-medium mt-1 group-hover:text-aurora-200 transition-colors">
              {prevPost.data.title}
            </p>
          </a>
        )}
      </div>
      <div class="text-right">
        {nextPost && (
          <a href={`/posts/${nextPost.slug}`} class="glass block p-4 no-underline group">
            <span class="text-xs text-text-muted">下一篇 &rarr;</span>
            <p class="text-text-primary text-sm font-medium mt-1 group-hover:text-aurora-200 transition-colors">
              {nextPost.data.title}
            </p>
          </a>
        )}
      </div>
    </nav>
  </article>
</BaseLayout>
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds, post detail pages are generated.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add post detail page"
```

---

### Task 8: Projects Page

**Files:**
- Create: `src/components/ProjectCard.astro`
- Create: `src/pages/projects/index.astro`

- [ ] **Step 1: Write ProjectCard component**

Create `src/components/ProjectCard.astro`:

```astro
---
import type { CollectionEntry } from "astro:content";

const { project } = Astro.props as { project: CollectionEntry<"projects"> };
const { title, description, tags } = project.data;
---

<a
  href={`/projects/${project.slug}`}
  class="glass-card block overflow-hidden no-underline group"
>
  <!-- Cover -->
  <div class="h-28 bg-gradient-to-br from-aurora-400/10 to-aurora-400/5"></div>
  <!-- Body -->
  <div class="p-4">
    <h3 class="text-text-primary font-bold text-sm mb-1 group-hover:text-aurora-200 transition-colors">
      {title}
    </h3>
    <p class="text-text-muted text-xs leading-relaxed mb-3">{description}</p>
    <div class="flex gap-1.5 flex-wrap">
      {tags.map((tag: string) => (
        <span class="bg-aurora-400/8 text-aurora-300 px-2 py-0.5 rounded-full text-[10px] border border-aurora-400/10">
          {tag}
        </span>
      ))}
    </div>
  </div>
</a>
```

- [ ] **Step 2: Write projects page**

Create `src/pages/projects/index.astro`:

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import ProjectCard from "../../components/ProjectCard.astro";

const projects = (await getCollection("projects"))
  .filter((p) => !p.data.draft)
  .sort((a, b) => a.data.order - b.data.order);
---

<BaseLayout title="项目" description="我的项目和作品">
  <h1 class="text-3xl font-bold text-text-primary mb-2">我的项目</h1>
  <p class="text-text-muted mb-8">一些自己动手做的东西</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
    {projects.map((p) => (
      <ProjectCard project={p} />
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds, projects page generated.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add projects page and ProjectCard"
```

---

### Task 9: Project Detail Page

**Files:**
- Create: `src/pages/projects/[...slug].astro`

- [ ] **Step 1: Write project detail page**

Create `src/pages/projects/[...slug].astro`:

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";

export async function getStaticPaths() {
  const projects = await getCollection("projects");
  return projects
    .filter((p) => !p.data.draft)
    .map((p) => ({ params: { slug: p.slug } }));
}

const { slug } = Astro.params;
const projects = await getCollection("projects");
const project = projects.find((p) => p.slug === slug);

if (!project) {
  return Astro.rewrite("/404");
}

const { Content } = await project.render();
const { title, description, tags, url } = project.data;
---

<BaseLayout title={title} description={description}>
  <div class="max-w-prose mx-auto">
    <a href="/projects" class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors mb-6 inline-block">
      &larr; 返回项目列表
    </a>

    <header class="mb-8">
      <h1 class="text-3xl font-bold text-text-primary mb-3">{title}</h1>
      <p class="text-text-muted mb-4">{description}</p>
      <div class="flex gap-2 flex-wrap mb-4">
        {tags.map((tag: string) => (
          <span class="bg-aurora-400/10 text-aurora-300 px-3 py-1 rounded-full text-xs border border-aurora-400/15">
            {tag}
          </span>
        ))}
      </div>
      {url && (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          class="text-aurora-300 text-sm hover:text-aurora-200 transition-colors underline underline-offset-2"
        >
          查看项目 &rarr;
        </a>
      )}
    </header>

    <div class="prose">
      <Content />
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add project detail page"
```

---

### Task 10: About Page

**Files:**
- Modify: `src/pages/about.astro` (create or modify existing)

- [ ] **Step 1: Write about page**

Create `src/pages/about.astro` (replace if exists):

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

// We could load from content/about.md, but for simplicity
// render it as a static page first
---

<BaseLayout title="关于我" description="关于我和这个博客">
  <div class="max-w-prose mx-auto text-center">
    <div class="w-24 h-24 rounded-full mx-auto mb-6 bg-aurora-400/10 border-2 border-aurora-400/20" />

    <h1 class="text-3xl font-bold text-text-primary mb-2">关于我</h1>
    <p class="text-text-muted mb-8">Developer / Writer / Creator</p>

    <div class="glass p-6 text-left mb-8">
      <p class="text-text-body leading-relaxed">
        你好，我是一名开发者。<br /><br />
        这里记录我的学习过程、项目成果和一些随想。<br /><br />
        相信技术可以让世界更好一点。
      </p>
    </div>

    <div class="grid grid-cols-3 gap-4 mb-8">
      <div class="glass p-4 text-center">
        <div class="text-2xl font-bold text-aurora-300">0</div>
        <div class="text-xs text-text-muted mt-1">篇文章</div>
      </div>
      <div class="glass p-4 text-center">
        <div class="text-2xl font-bold text-aurora-300">0</div>
        <div class="text-xs text-text-muted mt-1">个项目</div>
      </div>
      <div class="glass p-4 text-center">
        <div class="text-2xl font-bold text-aurora-300">∞</div>
        <div class="text-xs text-text-muted mt-1">热爱</div>
      </div>
    </div>
  </div>
</BaseLayout>
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add about page"
```

---

### Task 11: Archive Page with Timeline

**Files:**
- Create: `src/components/Timeline.tsx`
- Create: `src/pages/archive.astro`

- [ ] **Step 1: Write Timeline React component**

Create `src/components/Timeline.tsx`:

```tsx
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
```

- [ ] **Step 2: Write archive page**

Create `src/pages/archive.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Timeline from "../components/Timeline";
import { getPublishedPosts } from "../utils/posts";

const posts = await getPublishedPosts();
---

<BaseLayout title="归档" description="文章归档时间线">
  <h1 class="text-3xl font-bold text-text-primary mb-2">归档</h1>
  <p class="text-text-muted mb-8">共 {posts.length} 篇文章</p>

  <Timeline
    posts={posts.map((p) => ({ slug: p.slug, data: p.data }))}
    client:load
  />
</BaseLayout>
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add archive page with timeline"
```

---

### Task 12: Friends Page

**Files:**
- Create: `src/pages/friends.astro`

- [ ] **Step 1: Write friends page**

Create `src/pages/friends.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";

const friends = [
  { name: "友链待添加", url: "#", description: "你的好友链接将出现在这里" },
];
---

<BaseLayout title="友链" description="朋友们">
  <h1 class="text-3xl font-bold text-text-primary mb-2">友链</h1>
  <p class="text-text-muted mb-8">一些值得关注的朋友和博客</p>

  <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {friends.map((f) => (
      <a href={f.url} class="glass-card block p-5 no-underline">
        <h3 class="text-text-primary font-bold text-sm">{f.name}</h3>
        <p class="text-text-muted text-xs mt-1">{f.description}</p>
      </a>
    ))}
  </div>
</BaseLayout>
```

- [ ] **Step 2: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "feat: add friends page"
```

---

### Task 13: Search Component

**Files:**
- Create: `src/components/Search.tsx`

- [ ] **Step 1: Write Search React component**

Create `src/components/Search.tsx`:

```tsx
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
```

- [ ] **Step 2: Add Search to Nav**

Edit `src/components/Nav.astro`, add Search import and placement after nav items or in BaseLayout header area.

Edit `src/layouts/BaseLayout.astro`, add to the header:

```astro
---
import Nav from "../components/Nav.astro";
import Footer from "../components/Footer.astro";
import Search from "../components/Search";
import { getCollection } from "astro:content";
import "../styles/global.css";

export interface Props {
  title: string;
  description?: string;
}

const { title, description } = Astro.props;
const allPosts = await getCollection("posts");
const postsData = allPosts
  .filter((p) => !p.data.draft)
  .map((p) => ({ slug: p.slug, data: p.data }));
---

<!doctype html>
<html lang="zh-CN">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content={description || title} />
    <title>{title}</title>
  </head>
  <body class="min-h-screen font-sans antialiased">
    <div class="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div class="glow-dot w-96 h-96 bg-aurora-400/10 -top-48 -right-48"></div>
      <div class="glow-dot w-64 h-64 bg-aurora-400/8 bottom-0 left-1/4"></div>
    </div>

    <div class="max-w-3xl mx-auto px-6 py-4">
      <div class="flex items-center justify-between gap-4 mb-8">
        <Nav />
        <Search posts={postsData} client:load />
      </div>
      <main>
        <slot />
      </main>
      <Footer />
    </div>
  </body>
</html>
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add search component"
```

---

### Task 14: Project Filter Component

**Files:**
- Create: `src/components/ProjectFilter.tsx`
- Modify: `src/pages/projects/index.astro`

- [ ] **Step 1: Write ProjectFilter component**

Create `src/components/ProjectFilter.tsx`:

```tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  slug: string;
  data: {
    title: string;
    description: string;
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

      <AnimatePresence mode="wait">
        <motion.div
          key={activeTag || "all"}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          {filtered.map((p) => (
            <a
              key={p.slug}
              href={`/projects/${p.slug}`}
              className="glass-card block overflow-hidden no-underline group"
            >
              <div className="h-28 bg-gradient-to-br from-aurora-400/10 to-aurora-400/5" />
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
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 2: Update projects page to use filter**

Edit `src/pages/projects/index.astro`, replace the grid with ProjectFilter:

```astro
---
import { getCollection } from "astro:content";
import BaseLayout from "../../layouts/BaseLayout.astro";
import ProjectFilter from "../../components/ProjectFilter";

const projects = (await getCollection("projects"))
  .filter((p) => !p.data.draft)
  .sort((a, b) => a.data.order - b.data.order);

const projectData = projects.map((p) => ({ slug: p.slug, data: p.data }));
---

<BaseLayout title="项目" description="我的项目和作品">
  <h1 class="text-3xl font-bold text-text-primary mb-2">我的项目</h1>
  <p class="text-text-muted mb-8">一些自己动手做的东西</p>

  <ProjectFilter projects={projectData} client:load />
</BaseLayout>
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add project filter with animations"
```

---

### Task 15: RSS Feed

**Files:**
- Create: `src/pages/rss.xml.ts`

- [ ] **Step 1: Write RSS feed**

Create `src/pages/rss.xml.ts`:

```typescript
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function GET(context: { site: string }) {
  const posts = await getCollection("posts");
  const published = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "My Blog",
    description: "个人博客 — 记录思考与创造",
    site: context.site,
    items: published.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: `/posts/${post.slug}`,
    })),
  });
}
```

- [ ] **Step 2: Configure site URL in astro config**

Read `astro.config.mjs` and ensure `site` is set. Update:

```js
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://yourusername.github.io",
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds, `dist/rss.xml` is generated.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add RSS feed"
```

---

### Task 16: GitHub Actions Deploy

**Files:**
- Create: `.github/workflows/deploy.yml`

- [ ] **Step 1: Write deploy workflow**

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: pages
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - name: Install dependencies
        run: npm ci
      - name: Build
        run: npm run build
      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add -A
git commit -m "feat: add GitHub Actions deploy workflow"
```

---

### Task 17: Responsive Polish and Dark/Light Toggle

**Files:**
- Modify: `src/components/Nav.astro`
- Modify: `src/styles/global.css`

- [ ] **Step 1: Add mobile menu to Nav**

Edit `src/components/Nav.astro`, add mobile hamburger:

```astro
---
const navItems = [
  { href: "/", label: "文章" },
  { href: "/projects", label: "项目" },
  { href: "/archive", label: "归档" },
  { href: "/friends", label: "友链" },
  { href: "/about", label: "关于" },
];
const currentPath = Astro.url.pathname;
---

<nav class="flex items-center justify-between py-4 mb-12">
  <a href="/" class="text-white font-bold text-lg tracking-tight">
    <span class="text-gradient">BLOG</span>
  </a>

  <!-- Desktop nav -->
  <div class="hidden sm:flex gap-6 text-sm">
    {navItems.map((item) => (
      <a
        href={item.href}
        class={
          currentPath === item.href
            ? "text-aurora-200 font-medium"
            : "text-text-muted hover:text-aurora-200 transition-colors"
        }
      >
        {item.label}
      </a>
    ))}
  </div>

  <!-- Mobile menu button -->
  <button
    id="mobile-menu-btn"
    class="sm:hidden text-text-muted hover:text-aurora-200 transition-colors"
    aria-label="Toggle menu"
  >
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M3 12h18M3 6h18M3 18h18" />
    </svg>
  </button>
</nav>

<!-- Mobile dropdown (controlled by inline script) -->
<div id="mobile-menu" class="sm:hidden hidden flex-col gap-2 pb-4">
  {navItems.map((item) => (
    <a
      href={item.href}
      class={
        currentPath === item.href
          ? "text-aurora-200 font-medium text-sm py-2"
          : "text-text-muted hover:text-aurora-200 transition-colors text-sm py-2"
      }
    >
      {item.label}
    </a>
  ))}
</div>

<script>
  const btn = document.getElementById("mobile-menu-btn");
  const menu = document.getElementById("mobile-menu");
  btn?.addEventListener("click", () => {
    menu?.classList.toggle("hidden");
  });
</script>
```

- [ ] **Step 2: Add responsive adjustments to global.css**

Add to `src/styles/global.css`:

```css
/* Responsive base */
@media (max-width: 640px) {
  .prose h2 {
    font-size: 1.25rem;
  }
  .prose h3 {
    font-size: 1.05rem;
  }
}
```

- [ ] **Step 3: Run build to verify**

```bash
npm run build
```
Expected: Build succeeds.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add responsive polish and mobile menu"
```

---

### Task 18: Final Integration Check

**Files:** None (verification only)

- [ ] **Step 1: Run full production build**

```bash
npm run build
```
Expected: All pages generated under `dist/`, no errors.

- [ ] **Step 2: Verify key routes exist**

```bash
ls dist/index.html
ls dist/about/index.html
ls dist/projects/index.html
ls dist/archive/index.html
ls dist/friends/index.html
ls dist/rss.xml
ls dist/posts/hello-world/index.html
ls dist/projects/demo-project/index.html
```
Expected: All paths exist.

- [ ] **Step 3: Run dev server and manually verify**

```bash
npm run dev
```
Open http://localhost:4321 and visually check:
- Homepage renders with star field
- Navigation works
- Post detail renders with prose styles
- Projects page shows cards
- Archive shows timeline
- Search works
- Mobile menu works

- [ ] **Step 4: Commit any final tweaks**

```bash
git add -A
git commit -m "chore: final integration checks and tweaks"
```
