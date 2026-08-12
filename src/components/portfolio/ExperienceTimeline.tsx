import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, MapPin } from "lucide-react";
import { portfolioData, type Experience } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

const filters = [
  { id: "all", label: "All Roles" },
  { id: "software", label: "Software Engineering" },
  { id: "it", label: "IT Systems & Management" },
] as const;

type FilterId = (typeof filters)[number]["id"];

function TimelineCard({ item, index }: { item: Experience; index: number }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.45 }}
      className="relative pl-10 sm:pl-14"
    >
      <span className="absolute top-7 left-[11px] size-3 -translate-x-1/2 rounded-full bg-primary shadow-[0_0_0_4px_color-mix(in_oklab,var(--primary)_18%,transparent),0_0_24px_var(--glow)] sm:left-[19px]" />
      <div className="glass-panel glow-hover rounded-2xl p-5 sm:p-6">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="grid w-full grid-cols-[minmax(0,1fr)_auto] items-start gap-4 text-left"
        >
          <div className="min-w-0">
            <p className="font-mono text-[11px] tracking-wide text-primary uppercase">
              {item.period}
            </p>
            <h3 className="mt-1.5 text-lg font-semibold text-balance">{item.role}</h3>
            <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-muted-foreground">
              <span>{item.company}</span>
              {item.location && (
                <span className="inline-flex items-center gap-1">
                  <MapPin className="size-3" />
                  {item.location}
                </span>
              )}
            </p>
            {item.summary && <p className="mt-3 text-sm text-muted-foreground">{item.summary}</p>}
          </div>
          <ChevronDown
            className={cn(
              "mt-1 size-5 shrink-0 text-muted-foreground transition-transform",
              open && "rotate-180 text-primary",
            )}
          />
        </button>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <ul className="mt-4 grid gap-2 border-t border-border pt-4">
                {item.achievements.map((a) => (
                  <li key={a} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

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
    </motion.li>
  );
}

export function ExperienceTimeline() {
  const [filter, setFilter] = useState<FilterId>("all");
  const items = useMemo(
    () =>
      filter === "all"
        ? portfolioData.experience
        : portfolioData.experience.filter((e) => e.category === filter),
    [filter],
  );

  return (
    <section id="experience" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Career"
          title="Work experience & impact"
          description="Filter the timeline by discipline to see the roles most relevant to your search."
        />

        <div className="mb-10 flex flex-wrap gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={cn(
                "rounded-xl border px-4 py-2 text-xs font-medium transition-colors",
                filter === f.id
                  ? "border-primary/50 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {f.label}
            </button>
          ))}
        </div>

        <ol className="relative grid gap-6 before:absolute before:top-0 before:bottom-0 before:left-[11px] before:w-px before:bg-gradient-to-b before:from-primary/50 before:via-border before:to-transparent sm:before:left-[19px]">
          <AnimatePresence mode="popLayout">
            {items.map((item, i) => (
              <TimelineCard key={item.role + item.company} item={item} index={i} />
            ))}
          </AnimatePresence>
        </ol>
      </div>
    </section>
  );
}
