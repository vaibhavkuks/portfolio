import { redirect } from "next/navigation";
import { getAllPosts } from "@/lib/md";

export const dynamic = "force-static";

export default function BlogPage() {
  const posts = getAllPosts();
  if (posts.length > 0) {
    redirect(`/blog/${posts[0].slug}`);
  }
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center">
      <p className="text-white/60">No posts yet.</p>
    </div>
  );
}
