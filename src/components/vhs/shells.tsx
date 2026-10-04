import { Link, Outlet } from "@tanstack/react-router";
import type { ReactNode } from "react";
import {
  LayoutDashboard, HeartPulse, History, Wrench, FileText, MoreHorizontal, ChevronLeft, UserCircle, Gauge, ClipboardCheck, AlertCircle, ShieldAlert, Share2, Car, ListChecks, ScrollText,
} from "lucide-react";
import { Logo } from "./ui";
import { fmtMi, type Vehicle } from "@/lib/mock";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="px-6 py-5"><Logo /></header>
      <main className="flex flex-1 items-start justify-center px-4 pb-16 pt-6 sm:pt-12">
        <div className="card-surface w-full max-w-md p-6 sm:p-8">{children}</div>
      </main>
    </div>
  );
}

export function TopBar() {
  return (
    <header className="sticky top-0 z-30 border-b border-border bg-surface/90 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
        <Logo compact />
        <nav className="flex items-center gap-1 text-sm">
          <Link to="/garage" className="rounded-md px-3 py-1.5 font-medium text-text-2 hover:bg-surface-2" activeProps={{ className: "bg-surface-2 text-foreground" }}>Garage</Link>
          <Link to="/account" aria-label="Account" className="rounded-md p-1.5 text-text-2 hover:bg-surface-2" activeProps={{ className: "bg-surface-2 text-foreground" }}>
            <UserCircle className="size-5" />
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function OwnerShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <TopBar />
      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}

const primaryNav = [
  { to: "/vehicles/$vehicleId", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/vehicles/$vehicleId/health", label: "Health", icon: HeartPulse },
  { to: "/vehicles/$vehicleId/timeline", label: "Timeline", icon: History },
  { to: "/vehicles/$vehicleId/maintenance", label: "Maintenance", icon: Wrench },
  { to: "/vehicles/$vehicleId/documents", label: "Documents", icon: FileText },
] as const;

const secondaryNav = [
  { to: "/vehicles/$vehicleId/recalls", label: "Recalls", icon: ShieldAlert },
  { to: "/vehicles/$vehicleId/mileage", label: "Mileage", icon: Gauge },
  { to: "/vehicles/$vehicleId/baseline", label: "Baseline", icon: ListChecks },
  { to: "/vehicles/$vehicleId/summary", label: "Summary", icon: ScrollText },
  { to: "/vehicles/$vehicleId/shares", label: "Shares", icon: Share2 },
  { to: "/vehicles/$vehicleId/profile", label: "Vehicle profile", icon: Car },
] as const;

export function VehicleShell({ vehicle }: { vehicle: Vehicle }) {
  const params = { vehicleId: vehicle.id };
  return (
    <div className="min-h-screen pb-20 lg:pb-0">
      <TopBar />
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link to="/garage" className="rounded-md p-1 text-muted-foreground hover:bg-surface-2" aria-label="Back to garage"><ChevronLeft className="size-5" /></Link>
            <div>
              <p className="font-semibold leading-tight">{vehicle.nickname}</p>
              <p className="text-xs text-muted-foreground">
                {vehicle.year} {vehicle.make} {vehicle.model} · <span className="font-mono">{fmtMi(vehicle.mileage)}</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link to="/vehicles/$vehicleId/mileage" params={params} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface-2"><Gauge className="size-3.5" />Update mileage</Link>
            <Link to="/vehicles/$vehicleId/check" params={params} className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs font-semibold hover:bg-surface-2"><ClipboardCheck className="size-3.5" />Quick check</Link>
            <Link to="/vehicles/$vehicleId/changes/new" params={params} className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground hover:opacity-90"><AlertCircle className="size-3.5" />Something changed</Link>
          </div>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-6">
        <aside className="sticky top-20 hidden h-fit w-52 shrink-0 lg:block">
          <nav className="space-y-0.5">
            {primaryNav.map((n) => (
              <Link key={n.to} to={n.to} params={params} activeOptions={{ exact: "exact" in n }}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-text-2 hover:bg-surface-2"
                activeProps={{ className: "bg-surface-2 text-foreground font-semibold" }}>
                <n.icon className="size-4" />{n.label}
              </Link>
            ))}
            <p className="eyebrow px-3 pb-1 pt-5">Record</p>
            {secondaryNav.map((n) => (
              <Link key={n.to} to={n.to} params={params}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm font-medium text-text-2 hover:bg-surface-2"
                activeProps={{ className: "bg-surface-2 text-foreground font-semibold" }}>
                <n.icon className="size-4" />{n.label}
              </Link>
            ))}
          </nav>
        </aside>
        <main className="min-w-0 flex-1"><Outlet /></main>
      </div>
      <nav className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-5 border-t border-border bg-surface lg:hidden">
        {primaryNav.slice(0, 4).map((n) => (
          <Link key={n.to} to={n.to} params={params} activeOptions={{ exact: "exact" in n }}
            className="flex flex-col items-center gap-0.5 py-2 text-[0.68rem] font-medium text-muted-foreground"
            activeProps={{ className: "text-brand" }}>
            <n.icon className="size-5" />{n.label}
          </Link>
        ))}
        <Link to="/vehicles/$vehicleId/profile" params={params} className="flex flex-col items-center gap-0.5 py-2 text-[0.68rem] font-medium text-muted-foreground" activeProps={{ className: "text-brand" }}>
          <MoreHorizontal className="size-5" />More
        </Link>
      </nav>
    </div>
  );
}

export function MoreLinks({ vehicleId }: { vehicleId: string }) {
  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:hidden">
      {[primaryNav[4], ...secondaryNav].map((n) => (
        <Link key={n.to} to={n.to} params={{ vehicleId }} className="card-surface flex items-center gap-2 p-3 text-sm font-medium">
          <n.icon className="size-4 text-brand" />{n.label}
        </Link>
      ))}
    </div>
  );
}
