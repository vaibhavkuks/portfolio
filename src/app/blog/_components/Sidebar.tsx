import Link from "next/link";
import { getAllPosts } from "@/lib/md";

export default async function Sidebar() {
  const posts = await getAllPosts();
  return (
    <aside className="sticky top-[52px] h-[calc(100dvh-52px)] w-full max-w-xs shrink-0 overflow-y-auto border-r border-white/10 px-4 py-6">
      <ul className="space-y-4">
        {posts.map((p) => (
          <li key={p.slug} className="group">
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-md p-2 hover:bg-white/5"
            >
              <div className="mb-1 text-sm font-medium text-white/90">
                {p.data.title}
              </div>
              <div className="mb-2 text-xs text-white/50">
                {new Date(p.data.date).toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </div>
              {p.data.tags && p.data.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {p.data.tags.map((t) => (
                    <span
                      key={`${p.slug}-${t}`}
                      className="rounded-full border border-white/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-white/60"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              )}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
