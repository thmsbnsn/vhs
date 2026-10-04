import { createFileRoute, Link } from "@tanstack/react-router";
import { Gauge, ClipboardCheck, AlertCircle, Wrench, Upload, ChevronRight, HelpCircle } from "lucide-react";
import { Card, Section, StatusBadge, Provenance, EmptyState, pageHead, btn } from "@/components/vhs/ui";
import { MoreLinks } from "@/components/vhs/shells";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, components, maintenance, events, recalls, fmtDate, fmtMi } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/")({
  head: () => pageHead("Vehicle dashboard", "What needs attention, what's coming up, what's known and what's unknown."),
  component: Dashboard,
});

const dueTone = { overdue: "service", "due-soon": "monitor", upcoming: "good", unknown: "unknown" } as const;

function Dashboard() {
  const v = useVehicle();
  const p = { vehicleId: v.id };
  const cs = byVehicle(components, v.id);
  const attention = cs.filter((c) => ["service", "issue", "monitor"].includes(c.status));
  const openRecalls = byVehicle(recalls, v.id).filter((r) => r.state === "open");
  const known = cs.filter((c) => ["good", "serviced", "new"].includes(c.status));
  const unknown = cs.filter((c) => c.status === "unknown");
  const upcoming = byVehicle(maintenance, v.id).filter((m) => m.due !== "unknown").slice(0, 3);
  const recent = byVehicle(events, v.id).slice(0, 4);

  const actions = [
    { to: "/vehicles/$vehicleId/mileage", label: "Update mileage", icon: Gauge },
    { to: "/vehicles/$vehicleId/check", label: "Quick check", icon: ClipboardCheck },
    { to: "/vehicles/$vehicleId/changes/new", label: "Something changed", icon: AlertCircle },
    { to: "/vehicles/$vehicleId/timeline", label: "Record service", icon: Wrench },
    { to: "/vehicles/$vehicleId/documents/upload", label: "Upload document", icon: Upload },
  ] as const;

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Vehicle health record</p>
        <h1 className="text-2xl font-bold tracking-tight">{v.nickname}</h1>
        <p className="text-sm text-text-2">Mileage <span className="font-mono">{fmtMi(v.mileage)}</span> as of {fmtDate(v.mileageDate)}</p>
      </div>

      <div className="grid gap-8 xl:grid-cols-2">
        <Section eyebrow="1" title="What needs attention" action={<Link to="/vehicles/$vehicleId/health" params={p} className={btn.ghost}>All health</Link>}>
          {attention.length + openRecalls.length === 0 ? (
            <EmptyState title="Nothing flagged" body="No issues or items to monitor right now." />
          ) : (
            <div className="space-y-2">
              {openRecalls.map((r) => (
                <Link key={r.id} to="/vehicles/$vehicleId/recalls" params={p} className="card-surface flex items-center justify-between gap-3 p-4">
                  <div><p className="text-sm font-semibold">Open recall: {r.title}</p><p className="text-xs text-muted-foreground">Campaign <span className="font-mono">{r.campaign}</span> · Manufacturer</p></div>
                  <StatusBadge status="service" />
                </Link>
              ))}
              {attention.map((c) => (
                <Link key={c.id} to="/vehicles/$vehicleId/health/$componentId" params={{ ...p, componentId: c.id }} className="card-surface flex items-center justify-between gap-3 p-4">
                  <div className="min-w-0"><p className="text-sm font-semibold">{c.name}</p><Provenance source={c.source} date={c.observed} mileage={c.mileage} /></div>
                  <StatusBadge status={c.status} />
                </Link>
              ))}
            </div>
          )}
        </Section>

        <Section eyebrow="2" title="What's coming up" action={<Link to="/vehicles/$vehicleId/maintenance" params={p} className={btn.ghost}>Maintenance</Link>}>
          {upcoming.length === 0 ? <EmptyState title="No scheduled items" body="Add service history to see what's due." /> : (
            <Card className="divide-y divide-border p-0 sm:p-0">
              {upcoming.map((m) => (
                <Link key={m.id} to="/vehicles/$vehicleId/maintenance/$itemId" params={{ ...p, itemId: m.id }} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2/50">
                  <div><p className="text-sm font-semibold">{m.name}</p><p className="text-xs text-muted-foreground">{m.dueText}</p></div>
                  <StatusBadge status={dueTone[m.due]} />
                </Link>
              ))}
            </Card>
          )}
        </Section>

        <Section eyebrow="3" title="What's known">
          <Card className="grid grid-cols-2 gap-3">
            {known.map((c) => (
              <Link key={c.id} to="/vehicles/$vehicleId/health/$componentId" params={{ ...p, componentId: c.id }} className="rounded-lg bg-surface-2/60 p-3">
                <p className="text-sm font-medium">{c.name}</p>
                <div className="mt-1.5"><StatusBadge status={c.status} /></div>
                <p className="mt-1.5 text-xs text-muted-foreground">{fmtDate(c.observed)}</p>
              </Link>
            ))}
            {known.length === 0 && <p className="col-span-2 text-sm text-text-2">Nothing confirmed yet.</p>}
          </Card>
        </Section>

        <Section eyebrow="4" title="What's unknown" action={<Link to="/vehicles/$vehicleId/baseline" params={p} className={btn.ghost}>Fill gaps</Link>}>
          <Card>
            <p className="mb-3 flex items-start gap-2 text-sm text-text-2"><HelpCircle className="mt-0.5 size-4 shrink-0" />Unknown isn't bad — it just means we don't have a record yet. Adding a receipt or a quick check fills it in.</p>
            <ul className="space-y-1.5">
              {unknown.map((c) => (
                <li key={c.id}>
                  <Link to="/vehicles/$vehicleId/health/$componentId" params={{ ...p, componentId: c.id }} className="flex items-center justify-between rounded-lg px-2 py-1.5 text-sm hover:bg-surface-2">
                    {c.name}<StatusBadge status="unknown" />
                  </Link>
                </li>
              ))}
            </ul>
          </Card>
        </Section>
      </div>

      <Section eyebrow="5" title="Quick actions & recent activity">
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {actions.map((a) => (
            <Link key={a.label} to={a.to} params={p} className="card-surface flex flex-col items-start gap-2 p-3 text-sm font-semibold hover:border-border-strong">
              <a.icon className="size-5 text-brand" />{a.label}
            </Link>
          ))}
        </div>
        <Card className="divide-y divide-border p-0 sm:p-0">
          {recent.map((e) => (
            <Link key={e.id} to="/vehicles/$vehicleId/timeline/$eventId" params={{ ...p, eventId: e.id }} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2/50">
              <div className="min-w-0"><p className="text-sm font-medium">{e.title}</p><Provenance source={e.source} date={e.date} mileage={e.mileage} /></div>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
          {recent.length === 0 && <p className="p-4 text-sm text-text-2">No activity yet.</p>}
        </Card>
      </Section>
      <MoreLinks vehicleId={v.id} />
    </div>
  );
}
