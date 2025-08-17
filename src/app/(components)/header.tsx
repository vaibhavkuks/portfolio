"use client";
import React from "react";
import { usePathname } from "next/navigation";

type HeaderProps = {
  title?: string; // Optional override
  subtitle?: string;
  className?: string;
};

const ROUTE_TITLES: Record<string, string> = {
  "": "Portfolio", // "/"
  blog: "Blog",
};

function toTitleCase(input: string) {
  if (!input) return "Portfolio";
  // convert kebab/slug/camel to spaced title case
  const spaced = input
    .replace(/([a-z0-9])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .trim();
  return spaced
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]?.toUpperCase() + w.slice(1).toLowerCase())
    .join(" ");
}

function deriveTitle(pathname: string) {
  const segments = pathname.split("/").filter(Boolean);
  const top = segments[0] ?? "";
  return ROUTE_TITLES[top] ?? toTitleCase(top);
}

export default function Header({ title, subtitle, className }: HeaderProps) {
  const pathname = usePathname() || "/";
  const resolvedTitle = title ?? deriveTitle(pathname);

  return (
    <header className={className}>
      <h1>{resolvedTitle}</h1>
      {subtitle ? <p>{subtitle}</p> : null}
    </header>
  );
}
