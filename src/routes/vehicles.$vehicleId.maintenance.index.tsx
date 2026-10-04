import { createFileRoute, Link } from "@tanstack/react-router";
import { PageTitle, StatusBadge, EmptyState, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, maintenance } from "@/lib/mock";

const dueTone = { overdue: "service", "due-soon": "monitor", upcoming: "good", unknown: "unknown" } as const;

export const Route = createFileRoute("/vehicles/$vehicleId/maintenance/")({
  head: () => pageHead("Maintenance", "What's due, why, and how VHS knows."),
  component: Maint,
});

function Maint() {
  const v = useVehicle();
  const list = byVehicle(maintenance, v.id);
  return (
    <div>
      <PageTitle title="Maintenance" sub="Due states are estimates based on your records and typical intervals — always with an explanation." />
      {list.length === 0 ? <EmptyState title="No maintenance items" body="Add service records to build a schedule." /> : (
        <div className="space-y-2">
          {list.map((m) => (
            <Link key={m.id} to="/vehicles/$vehicleId/maintenance/$itemId" params={{ vehicleId: v.id, itemId: m.id }} className="card-surface block p-4 hover:border-border-strong">
              <div className="flex items-center justify-between gap-3">
                <p className="font-semibold">{m.name}</p>
                <StatusBadge status={dueTone[m.due]} />
              </div>
              <p className="mt-0.5 text-sm font-medium text-text-2">{m.dueText}</p>
              <p className="mt-1 text-xs text-muted-foreground">{m.why}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
