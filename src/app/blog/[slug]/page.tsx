import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllPosts, getPostBySlug, type BlogPost } from "@/lib/md";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p: BlogPost) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.data.title,
    description: post.data.excerpt,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return notFound();

  return (
    <article className="prose prose-invert max-w-none">
      <h1 className="mb-2 text-3xl font-bold leading-tight">
        {post.data.title}
      </h1>
      <p className="mb-8 text-sm text-white/50">
        {new Date(post.data.date).toLocaleString(undefined, {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </p>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>{post.content}</ReactMarkdown>
    </article>
  );
}
