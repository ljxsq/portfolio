import { siteConfig } from "@/site.config";

const sectionClassName =
  "w-full border-b border-black/[.08] dark:border-white/[.145]";
const containerClassName =
  "mx-auto w-full max-w-4xl px-6 py-16 md:px-8 md:py-24";
const headingClassName = "text-2xl font-semibold tracking-tight sm:text-3xl";

export default function Skills() {
  const skillGroups = Object.entries(siteConfig.skills);

  return (
    <section id="skills" aria-labelledby="skills-heading" className={sectionClassName}>
      <div className={containerClassName}>
        <h2 id="skills-heading" className={headingClassName}>
          技能
        </h2>

        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {skillGroups.map(([group, items]) => (
            <div
              key={group}
              className="rounded-2xl border border-black/[.08] bg-background p-5 shadow-sm dark:border-white/[.145]"
            >
              <h3 className="text-base font-semibold tracking-tight">{group}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {items.map((item) => (
                  <li
                    key={item}
                    className="max-w-full whitespace-normal break-words rounded-full border border-black/[.08] bg-black/[.03] px-3 py-1.5 text-sm text-zinc-700 [overflow-wrap:anywhere] dark:border-white/[.145] dark:bg-white/[.06] dark:text-zinc-300"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
