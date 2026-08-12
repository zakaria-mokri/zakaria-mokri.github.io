import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Award, Download, ExternalLink, FileText, X } from "lucide-react";
import { portfolioData, type Certification } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";
import { cn } from "@/lib/utils";

export function CertificationsVault() {
  const [preview, setPreview] = useState<Certification | null>(null);
  const [issuer, setIssuer] = useState("all");

  const issuers = useMemo(
    () => Array.from(new Set(portfolioData.certifications.map((c) => c.issuer))),
    [],
  );
  const visible = useMemo(
    () =>
      issuer === "all"
        ? portfolioData.certifications
        : portfolioData.certifications.filter((c) => c.issuer === issuer),
    [issuer],
  );


  return (
    <section id="certifications" className="relative py-20 sm:py-28">
      <div className="decor-glow pointer-events-none absolute inset-x-0 top-1/3 mx-auto h-64 max-w-3xl rounded-full bg-accent/8 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Credentials Vault"
          title="Certifications & verification"
          description="Every credential includes its issuing body, ID and a direct link to the certificate or verification page."
        />

        <div className="mb-6 flex flex-wrap gap-2">
          {["all", ...issuers].map((key) => (
            <button
              key={key}
              onClick={() => setIssuer(key)}
              className={cn(
                "relative rounded-xl border px-3.5 py-2 text-[11px] font-medium transition-colors",
                issuer === key
                  ? "border-primary/50 text-primary"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {issuer === key && (
                <motion.span
                  layoutId="cert-filter-bg"
                  className="absolute inset-0 rounded-xl bg-primary/10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              <span className="relative">{key === "all" ? "All" : key}</span>
            </button>
          ))}
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((c, i) => (
            <motion.article
              key={`${issuer}-${c.name}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.22, ease: "easeOut", delay: Math.min(i, 5) * 0.03 }}
              style={{ willChange: "opacity, transform" }}
              className="glass-panel glow-hover flex flex-col rounded-2xl p-4"
            >

              <div className="grid grid-cols-[auto_minmax(0,1fr)] items-start gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/12 text-primary">
                  <Award className="size-3.5" />
                </span>
                <div className="min-w-0">
                  <h3 className="text-[13px] font-semibold text-balance">{c.name}</h3>
                  <p className="mt-0.5 text-[11px] text-muted-foreground">{c.issuer}</p>
                </div>
              </div>

              {c.credentialId && (
                <dl className="mt-3 grid gap-1.5 border-t border-border pt-3 text-[11px]">
                  <div className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">Credential ID</dt>
                    <dd className="truncate font-mono">{c.credentialId}</dd>
                  </div>
                </dl>
              )}

              <div className="mt-auto pt-3.5">
                {c.pdfUrl ? (
                  <button
                    onClick={() => setPreview(c)}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-[11px] font-medium transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <FileText className="size-3.5" /> View Certificate PDF
                  </button>
                ) : (
                  <a
                    href={c.verifyUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-border px-3 py-2 text-[11px] font-medium transition-colors hover:border-primary/50 hover:text-primary"
                  >
                    <ExternalLink className="size-3.5" /> Verify Credential
                  </a>

                )}
              </div>
            </motion.article>
          ))}
        </div>


      </div>

      {preview && (
        <div
          className="fixed inset-0 z-60 grid place-items-center bg-background/85 p-4 backdrop-blur-sm"
          onClick={() => setPreview(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${preview.name} certificate`}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="glass-panel flex h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-2xl"
          >
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold">{preview.name}</h3>
                <p className="truncate text-xs text-muted-foreground">{preview.issuer}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <a
                  href={preview.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary/50 hover:text-primary"
                >
                  <ExternalLink className="size-3.5" /> Open
                </a>
                <a
                  href={preview.pdfUrl}
                  download
                  className="hidden items-center gap-2 rounded-lg border border-border px-3 py-2 text-xs font-medium hover:border-primary/50 hover:text-primary sm:inline-flex"
                >
                  <Download className="size-3.5" /> Download
                </a>
                <button
                  onClick={() => setPreview(null)}
                  aria-label="Close preview"
                  className="grid size-9 shrink-0 place-items-center rounded-lg border border-border hover:text-primary"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
            <iframe
              src={`${preview.pdfUrl}#view=FitH`}
              title={`${preview.name} PDF`}
              className="min-h-0 flex-1 bg-secondary/40"
            />
            <div className="border-t border-border px-5 py-3 text-center text-xs text-muted-foreground sm:hidden">
              Can&apos;t see it?{" "}
              <a href={preview.pdfUrl} target="_blank" rel="noreferrer" className="text-primary underline">
                Open the PDF in a new tab
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
