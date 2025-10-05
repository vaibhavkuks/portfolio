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
    href: "https://www.linkedin.com/in/vaibhavkukreti/",
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

  // Calculate active index for animation
  const activeIndex = items.findIndex((item) =>
    item.href === "/"
      ? pathname === "/"
      : pathname === item.href || pathname?.startsWith(item.href + "/")
  );

  return (
    <nav
      aria-label="Primary"
      className="sticky top-0 z-30 h-screen  w-16 min-w-16 border-r
border-white/7 bg-white/5 backdrop-blur-md  py-4 text-white overflow-visible"
    >
      {/* Animated active indicator - right border */}
      <div className="relative">
        {activeIndex >= 0 && (
          <motion.div
            key={`indicator-${activeIndex}`}
            layout
            layoutId="nav-active-indicator"
            aria-hidden
            className="absolute right-0 top-0 w-0.5 h-[52px] bg-lime-300 z-20"
            initial={{
              y: activeIndex * 52,
            }}
            animate={{
              y: activeIndex * 52,
            }}
            transition={{
              y: { type: "spring", stiffness: 500, damping: 30 },
            }}
          />
        )}
      </div>

      <ul className="flex flex-col">
        {items.map((item, i) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : pathname === item.href || pathname?.startsWith(item.href + "/");

          return (
            <li key={`top-${item.href || item.label || i}`}>
              <div className="relative z-10 group">
                <Link
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={`peer flex w-full text-[12px] items-center justify-center outline-none transition-colors hover:bg-white/20 hover:text-white py-3 ${
                    active ? "text-lime-300" : "text-white/75"
                  }`}
                  title={item.label}
                >
                  {/* Icon */}
                  <span
                    className={active ? "text-lime-300" : "text-white/90"}
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
      <div className="absolute bottom-4 left-0 w-full">
        {SOCIALS.map((s, i) => (
          <div
            key={`social-${s.href || s.label || i}`}
            className="relative group"
          >
            <a
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="peer flex w-full items-center justify-center text-white/80 hover:bg-white/20 hover:text-white outline-none focus:ring-2 focus:ring-white/40 transition-colors py-4"
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
        <div className="relative group">
          <a
            href={`mailto:${EMAIL}`}
            aria-label={`Email ${EMAIL}`}
            className="peer flex w-full items-center justify-center text-white/80 hover:bg-white/20 hover:text-white outline-none focus:ring-2 focus:ring-white/40 transition-colors py-4"
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
