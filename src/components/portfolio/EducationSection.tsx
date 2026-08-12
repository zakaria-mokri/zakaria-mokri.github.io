import { motion } from "motion/react";
import { GraduationCap } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";

export function EducationSection() {
  return (
    <section id="education" className="relative py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Academics"
          title="Education"
          description="Dual credentials spanning software engineering and technology management."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {portfolioData.education.map((e, i) => (
            <motion.article
              key={e.degree}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="glass-panel glow-hover rounded-2xl p-6"
            >
              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary">
                  <GraduationCap className="size-5" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[11px] tracking-wide text-primary uppercase">
                    {e.period}
                  </p>
                  <h3 className="mt-1.5 text-lg font-semibold text-balance">{e.degree}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{e.institution}</p>
                </div>
              </div>
              <ul className="mt-4 grid gap-2 border-t border-border pt-4">
                {e.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted-foreground">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-primary/70" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
