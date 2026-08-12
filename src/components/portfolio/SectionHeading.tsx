import { motion } from "motion/react";

export function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5 }}
      className="mb-10 max-w-2xl"
    >
      <p className="font-mono text-[11px] tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-balance sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-sm text-muted-foreground sm:text-base">{description}</p>}
    </motion.div>
  );
}
