import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Inbox } from "lucide-react";
import { STATUS_LABEL, type Status, type Source, fmtDate, fmtMi } from "@/lib/mock";
import { cn } from "@/lib/utils";

export function pageHead(title: string, description: string) {
  const t = `${title} · VHS`;
  return {
    meta: [
      { title: t },
      { name: "description", content: description },
      { property: "og:title", content: t },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  };
}

export function LogoMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 40" className={className} aria-hidden>
      <path d="M2 6h9l11 26h-9z" fill="var(--st-unknown)" opacity=".55" />
      <path d="M10 6h9l9 22-4.5 8z" fill="var(--brand-primary)" opacity=".85" />
      <path d="M36 4h10L30 38h-9z" fill="var(--foreground)" />
    </svg>
  );
}

export function Logo({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <LogoMark className="h-7 w-8" />
      <span className="text-lg font-extrabold tracking-tight">VHS</span>
      {!compact && <span className="hidden text-[0.65rem] font-semibold tracking-[0.2em] text-muted-foreground sm:inline">VEHICLE HEALTH SYSTEM</span>}
    </Link>
  );
}

const statusCls: Record<Status, string> = {
  unknown: "bg-st-unknown-bg text-st-unknown border-st-unknown/30 border-dashed",
  good: "bg-st-good-bg text-st-good border-st-good/25",
  monitor: "bg-st-monitor-bg text-st-monitor border-st-monitor/25",
  issue: "bg-st-issue-bg text-st-issue border-st-issue/25",
  service: "bg-st-service-bg text-st-service border-st-service/25",
  new: "bg-st-new-bg text-st-new border-st-new/25",
  serviced: "bg-st-serviced-bg text-st-serviced border-st-serviced/25",
  na: "bg-st-na-bg text-st-na border-st-na/25",
};

export function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={cn("inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border px-2.5 py-0.5 text-xs font-semibold", statusCls[status])}>
      <span className={cn("size-1.5 rounded-full bg-current", status === "unknown" && "bg-transparent ring-1 ring-current")} />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function Provenance({ source, date, mileage }: { source?: Source; date?: string; mileage?: number }) {
  if (!source && !date) return <p className="text-xs text-muted-foreground">No source recorded</p>;
  return (
    <p className="flex flex-wrap gap-x-3 gap-y-0.5 text-xs text-muted-foreground">
      {source && <span className="font-medium text-text-2">{source}</span>}
      <span>{fmtDate(date)}</span>
      {mileage != null && <span className="font-mono">{fmtMi(mileage)}</span>}
    </p>
  );
}

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("card-surface p-4 sm:p-5", className)}>{children}</div>;
}

export function Section({ title, action, children, eyebrow }: { title: string; eyebrow?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-3">
        <div>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h2 className="text-base font-semibold">{title}</h2>
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function PageTitle({ title, sub, action }: { title: string; sub?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {sub && <p className="mt-1 max-w-2xl text-sm text-text-2">{sub}</p>}
      </div>
      {action}
    </div>
  );
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-border-strong/50 bg-surface-2/50 p-8 text-center">
      <Inbox className="mx-auto size-6 text-muted-foreground" />
      <p className="mt-2 font-semibold">{title}</p>
      <p className="mx-auto mt-1 max-w-sm text-sm text-text-2">{body}</p>
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

export function Skeleton({ rows = 3 }: { rows?: number }) {
  return (
    <div className="space-y-2" aria-busy>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="h-14 animate-pulse rounded-xl bg-surface-2" />
      ))}
    </div>
  );
}

export const btn = {
  primary:
    "inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring",
  secondary:
    "inline-flex items-center justify-center gap-2 rounded-lg border border-border-strong/60 bg-surface px-4 py-2.5 text-sm font-semibold text-foreground transition hover:bg-surface-2",
  ghost: "inline-flex items-center gap-1 text-sm font-semibold text-brand hover:underline",
};

export function Field({ label, type = "text", placeholder, mono, hint }: { label: string; type?: string; placeholder?: string; mono?: boolean; hint?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className={cn(
          "w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/25",
          mono && "font-mono",
        )}
      />
      {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
    </label>
  );
}

export function TextArea({ label, placeholder }: { label: string; placeholder?: string }) {
  return (
    <label className="block space-y-1.5">
      <span className="text-sm font-medium">{label}</span>
      <textarea rows={4} placeholder={placeholder} className="w-full rounded-lg border border-input bg-surface px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground focus:border-brand focus:ring-2 focus:ring-ring/25" />
    </label>
  );
}
