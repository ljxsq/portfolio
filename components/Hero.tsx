import { siteConfig } from "@/site.config";

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
      className="h-5 w-5 shrink-0"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
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
      className="h-4 w-4"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <path d="m7 10 5 5 5-5" />
      <path d="M12 15V3" />
    </svg>
  );
}

export default function Hero() {
  const hasLinkedIn = siteConfig.linkedin.trim() !== "";

  return (
    <section
      aria-labelledby="hero-title"
      className="w-full border-b border-black/[.08] bg-background text-foreground dark:border-white/[.145]"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6 py-16 text-center md:items-start md:px-8 md:py-24 md:text-left">
        <div className="flex flex-col gap-3">
          <h1
            id="hero-title"
            className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl"
          >
            {siteConfig.name}
          </h1>
          <p className="text-lg text-zinc-600 dark:text-zinc-400">{siteConfig.title}</p>
        </div>

        <div className="flex w-full flex-col items-stretch gap-3 md:w-auto md:flex-row md:items-center">
          <a
            href={siteConfig.resumeUrl}
            download
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-6 text-sm font-medium text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc]"
          >
            <DownloadIcon />
            下载简历
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            aria-label={`发送邮件至 ${siteConfig.email}`}
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            <MailIcon />
            <span className="break-all">{siteConfig.email}</span>
          </a>

          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="访问 GitHub 主页"
            title="GitHub"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
          >
            <GitHubIcon />
            <span className="md:sr-only">GitHub</span>
          </a>

          {hasLinkedIn && (
            <a
              href={siteConfig.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="访问 LinkedIn 主页"
              title="LinkedIn"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-black/[.08] px-5 text-sm font-medium transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a]"
            >
              <LinkedInIcon />
              <span className="md:sr-only">LinkedIn</span>
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
