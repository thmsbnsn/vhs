import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageTitle, StatusBadge, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { byVehicle, components } from "@/lib/mock";

export const Route = createFileRoute("/vehicles/$vehicleId/baseline")({
  head: () => pageHead("Baseline", "Set the starting point of the health record — what you know today."),
  component: Baseline,
});

function Baseline() {
  const v = useVehicle();
  const cs = byVehicle(components, v.id);
  const known = cs.filter((c) => c.status !== "unknown").length;
  return (
    <div className="max-w-2xl space-y-6">
      <PageTitle title="Baseline" sub="Tell VHS what you know today. Anything you skip stays Unknown — that's fine." />
      <Card>
        <div className="flex items-center justify-between text-sm"><span className="font-medium">{known} of {cs.length} components recorded</span></div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-surface-2"><div className="h-full rounded-full bg-brand" style={{ width: `${(known / Math.max(cs.length, 1)) * 100}%` }} /></div>
      </Card>
      <div className="card-surface divide-y divide-border">
        {cs.map((c) => (
          <div key={c.id} className="flex items-center justify-between px-4 py-3">
            <span className="text-sm font-medium">{c.name}</span>
            <div className="flex items-center gap-2"><StatusBadge status={c.status} />
              <Link to="/vehicles/$vehicleId/health/$componentId" params={{ vehicleId: v.id, componentId: c.id }} className={btn.ghost}>Edit</Link>
            </div>
          </div>
        ))}
      </div>
      <Link to="/vehicles/$vehicleId" params={{ vehicleId: v.id }} className={btn.primary}>Done for now</Link>
    </div>
  );
}
