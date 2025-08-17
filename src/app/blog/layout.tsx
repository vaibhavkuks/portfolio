import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vaibhav's Blog",
  description: "A collection of my thoughts and writings.",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //   Segment layout: do not include <html>/<body> here. Root layout handles those.
  return <>{children}</>;
}
