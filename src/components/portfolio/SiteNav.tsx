import { useCallback, useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Download, Menu, X, Sparkles } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { cn } from "@/lib/utils";
import { ResumeModal } from "./ResumeModal";


const NAV_OFFSET = 96;

export function SiteNav() {
  const { sections, profile } = portfolioData;
  const [open, setOpen] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);

  const [scrolled, setScrolled] = useState(false);
  const [compact, setCompact] = useState(false);
  const [active, setActive] = useState(sections[0]?.id ?? "");
  const lastY = useRef(0);
  const reduceMotion = useReducedMotion();

  // Scroll-aware chrome: subtle compaction on downward scroll past the hero.
  useEffect(() => {
    lastY.current = window.scrollY;
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const y = window.scrollY;
        setScrolled(y > 24);
        const goingDown = y > lastY.current + 4;
        const goingUp = y < lastY.current - 4;
        if (goingDown && y > 220) setCompact(true);
        else if (goingUp || y <= 220) setCompact(false);
        lastY.current = y;
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Active section detection via IntersectionObserver.
  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visible.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        let best = "";
        let bestRatio = 0;
        for (const [id, ratio] of visible) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }
        if (best) setActive(best);
      },
      {
        rootMargin: `-${NAV_OFFSET}px 0px -45% 0px`,
        threshold: [0, 0.15, 0.35, 0.6, 0.9],
      },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  // Lock background scroll while the mobile sheet is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  const scrollToId = useCallback(
    (id: string, updateHash = true) => {
      const el = document.getElementById(id);
      if (!el) return;
      const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
      window.scrollTo({ top, behavior: reduceMotion ? "auto" : "smooth" });
      setActive(id);
      if (updateHash && window.location.hash !== `#${id}`) {
        window.history.pushState(null, "", `#${id}`);
      }
    },
    [reduceMotion],
  );

  // Hash on load + back/forward support.
  useEffect(() => {
    const jump = (instant = false) => {
      const id = window.location.hash.slice(1);
      if (!id || !document.getElementById(id)) return;
      if (instant) {
        const el = document.getElementById(id)!;
        window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET });
        setActive(id);
      } else {
        scrollToId(id, false);
      }
    };
    const t = window.setTimeout(() => jump(true), 60);
    const onPop = () => jump(false);
    window.addEventListener("popstate", onPop);
    window.addEventListener("hashchange", onPop);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("hashchange", onPop);
    };
  }, [scrollToId]);

  const handleClick =
    (id: string, closeMenu = false) =>
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      if (closeMenu) setOpen(false);
      scrollToId(id);
    };

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-5">
      <motion.nav
        animate={{
          scale: compact ? 0.985 : 1,
          paddingTop: compact ? 6 : 12,
          paddingBottom: compact ? 6 : 12,
        }}
        transition={
          reduceMotion ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }
        }
        className={cn(
          "glass-panel mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 rounded-2xl px-4 transition-shadow duration-500 lg:grid-cols-[auto_1fr_auto]",
          scrolled && "shadow-[0_20px_60px_-30px_var(--glow)]",
        )}
      >
        <a
          href="#overview"
          onClick={handleClick("overview")}
          className="flex min-w-0 items-center gap-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70"
        >
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
            <Sparkles className="size-4" />
          </span>
          <span className="truncate font-display text-sm font-bold tracking-tight sm:text-base">
            {profile.name}
          </span>
        </a>

        <ul className="hidden justify-center gap-1 lg:flex">
          {sections.map((s) => {
            const isActive = active === s.id;
            return (
              <li key={s.id} className="relative">
                <a
                  href={`#${s.id}`}
                  onClick={handleClick(s.id)}
                  aria-current={isActive ? "true" : undefined}
                  className={cn(
                    "relative block rounded-lg px-3 py-2 text-sm transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-lg bg-secondary/70"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                    />
                  )}
                  <span className="relative">{s.label}</span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-underline"
                      className="absolute inset-x-3 -bottom-0.5 h-px bg-primary"
                      transition={
                        reduceMotion
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 380, damping: 34 }
                      }
                    />
                  )}
                </a>
              </li>
            );
          })}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <span
            title={profile.availability}
            className="hidden items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 font-mono text-[10px] tracking-wide text-emerald-300 uppercase shadow-[0_0_18px_-4px_theme(colors.emerald.400)] xl:inline-flex"
          >
            <span className="relative grid size-2 place-items-center">
              <span className="absolute size-2 animate-ping rounded-full bg-emerald-400/70" />
              <span className="size-2 rounded-full bg-emerald-400" />
            </span>
            Open to Roles
          </span>
          <button
            onClick={() => setResumeOpen(true)}
            className="hidden items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs font-medium text-foreground transition-colors hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 sm:inline-flex"
          >
            <Download className="size-4" /> Resume
          </button>

          <a
            href="#contact"
            onClick={handleClick("contact")}
            className="hidden rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 sm:inline-block"
          >
            Get in Touch
          </a>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-xl border border-border text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70 lg:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={reduceMotion ? { duration: 0 } : { duration: 0.24, ease: "easeOut" }}
            className="glass-panel mx-auto mt-2 max-h-[70vh] max-w-6xl overflow-y-auto rounded-2xl p-3 lg:hidden"
          >
            <ul className="grid gap-1">
              {sections.map((s) => {
                const isActive = active === s.id;
                return (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      onClick={handleClick(s.id, true)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/70",
                        isActive
                          ? "bg-secondary/70 text-foreground"
                          : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground",
                      )}
                    >
                      {s.label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-mobile"
                          className="h-4 w-0.5 rounded-full bg-primary"
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-emerald-400/40 bg-emerald-400/10 px-3 py-2 font-mono text-[10px] tracking-wide text-emerald-300 uppercase">
              <span className="relative grid size-2 place-items-center">
                <span className="absolute size-2 animate-ping rounded-full bg-emerald-400/70" />
                <span className="size-2 rounded-full bg-emerald-400" />
              </span>
              Open to Roles
            </div>
            <div className="mt-2 grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setOpen(false);
                  setResumeOpen(true);
                }}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-3 py-2.5 text-xs font-medium"
              >
                <Download className="size-4" /> Resume
              </button>

              <a
                href="#contact"
                onClick={handleClick("contact", true)}
                className="rounded-xl bg-primary px-3 py-2.5 text-center text-xs font-semibold text-primary-foreground"
              >
                Get in Touch
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>{resumeOpen && <ResumeModal onClose={() => setResumeOpen(false)} />}</AnimatePresence>
    </header>
  );

}
