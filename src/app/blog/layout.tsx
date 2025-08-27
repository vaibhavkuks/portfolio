import type { Metadata } from "next";
import BlogHeader from "./_components/BlogHeader";
import Sidebar from "./_components/Sidebar";

export const metadata: Metadata = {
  title: "Vaibhav's Blog",
  description: "A collection of my thoughts and writings.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Segment layout: compose blog UI with a header + sidebar/content layout
  return (
    <div className="flex min-h-screen flex-col">
      <BlogHeader />
      <div className="grid min-h-[calc(100dvh-52px)] grid-cols-1 md:grid-cols-[320px_minmax(0,1fr)]">
        <Sidebar />
        <main className="px-6 py-6">{children}</main>
      </div>
    </div>
  );
}
