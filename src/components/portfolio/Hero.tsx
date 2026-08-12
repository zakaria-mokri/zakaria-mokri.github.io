import { motion } from "motion/react";
import { Github, Linkedin, Mail, Globe, Twitter, ArrowRight, ShieldCheck } from "lucide-react";
import { portfolioData, type SocialLink } from "@/data/portfolioData";

const PORTRAIT_URL = "/portrait.jpg";

const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const icons = { github: Github, linkedin: Linkedin, mail: Mail, globe: Globe, twitter: Twitter };

function SocialIcon({ link }: { link: SocialLink }) {
  const Icon = icons[link.icon];
  return (
    <a
      href={link.href}
      target={link.icon === "mail" ? undefined : "_blank"}
      rel="noreferrer"
      aria-label={link.label}
      className="glass-panel glow-hover grid size-11 place-items-center rounded-xl text-muted-foreground hover:text-primary"
    >
      <Icon className="size-5" />
    </a>
  );
}

export function Hero() {
  const { profile, degrees, socials, techMarquee } = portfolioData;

  return (
    <section id="overview" className="relative overflow-hidden pt-36 pb-16 sm:pt-44">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />
      <div className="decor-glow pointer-events-none absolute -top-40 left-1/2 size-[36rem] -translate-x-1/2 rounded-full bg-primary/12 blur-[140px]" />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div
          initial="hidden"
          animate="show"
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }}
        >
          <motion.div variants={item} className="mb-6">
            <span className="glass-panel inline-flex items-center gap-2 rounded-full px-3 py-1.5 font-mono text-[11px] tracking-wide text-primary uppercase">
              <span className="size-1.5 animate-pulse rounded-full bg-primary" />
              {profile.availability}
            </span>
          </motion.div>

          <div className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
            <motion.h1 variants={item} className="max-w-4xl font-display text-4xl leading-[1.05] font-bold text-balance sm:text-6xl lg:text-7xl">
              <span className="text-gradient">{profile.headline}</span>
            </motion.h1>

            <motion.div variants={item} className="relative shrink-0">
              <picture>
                <source srcSet="/portrait.webp" type="image/webp" />
                <img
                  src={PORTRAIT_URL}
                  alt={`${profile.name} portrait`}
                  width={640}
                  height={630}
                  decoding="async"
                  fetchPriority="high"
                  className="size-[200px] rounded-full object-cover ring-2 ring-primary/50 ring-offset-4 ring-offset-background sm:size-[240px] lg:size-[280px]"
                />
              </picture>
              <span className="absolute -bottom-2 -right-2 flex size-12 items-center justify-center rounded-full bg-primary text-base font-bold text-primary-foreground">
                ✓
              </span>
            </motion.div>
          </div>

          <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {profile.bio}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap gap-3">
            {degrees.map((d) => (
              <div
                key={d.short}
                className="glass-panel glow-hover flex min-w-0 items-start gap-3 rounded-xl px-4 py-3"
              >
                <ShieldCheck className="mt-0.5 size-4 shrink-0 text-primary" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold">{d.short}</p>
                  <p className="text-xs text-muted-foreground">{d.long}</p>
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.03]"
            >
              View Projects
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a
              href="#certifications"
              className="glass-panel glow-hover inline-flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold"
            >
              Credentials Vault
            </a>
            <div className="flex gap-2">
              {socials.map((s) => (
                <SocialIcon key={s.label} link={s} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="relative mt-16 overflow-hidden border-y border-border py-4">
        <div className="flex w-max animate-marquee gap-3 pr-3">
          {[...techMarquee, ...techMarquee].map((tech, i) => (
            <span
              key={`${tech}-${i}`}
              className="rounded-full border border-border bg-card/60 px-4 py-1.5 font-mono text-xs whitespace-nowrap text-muted-foreground"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
