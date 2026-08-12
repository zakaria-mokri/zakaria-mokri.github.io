import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowUpRight, ChevronLeft, ChevronRight, FolderGit2 } from "lucide-react";
import { portfolioData, type Project } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const filters = [
  { id: "software", label: "Software Engineer / Full-Stack Developer" },
  { id: "it", label: "IT Consultant / Systems Engineer" },
  { id: "assistant", label: "IT Assistant (Computer Science Department)" },
] as const;

type FilterId = (typeof filters)[number]["id"];

const PER_PAGE = 1;

function ProjectCard({ item }: { item: Project }) {
  return (
    <div className="glass-panel glow-hover rounded-2xl p-5 sm:p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="font-mono text-[11px] tracking-wide text-primary uppercase">
            {item.period}
          </p>
          <h3 className="mt-1.5 flex items-center gap-2 text-lg font-semibold text-balance">
            <FolderGit2 className="size-4 shrink-0 text-primary" />
            {item.name}
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">{item.role}</p>
        </div>
        {item.href && (
          <a
            href={item.href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-xl border border-border px-3 py-2 text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            View <ArrowUpRight className="size-3.5" />
          </a>
        )}
      </div>

      <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>

      <ul className="mt-4 grid gap-2 border-t border-border pt-4">
        {item.highlights.map((h) => (
          <li key={h} className="flex gap-3 text-sm text-muted-foreground">
            <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
            <span>{h}</span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap gap-2">
        {item.stack.map((t) => (
          <span
            key={t}
            className="rounded-lg border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}

export function ProjectsSection() {
  const [filter, setFilter] = useState<FilterId | null>(null);
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const panelRef = useRef<HTMLDivElement>(null);

  const items = useMemo(
    () => (filter ? portfolioData.projects.filter((p) => p.category === filter) : []),
    [filter],
  );

  const pages = useMemo(() => {
    const out: Project[][] = [];
    for (let i = 0; i < items.length; i += PER_PAGE) out.push(items.slice(i, i + PER_PAGE));
    return out;
  }, [items]);

  useEffect(() => {
    setPage(0);
  }, [filter]);

  const goto = (next: number) => {
    if (next < 0 || next > pages.length - 1) return;
    setDir(next > page ? 1 : -1);
    setPage(next);
  };

  useEffect(() => {
    if (!filter) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") goto(page + 1);
      if (e.key === "ArrowLeft") goto(page - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <section id="projects" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Projects"
          title="Selected projects"
          description="Pick a discipline to reveal the related projects, then swipe through them."
        />

        <div className="mb-8 grid gap-3 sm:grid-cols-3">
          {filters.map((f) => {
            const active = filter === f.id;
            const count = portfolioData.projects.filter((p) => p.category === f.id).length;
            return (
              <div
                key={f.id}
                className={cn(
                  "glass-panel flex flex-col justify-between gap-4 rounded-2xl p-5 transition-colors",
                  active && "border-primary/50",
                )}
              >
                <div>
                  <p className="text-sm font-semibold text-balance">{f.label}</p>
                  <p className="mt-1 font-mono text-[11px] text-muted-foreground">
                    {count} projects
                  </p>
                </div>
                <button
                  onClick={() => {
                    setFilter(active ? null : f.id);
                    if (!active)
                      requestAnimationFrame(() =>
                        panelRef.current?.scrollIntoView({ behavior: "smooth", block: "center" }),
                      );
                  }}
                  className={cn(
                    "rounded-xl border px-4 py-2 text-xs font-medium transition-colors",
                    active
                      ? "border-primary/60 bg-primary/15 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/50 hover:text-primary",
                  )}
                >
                  {active ? "Hide projects" : "Click here"}
                </button>
              </div>
            );
          })}
        </div>

        <div ref={panelRef}>
          <AnimatePresence mode="wait">
            {filter && pages.length > 0 && (
              <motion.div
                key={filter}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <div className="relative">
                  <div className="overflow-hidden px-0 sm:px-14">
                    <AnimatePresence mode="wait" custom={dir}>
                      <motion.div
                        key={page}
                        custom={dir}
                        initial={{ opacity: 0, x: dir * 60 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: dir * -60 }}
                        transition={{ duration: 0.25 }}
                        drag="x"
                        dragConstraints={{ left: 0, right: 0 }}
                        dragElastic={0.2}
                        onDragEnd={(_, info) => {
                          const swipe = info.offset.x + info.velocity.x * 0.2;
                          if (swipe < -50) goto(page + 1);
                          else if (swipe > 50) goto(page - 1);
                        }}
                        className="grid touch-pan-y gap-5 select-none active:cursor-grabbing sm:cursor-grab"
                      >
                        {pages[page]?.map((item) => <ProjectCard key={item.name} item={item} />)}
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  {/* Desktop side arrows */}
                  <button
                    aria-label="Previous project"
                    onClick={() => goto(page - 1)}
                    disabled={page === 0}
                    className="glass-panel absolute top-1/2 left-0 hidden -translate-y-1/2 rounded-full p-3 text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-25 sm:block"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <button
                    aria-label="Next project"
                    onClick={() => goto(page + 1)}
                    disabled={page === pages.length - 1}
                    className="glass-panel absolute top-1/2 right-0 hidden -translate-y-1/2 rounded-full p-3 text-foreground transition-colors hover:border-primary/60 hover:text-primary disabled:opacity-25 sm:block"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>

                {/* Mobile controls */}
                <div className="mt-6 flex items-center gap-3 sm:hidden">
                  <button
                    aria-label="Previous project"
                    onClick={() => goto(page - 1)}
                    disabled={page === 0}
                    className="glass-panel rounded-full p-3 text-foreground disabled:opacity-25"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <span className="flex-1 text-center font-mono text-xs text-muted-foreground">
                    {page + 1} / {pages.length}
                  </span>
                  <button
                    aria-label="Next project"
                    onClick={() => goto(page + 1)}
                    disabled={page === pages.length - 1}
                    className="glass-panel rounded-full p-3 text-foreground disabled:opacity-25"
                  >
                    <ChevronRight className="size-5" />
                  </button>
                </div>

                <div className="mt-6 hidden items-center gap-4 sm:flex">
                  <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-secondary">
                    <motion.span
                      className="absolute inset-y-0 left-0 rounded-full bg-primary shadow-[0_0_16px_var(--glow)]"
                      animate={{
                        width: `${100 / pages.length}%`,
                        x: `${page * 100}%`,
                      }}
                      transition={{ type: "spring", stiffness: 260, damping: 30 }}
                    />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {page + 1} / {pages.length}
                  </span>
                </div>

                {/* Dots */}
                <div className="mt-4 flex flex-wrap justify-center gap-2">
                  {pages.map((_, i) => (
                    <button
                      key={i}
                      aria-label={`Go to project ${i + 1}`}
                      onClick={() => goto(i)}
                      className={cn(
                        "h-2 rounded-full transition-all",
                        i === page
                          ? "w-6 bg-primary shadow-[0_0_12px_var(--glow)]"
                          : "w-2 bg-secondary hover:bg-primary/40",
                      )}
                    />
                  ))}
                </div>

                <p className="mt-4 text-center font-mono text-[11px] text-muted-foreground">
                  Swipe left / right, use the arrows, or press ← →
                </p>

              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
