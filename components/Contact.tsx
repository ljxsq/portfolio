import type { ReactNode } from "react";

import { siteConfig } from "@/site.config";

interface ContactItemProps {
  ariaLabel: string;
  external?: boolean;
  download?: boolean;
  href: string;
  icon: ReactNode;
  label: string;
  value: string;
}

function MailIcon() {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function GitHubIcon() {
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
      <path d="M15 22v-4a4.8 4.8 0 0 1-1.03-3.28c3.15-.35 6.45-1.55 6.45-6.95 0-1.54-.55-2.8-1.45-3.8.15-.36.65-1.8-.15-3.75 0 0-1.35.45-3.7 1.8-1.1-.3-2.3-.45-3.45-.45s-2.35.15-3.45.45c-2.35-1.35-3.7-1.8-3.7-1.8-.8 1.95-.3 3.39-.15 3.75-.9 1-1.45 2.26-1.45 3.8 0 5.4 3.3 6.6 6.45 6.95A4.8 4.8 0 0 1 9 18v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedInIcon() {
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
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 0 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function DownloadIcon() {
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
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

function ContactItem({
  ariaLabel,
  external = false,
  download = false,
  href,
  icon,
  label,
  value,
}: ContactItemProps) {
  return (
    <a
      href={href}
      aria-label={ariaLabel}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      download={download || undefined}
      className="flex min-w-0 items-start gap-4 rounded-2xl border border-black/[.08] bg-background p-5 shadow-sm transition-colors hover:bg-black/[.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background dark:border-white/[.145] dark:hover:bg-white/[.06]"
    >
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-black/[.08] bg-black/[.03] text-foreground dark:border-white/[.145] dark:bg-white/[.06]">
        {icon}
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          {label}
        </span>
        <span className="mt-1 break-all text-sm text-foreground">{value}</span>
      </span>
    </a>
  );
}

export default function Contact() {
  const hasLinkedIn = siteConfig.linkedin.trim() !== "";

  const items: ContactItemProps[] = [
    {
      href: `mailto:${siteConfig.email}`,
      ariaLabel: `发送邮件至 ${siteConfig.email}`,
      label: "邮箱",
      value: siteConfig.email,
      icon: <MailIcon />,
    },
    {
      href: siteConfig.github,
      ariaLabel: "访问 GitHub 主页",
      label: "GitHub",
      value: siteConfig.github,
      icon: <GitHubIcon />,
      external: true,
    },
  ];

  if (hasLinkedIn) {
    items.push({
      href: siteConfig.linkedin,
      ariaLabel: "访问 LinkedIn 主页",
      label: "LinkedIn",
      value: siteConfig.linkedin,
      icon: <LinkedInIcon />,
      external: true,
    });
  }

  items.push({
    href: siteConfig.resumeUrl,
    ariaLabel: "下载简历 PDF",
    label: "简历",
    value: "下载 PDF 简历",
    icon: <DownloadIcon />,
    download: true,
  });

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="w-full border-b border-black/[.08] dark:border-white/[.145]"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <h2 id="contact-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          联系我
        </h2>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {items.map((item) => (
            <ContactItem key={item.label} {...item} />
          ))}
        </div>
      </div>
    </section>
  );
}
