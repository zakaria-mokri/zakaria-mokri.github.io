import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { portfolioData } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function SkillsMatrix() {
  const groups = portfolioData.skills;
  const [active, setActive] = useState(groups[0]!.id);
  const group = groups.find((g) => g.id === active) ?? groups[0]!;

  return (
    <section id="skills" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Capabilities"
          title="Skills matrix"
          description="Grouped by discipline so you can scan for the exact stack you're hiring for."
        />

        <div className="flex flex-wrap gap-2">
          {groups.map((g) => (
            <button
              key={g.id}
              onClick={() => setActive(g.id)}
              className={cn(
                "rounded-xl border px-4 py-2.5 text-xs font-medium transition-colors",
                active === g.id
                  ? "border-primary/50 bg-primary/12 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {g.label}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3 }}
            className="glass-panel mt-6 rounded-2xl p-6"
          >
            <p className="text-sm text-muted-foreground">{group.blurb}</p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              {group.skills.map((s) => (
                <span
                  key={s}
                  className="glow-hover rounded-xl border border-border bg-card/70 px-3.5 py-2 text-xs font-medium"
                >
                  {s}
                </span>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
