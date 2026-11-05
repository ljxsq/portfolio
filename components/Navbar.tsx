"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "@/site.config";

const navItems = [
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#skills" },
  { label: "关于", href: "#about" },
  { label: "联系", href: "#contact" },
];

function MenuIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <>
      {/* 锚点统一在导航组件内预留固定栏高度，避免标题被 sticky 导航遮挡 */}
      <style>{`#projects, #skills, #about, #contact { scroll-margin-top: 5.5rem; }`}</style>

      <header className="sticky top-0 z-50 w-full border-b border-black/[.08] bg-background/80 backdrop-blur-md dark:border-white/[.145]">
        <div className="mx-auto flex h-16 w-full max-w-4xl items-center justify-between px-6 md:px-8">
          <a
            href="/"
            className="text-lg font-semibold tracking-tight transition-colors hover:text-zinc-600 dark:hover:text-zinc-300"
          >
            {siteConfig.name}
          </a>

          <nav aria-label="主导航" className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <button
            type="button"
            aria-label={isOpen ? "关闭导航菜单" : "打开导航菜单"}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsOpen((previous) => !previous)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/[.08] transition-colors hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-white/[.08] md:hidden"
          >
            {isOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>

        {isOpen && (
          <nav
            id="mobile-menu"
            aria-label="移动端导航"
            className="border-t border-black/[.08] bg-background md:hidden dark:border-white/[.145]"
          >
            <ul className="mx-auto flex w-full max-w-4xl flex-col px-6 py-2">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block rounded-md px-3 py-3 text-sm font-medium text-zinc-600 transition-colors hover:bg-black/[.04] hover:text-foreground dark:text-zinc-400 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}
