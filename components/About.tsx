import { siteConfig } from "@/site.config";

export default function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="w-full border-b border-black/[.08] dark:border-white/[.145]"
    >
      <div className="mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24">
        <h2 id="about-heading" className="text-2xl font-semibold tracking-tight sm:text-3xl">
          关于我
        </h2>

        <p className="mt-6 max-w-prose text-base leading-8 text-zinc-600 dark:text-zinc-400">
          {siteConfig.about}
        </p>
      </div>
    </section>
  );
}
