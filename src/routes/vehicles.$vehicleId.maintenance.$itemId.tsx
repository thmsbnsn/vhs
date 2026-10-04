import { createFileRoute, Link } from "@tanstack/react-router";
import { Card, PageTitle, StatusBadge, EmptyState, btn, pageHead } from "@/components/vhs/ui";
import { useVehicle } from "@/lib/use-vehicle";
import { maintenance } from "@/lib/mock";

const dueTone = { overdue: "service", "due-soon": "monitor", upcoming: "good", unknown: "unknown" } as const;

export const Route = createFileRoute("/vehicles/$vehicleId/maintenance/$itemId")({
  head: () => pageHead("Maintenance item", "Due state, interval and explanation for one maintenance item."),
  component: Item,
});

function Item() {
  const v = useVehicle();
  const { itemId } = Route.useParams();
  const m = maintenance.find((x) => x.id === itemId && x.vehicleId === v.id);
  if (!m) return <EmptyState title="Item not found" body="This maintenance item isn't tracked." />;
  return (
    <div className="space-y-6">
      <Link to="/vehicles/$vehicleId/maintenance" params={{ vehicleId: v.id }} className={btn.ghost}>← Maintenance</Link>
      <PageTitle title={m.name} sub={m.dueText} action={<StatusBadge status={dueTone[m.due]} />} />
      <Card className="space-y-4 text-sm">
        <div><p className="text-xs text-muted-foreground">Why this status</p><p>{m.why}</p></div>
        <div className="grid grid-cols-2 gap-4">
          <div><p className="text-xs text-muted-foreground">Interval</p><p className="font-medium">{m.interval}</p></div>
          <div><p className="text-xs text-muted-foreground">Last done</p><p className="font-mono">{m.lastDone ?? "Unknown"}</p></div>
        </div>
      </Card>
      <button className={btn.primary}>Record service</button>
    </div>
  );
}
