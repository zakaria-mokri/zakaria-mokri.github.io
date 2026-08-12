import { useEffect } from "react";
import { motion } from "motion/react";
import { Download, ExternalLink, X } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";

export function ResumeModal({ onClose }: { onClose: () => void }) {
  const { profile } = portfolioData;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[70] grid place-items-center bg-background/85 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Resume preview"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
      >
        <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
          <div className="min-w-0">
            <h3 className="truncate text-sm font-semibold">Curriculum Vitae — {profile.name}</h3>
            <p className="truncate text-xs text-muted-foreground">Full resume (PDF)</p>
          </div>
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={profile.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary/50 hover:text-primary"
            >
              <ExternalLink className="size-3.5" /> Open
            </a>
            <a
              href={profile.resumeUrl}
              download
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90"
            >
              <Download className="size-3.5" /> Download
            </a>
            <button
              onClick={onClose}
              aria-label="Close resume preview"
              className="grid size-9 shrink-0 place-items-center rounded-lg border border-border hover:text-primary"
            >
              <X className="size-4" />
            </button>
          </div>
        </div>
        <iframe
          src={`${profile.resumeUrl}#view=FitH`}
          title="Resume PDF"
          className="min-h-0 flex-1 bg-secondary/40"
        />
        <div className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground sm:hidden">
          Can&apos;t see it?{" "}
          <a href={profile.resumeUrl} target="_blank" rel="noreferrer" className="text-primary underline">
            Open the PDF in a new tab
          </a>
        </div>
      </motion.div>
    </div>
  );
}
