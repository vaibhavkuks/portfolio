"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { Github, Instagram, Linkedin, Mail } from "lucide-react";

type NavItem = {
  label: string;
  href: string;
  icon: ReactNode;
};

const items: NavItem[] = [
  {
    label: "Portfolio",
    icon: <div className="text-xl">{"👋🏼"}</div>,
    href: "/",
  },
  {
    label: "Blog",
    href: "/blog",
    icon: <div className="text-xl">{"📝"}</div>,
  },
];

const EMAIL = "vkukreti16@gmail.com";
const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com/vaibhav.kukreti16",
    icon: <Instagram className="h-5 w-5" aria-hidden />,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/yourhandle",
    icon: <Linkedin className="h-5 w-5" aria-hidden />,
  },
  {
    label: "GitHub",
    href: "https://github.com/vaibhavkuks",
    icon: <Github className="h-5 w-5" aria-hidden />,
  },
];

export default function NavRail() {
  const pathname = usePathname();
  // Active index among top items (Portfolio/Blog)
  const activeIndex = items.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname?.startsWith(item.href + "/")
  );

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-30 h-screen  w-16 min-w-16 border-r border-white/7 bg-white/5 backdrop-blur-sm  py-4 text-white overflow-visible"
    >
      {/* Animated active selector for top items (single element to avoid SSR mismatch) */}
      <div className="relative overflow-x-clip">
        {activeIndex >= 0 && (
          <motion.div
            layout
            layoutId="nav-active-selector"
            aria-hidden
            className="absolute left-3 top-0 z-0 rounded-lg bg-white/30 shadow-[0_0_40px_rgba(255,255,255,0.45)]"
            style={{ width: 40, height: 40 }}
            initial={false}
            animate={{ y: activeIndex * 44, opacity: 1 }}
            transition={{ type: "spring", stiffness: 450, damping: 52 }}
          />
        )}
      </div>
      <ul className="flex flex-col gap-1">
        {items.map((item, i) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <li key={`top-${item.href || item.label || i}`}>
              <div className="relative z-10 group flex justify-center">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`peer flex h-10 w-10 items-center justify-center rounded-md outline-none transition-colors ${
                    active
                      ? "text-black"
                      : "text-white/75 hover:bg-white/5 hover:text-white"
                  }`}
                  title={item.label}
                >
                  {/* Icon */}
                  <span
                    className={active ? "text-black" : "text-white/90"}
                    aria-hidden
                  >
                    {item.icon}
                  </span>
                </Link>

                {/* Tooltip */}
                <span
                  role="tooltip"
                  className="pointer-events-none invisible opacity-0 absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white shadow-lg transition-opacity duration-150 backdrop-blur-sm peer-hover:visible peer-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100"
                >
                  {item.label}
                  {/* Tooltip arrow */}
                  <span
                    aria-hidden
                    className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-black/75"
                  />
                </span>
              </div>
            </li>
          );
        })}
      </ul>

      {/* Bottom actions: socials + mail */}
      <div className="absolute bottom-4 left-0 w-full space-y-2">
        {SOCIALS.map((s, i) => (
          <div
            key={`social-${s.href || s.label || i}`}
            className="relative group flex justify-center"
          >
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="peer flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white outline-none focus:ring-2 focus:ring-white/40"
            >
              {s.icon}
            </a>
            <span
              role="tooltip"
              className="pointer-events-none invisible opacity-0 absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white shadow-lg transition-opacity duration-150 backdrop-blur-sm peer-hover:visible peer-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100"
            >
              {s.label}
              <span
                aria-hidden
                className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-black/75"
              />
            </span>
          </div>
        ))}
        <div className="relative group flex justify-center">
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            className="peer flex h-10 w-10 items-center justify-center rounded-md text-white/80 hover:bg-white/10 hover:text-white outline-none focus:ring-2 focus:ring-white/40"
          >
            <Mail className="h-5 w-5" aria-hidden />
          </a>
          <span
            role="tooltip"
            className="pointer-events-none invisible opacity-0 absolute left-[calc(100%+8px)] top-1/2 -translate-y-1/2 whitespace-nowrap rounded-md bg-black/75 px-2 py-1 text-xs text-white shadow-lg transition-opacity duration-150 backdrop-blur-sm peer-hover:visible peer-hover:opacity-100 peer-focus-visible:visible peer-focus-visible:opacity-100"
          >
            {EMAIL}
            <span
              aria-hidden
              className="absolute left-[-4px] top-1/2 -translate-y-1/2 h-2 w-2 rotate-45 bg-black/75"
            />
          </span>
        </div>
      </div>
    </nav>
  );
}
