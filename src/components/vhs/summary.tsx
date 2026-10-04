import { Link } from "@tanstack/react-router";
import { Card, Section, StatusBadge, Provenance } from "./ui";
import { byVehicle, components, events, recalls, fmtMi, type Vehicle } from "@/lib/mock";

/** Read-only vehicle summary shared by owner summary and mechanic share views. */
export function VehicleSummary({ vehicle: v, shareToken }: { vehicle: Vehicle; shareToken?: string }) {
  const cs = byVehicle(components, v.id);
  const services = byVehicle(events, v.id).filter((e) => e.kind === "Service" || e.kind === "Check");
  const rc = byVehicle(recalls, v.id);
  return (
    <div className="space-y-8">
      <Card>
        <p className="text-lg font-semibold">{v.year} {v.make} {v.model} {v.trim}</p>
        <dl className="mt-3 grid gap-3 text-sm sm:grid-cols-3">
          <div><dt className="text-xs text-muted-foreground">VIN</dt><dd className="font-mono">{v.vin}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Mileage</dt><dd className="font-mono">{fmtMi(v.mileage)}</dd></div>
          <div><dt className="text-xs text-muted-foreground">Engine</dt><dd>{v.engine}</dd></div>
        </dl>
      </Card>
      <Section title="Condition">
        <div className="card-surface divide-y divide-border">
          {cs.map((c) => (
            <div key={c.id} className="flex items-center justify-between gap-3 px-4 py-3">
              <div className="min-w-0"><p className="text-sm font-semibold">{c.name}</p><Provenance source={c.source} date={c.observed} mileage={c.mileage} /></div>
              <StatusBadge status={c.status} />
            </div>
          ))}
        </div>
      </Section>
      <Section title="Service & inspection records">
        <div className="card-surface divide-y divide-border">
          {services.map((e) => {
            const inner = (<><p className="text-sm font-semibold">{e.title}</p><p className="text-sm text-text-2">{e.detail}</p><Provenance source={e.source} date={e.date} mileage={e.mileage} /></>);
            return shareToken ? (
              <Link key={e.id} to="/share/$grantToken/records/$recordType/$recordId" params={{ grantToken: shareToken, recordType: "event", recordId: e.id }} className="block px-4 py-3 hover:bg-surface-2/50">{inner}</Link>
            ) : <div key={e.id} className="px-4 py-3">{inner}</div>;
          })}
        </div>
      </Section>
      <Section title="Recalls">
        <div className="card-surface divide-y divide-border">
          {rc.map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3 text-sm"><span>{r.title} <span className="font-mono text-xs text-muted-foreground">{r.campaign}</span></span><StatusBadge status={r.state === "open" ? "service" : r.state === "completed" ? "serviced" : "unknown"} /></div>
          ))}
          {rc.length === 0 && <p className="px-4 py-3 text-sm text-text-2">None on record.</p>}
        </div>
      </Section>
    </div>
  );
}
