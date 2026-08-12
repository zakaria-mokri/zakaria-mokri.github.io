import { useState, type FormEvent } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import { Check, Copy, Github, Globe, Linkedin, Mail, Send, Twitter } from "lucide-react";
import { portfolioData } from "@/data/portfolioData";
import { SectionHeading } from "./SectionHeading";

const icons = { github: Github, linkedin: Linkedin, mail: Mail, globe: Globe, twitter: Twitter };

export function ContactSection() {
  const { profile, socials } = portfolioData;
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied to clipboard");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Couldn't copy — please copy manually");
    }
  };

  const [sending, setSending] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    const name = String(form.get("name") ?? "");
    const email = String(form.get("email") ?? "");
    const message = String(form.get("message") ?? "");

    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          message,
          _subject: `Portfolio enquiry from ${name}`,
          _template: "table",
          _captcha: "false",
        }),
      });
      if (!res.ok) throw new Error("send failed");
      toast.success("Message sent — I'll get back to you soon.");
      formEl.reset();
    } catch {
      const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
      const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
      window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
      toast.error("Couldn't send directly — opening your mail client instead.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative py-20 sm:py-28">
      <div className="decor-glow pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-64 max-w-3xl rounded-full bg-primary/8 blur-[130px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Contact"
          title="Let's talk about the role"
          description="Fastest route is email — or send a message below and it lands straight in my inbox."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)]"
        >
          <div className="glass-panel rounded-2xl p-6">
            <p className="font-mono text-[11px] tracking-wide text-primary uppercase">Direct</p>
            <p className="mt-3 text-lg font-semibold break-all">{profile.email}</p>
            <p className="mt-1 text-sm text-muted-foreground">{profile.location}</p>
            <div className="relative mt-5 inline-block">
              <button
                onClick={copyEmail}
                className="glow-hover inline-flex items-center gap-2 rounded-xl border border-border px-4 py-2.5 text-xs font-medium hover:text-primary"
              >
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? "Copied" : "Copy Email"}
              </button>
              {copied && (
                <span
                  role="status"
                  className="pointer-events-none absolute -top-9 left-1/2 -translate-x-1/2 rounded-lg border border-border bg-card px-2.5 py-1 font-mono text-[10px] whitespace-nowrap text-primary shadow-lg"
                >
                  Copied!
                </span>
              )}
            </div>

            <div className="mt-6 flex gap-2 border-t border-border pt-6">
              {socials.map((s) => {
                const Icon = icons[s.icon];
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    target={s.icon === "mail" ? undefined : "_blank"}
                    rel="noreferrer"
                    aria-label={s.label}
                    className="glow-hover grid size-10 place-items-center rounded-xl border border-border text-muted-foreground hover:text-primary"
                  >
                    <Icon className="size-4" />
                  </a>
                );
              })}
            </div>
          </div>

          <form onSubmit={onSubmit} className="glass-panel grid gap-4 rounded-2xl p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="grid gap-2 text-xs font-medium">
                Name
                <input
                  name="name"
                  required
                  placeholder="Jane Recruiter"
                  className="rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60"
                />
              </label>
              <label className="grid gap-2 text-xs font-medium">
                Email
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="jane@company.com"
                  className="rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60"
                />
              </label>
            </div>
            <label className="grid gap-2 text-xs font-medium">
              Message
              <textarea
                name="message"
                required
                rows={6}
                placeholder="Tell me about the role, team and stack…"
                className="resize-none rounded-xl border border-input bg-background/60 px-3.5 py-2.5 text-sm outline-none focus:border-primary/60"
              />
            </label>
            <button
              type="submit"
              disabled={sending}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
            >
              <Send className="size-4" /> {sending ? "Sending…" : "Send Message"}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  const { profile } = portfolioData;
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto grid max-w-6xl gap-3 px-4 text-center sm:flex sm:items-center sm:justify-between sm:px-6 sm:text-left">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p className="font-mono text-xs text-muted-foreground">{profile.role}</p>
      </div>
    </footer>
  );
}
