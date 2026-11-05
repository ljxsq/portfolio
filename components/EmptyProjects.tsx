const placeholderCards = [
  { id: "coming-soon-1", tagWidths: ["w-14", "w-16", "w-12"] },
  { id: "coming-soon-2", tagWidths: ["w-16", "w-12", "w-14"] },
  { id: "coming-soon-3", tagWidths: ["w-12", "w-14", "w-16"] },
];

export default function EmptyProjects() {
  return (
    <section
      aria-label="项目正在整理中"
      className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    >
      {placeholderCards.map((card) => (
        <article
          key={card.id}
          className="flex h-full flex-col overflow-hidden rounded-2xl border border-black/[.08] bg-background shadow-sm dark:border-white/[.145]"
        >
          <div
            aria-hidden="true"
            className="flex aspect-[16/10] w-full items-center justify-center bg-gradient-to-br from-zinc-100 to-zinc-200 dark:from-zinc-900 dark:to-zinc-800"
          >
            <span className="text-sm font-medium uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Coming Soon
            </span>
          </div>

          <div className="flex flex-col p-5">
            <h3 className="text-lg font-semibold tracking-tight">项目整理中，敬请期待</h3>
            <p className="mt-2 line-clamp-2 min-h-[2.75rem] text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              后续会补充更多细节，包括背景、实现方案与成果数据。
            </p>

            {/* 预留与 ProjectCard 技术栈标签一致的高度，避免真实卡片出现时布局跳动 */}
            <div aria-hidden="true" className="mt-4 flex flex-wrap items-center gap-1.5">
              {card.tagWidths.map((width, index) => (
                <span
                  key={index}
                  className={`h-6 rounded-full border border-black/[.08] bg-black/[.03] dark:border-white/[.145] dark:bg-white/[.06] ${width}`}
                />
              ))}
            </div>
          </div>
        </article>
      ))}
    </section>
  );
}
