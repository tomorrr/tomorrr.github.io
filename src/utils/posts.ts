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
