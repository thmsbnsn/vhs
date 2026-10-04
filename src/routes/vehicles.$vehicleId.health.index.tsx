import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, StatusBadge, Provenance, EmptyState, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, components, STATUS_LABEL, type Status } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/health/")({
  head: () => pageHead("Health", "Component-by-component condition with source, date and mileage."),
  component: Health,
});

function Health() {
  const v = useVehicle();
  const cs = byVehicle(components, v.id);
  const groups = [...new Set(cs.map((c) => c.group))];
  const counts = cs.reduce<Partial<Record<Status, number>>>((a, c) => ({ ...a, [c.status]: (a[c.status] ?? 0) + 1 }), {});
  return (
    <div>
      <PageTitle title="Health" sub="A curated list of components. Every status shows where it came from." />
      <div className="mb-6 flex flex-wrap gap-2">
        {(Object.keys(counts) as Status[]).map((s) => (
          <span key={s} className="inline-flex items-center gap-1.5 text-xs text-text-2"><StatusBadge status={s} />{counts[s]}</span>
        ))}
        <span className="sr-only">{Object.entries(counts).map(([k, n]) => `${STATUS_LABEL[k as Status]} ${n}`).join(", ")}</span>
      </div>
      {cs.length === 0 ? <EmptyState title="No components yet" body="Run a baseline to start the health record." /> : (
        <div className="space-y-6">
          {groups.map((g) => (
            <div key={g}>
              <p className="eyebrow mb-2">{g}</p>
              <div className="card-surface divide-y divide-border">
                {cs.filter((c) => c.group === g).map((c) => (
                  <Link key={c.id} to="/vehicles/$vehicleId/health/$componentId" params={{ vehicleId: v.id, componentId: c.id }} className="flex items-center justify-between gap-3 px-4 py-3 hover:bg-surface-2/50">
                    <div className="min-w-0"><p className="text-sm font-semibold">{c.name}</p><Provenance source={c.source} date={c.observed} mileage={c.mileage} /></div>
                    <StatusBadge status={c.status} />
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
