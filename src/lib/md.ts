import { readFile, readdir } from "fs/promises";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type BlogFrontmatter = {
  title: string;
  date: string; // ISO string
  tags?: string[];
  excerpt?: string;
};

export type BlogPost = {
  slug: string;
  content: string;
  data: BlogFrontmatter;
};

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

// Server-only function for getting all posts
export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const files = await readdir(BLOG_DIR);
    const mdFiles = files.filter((f) => f.endsWith(".md"));

    const posts = await Promise.all(
      mdFiles.map(async (file) => {
        const slug = file.replace(/\.md$/, "");
        const fullPath = path.join(BLOG_DIR, file);
        const raw = await readFile(fullPath, "utf8");
        const { content, data } = matter(raw);
        return {
          slug,
          content,
          data: data as BlogFrontmatter,
        };
      })
    );

    return posts.sort(
      (a, b) =>
        new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
    );
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

// Server-only function for getting a single post
export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const fullPath = path.join(BLOG_DIR, `${slug}.md`);

    // Check if file exists
    if (!fs.existsSync(fullPath)) return null;

    const raw = await readFile(fullPath, "utf8");
    const { content, data } = matter(raw);
    return { slug, content, data: data as BlogFrontmatter };
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}
